import db from '../model/connection.js';

// helper role checker
const isManagerOrAdmin = (user) => {
    return user.role === 'manager' || user.role === 'admin';
};

// add project -> only manager/admin
const createProject = async (req, res) => {
    // note: need to add functionality for assign the team members projects

    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'Unauthorized. User ID not found!' });
        }

        if (!isManagerOrAdmin(req.user)) {
            return res
                .status(403)
                .json({ message: 'Access denied. Only managers can create projects' });
        }

        const createdBy = req.user.userId;
        const { name, description, assignedUserIds } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Project name is required' });
        }

        const [result] = await db.execute(
            `INSERT INTO projects
            (
                name,
                description,
                created_by
            )
            VALUES (?, ?, ?)`,
            [name, description || null, createdBy],
        );

        const projectId = result.insertId;

        // optional: assign users to project
        if (Array.isArray(assignedUserIds) && assignedUserIds.length > 0) {
            for (const userId of assignedUserIds) {
                await db.execute(
                    `INSERT IGNORE INTO user_projects
                    (
                        user_id,
                        project_id
                    )
                    VALUES (?, ?)`,
                    [userId, projectId],
                );
            }
        }

        const [rows] = await db.execute(`SELECT * FROM projects WHERE id = ?`, [projectId]);

        return res.status(201).json({
            message: 'Project created successfully',
            data: rows[0],
        });
    } catch (error) {
        console.log(error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Project name already exists' });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
};

// update project -> only manager/admin
const updateProject = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'Unauthorized. User ID not found!' });
        }

        if (!isManagerOrAdmin(req.user)) {
            return res
                .status(403)
                .json({ message: 'Access denied. Only managers can update projects' });
        }

        const { projectId } = req.params;
        const { name, description, isActive, assignedUserIds } = req.body;

        const [existingProject] = await db.execute(`SELECT * FROM projects WHERE id = ?`, [
            projectId,
        ]);

        if (existingProject.length === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const project = existingProject[0];

        await db.execute(
            `UPDATE projects
             SET
                name = ?,
                description = ?,
                is_active = ?
             WHERE id = ?`,
            [
                name || project.name,
                description !== undefined ? description : project.description,
                isActive !== undefined ? isActive : project.is_active,
                projectId,
            ],
        );

        // optional: update assigned users
        if (Array.isArray(assignedUserIds)) {
            await db.execute(`DELETE FROM user_projects WHERE project_id = ?`, [projectId]);

            for (const userId of assignedUserIds) {
                await db.execute(
                    `INSERT INTO user_projects
                    (
                        user_id,
                        project_id
                    )
                    VALUES (?, ?)`,
                    [userId, projectId],
                );
            }
        }

        const [updatedProject] = await db.execute(`SELECT * FROM projects WHERE id = ?`, [
            projectId,
        ]);

        return res.status(200).json({
            message: 'Project updated successfully',
            data: updatedProject[0],
        });
    } catch (error) {
        console.log(error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Project name already exists' });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
};

// delete project -> only manager/admin
const deleteProject = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'Unauthorized. User ID not found!' });
        }

        if (!isManagerOrAdmin(req.user)) {
            return res
                .status(403)
                .json({ message: 'Access denied. Only managers can delete projects' });
        }

        const { projectId } = req.params;

        const [existingProject] = await db.execute(`SELECT * FROM projects WHERE id = ?`, [
            projectId,
        ]);

        if (existingProject.length === 0) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // check project already used in weekly reports
        const [usedReports] = await db.execute(
            `SELECT id FROM weekly_reports WHERE project_id = ? LIMIT 1`,
            [projectId],
        );

        if (usedReports.length > 0) {
            return res.status(400).json({
                message:
                    'This project cannot be deleted because it is already used in weekly reports',
            });
        }

        await db.execute(`DELETE FROM projects WHERE id = ?`, [projectId]);

        return res.status(200).json({
            message: 'Project deleted successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// get projects by userId
const getProjectsByUserId = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'Unauthorized. User ID not found!' });
        }

        const loggedUserId = Number(req.user.userId);
        const requestedUserId = Number(req.params.userId || loggedUserId);

        // member can only see own projects
        if (req.user.role === 'member' && requestedUserId !== loggedUserId) {
            return res.status(403).json({
                message: 'Access denied. You can view only your own projects',
            });
        }

        const [rows] = await db.execute(
            `SELECT
                p.id,
                p.name,
                p.description,
                p.is_active,
                p.created_by,
                p.created_at,
                p.updated_at,
                up.assigned_at
            FROM user_projects up
            JOIN projects p ON up.project_id = p.id
            WHERE up.user_id = ?
            AND p.is_active = TRUE
            ORDER BY p.created_at DESC`,
            [requestedUserId],
        );

        return res.status(200).json({
            message: 'User projects loaded successfully',
            count: rows.length,
            data: rows,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default {
    createProject,
    updateProject,
    deleteProject,
    getProjectsByUserId,
};
