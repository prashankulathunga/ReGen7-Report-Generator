// need to create report
// get all reports -> for managers
// get report by userId -> for members
// update report
// delete report -> only draft status reports only

import db from '../model/connection.js';

// need to create report
const createReport = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'Unauthorized. User ID not found!' });
        }

        const userId = req.user.userId;

        const {
            projectId,
            weekStartDate,
            weekEndDate,
            tasksCompleted,
            tasksPlanned,
            blockers,
            hoursWorked,
            notes,
            status,
        } = req.body;

        if (!projectId || !weekStartDate || !weekEndDate || !tasksCompleted || !tasksPlanned) {
            return res.status(400).json({
                message: 'Project, week dates, tasks completed and tasks planned are required',
            });
        }

        const reportStatus = status === 'submitted' ? 'submitted' : 'draft';
        const submittedAt = reportStatus === 'submitted' ? new Date() : null;

        // need to check project is exists

        const [isProjectExists] = await db.execute(
            `SELECT * FROM user_projects WHERE project_id = ? AND user_id = ?`,
            [projectId, userId],
        );

        if (isProjectExists.length == 0) {
            return res.status(404).json({
                message: 'Project is not found',
            });
        }

        const [result] = await db.execute(
            `INSERT INTO weekly_reports
            (
                user_id,
                project_id,
                week_start_date,
                week_end_date,
                tasks_completed,
                tasks_planned,
                blockers,
                hours_worked,
                notes,
                status,
                submitted_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                userId,
                projectId,
                weekStartDate,
                weekEndDate,
                tasksCompleted,
                tasksPlanned,
                blockers || null,
                hoursWorked || null,
                notes || null,
                reportStatus,
                submittedAt,
            ],
        );

        const [rows] = await db.execute(`SELECT * FROM weekly_reports WHERE id = ?`, [
            result.insertId,
        ]);

        return res.status(201).json({
            message: 'Weekly report created successfully',
            data: rows[0],
        });
    } catch (error) {
        console.log(error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                message: 'You have already created a report for this week',
            });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
};

// get all reports -> for managers
const getAllReports = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'Unauthorized. User ID not found!' });
        }

        if (req.user.role !== 'manager' && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Managers only!' });
        }

        const { userId, projectId, status, weekStartDate, weekEndDate } = req.query;

        let query = `
            SELECT
                wr.id,
                wr.user_id,
                wr.project_id,
                wr.week_start_date,
                wr.week_end_date,
                wr.tasks_completed,
                wr.tasks_planned,
                wr.blockers,
                wr.hours_worked,
                wr.notes,
                wr.status,
                wr.submitted_at,
                wr.created_at,
                wr.updated_at,
                u.first_name,
                u.last_name,
                u.email,
                p.name AS project_name
            FROM weekly_reports wr
            JOIN users u ON wr.user_id = u.id
            JOIN projects p ON wr.project_id = p.id
            WHERE 1 = 1
        `;

        const values = [];

        if (userId) {
            query += ` AND wr.user_id = ?`;
            values.push(userId);
        }

        if (projectId) {
            query += ` AND wr.project_id = ?`;
            values.push(projectId);
        }

        if (status) {
            query += ` AND wr.status = ?`;
            values.push(status);
        }

        if (weekStartDate) {
            query += ` AND wr.week_start_date >= ?`;
            values.push(weekStartDate);
        }

        if (weekEndDate) {
            query += ` AND wr.week_end_date <= ?`;
            values.push(weekEndDate);
        }

        console.log(values);

        query += ` ORDER BY wr.week_start_date DESC, wr.created_at DESC`;

        const [rows] = await db.execute(query, values);

        return res.status(200).json({
            message: 'All reports loaded successfully',
            count: rows.length,
            data: rows,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// get report by userId -> for members
const getReportsByUserId = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'Unauthorized. User ID not found!' });
        }

        const loggedUserId = req.user.userId;

        const [rows] = await db.execute(
            `SELECT
                wr.id,
                wr.user_id,
                wr.project_id,
                wr.week_start_date,
                wr.week_end_date,
                wr.tasks_completed,
                wr.tasks_planned,
                wr.blockers,
                wr.hours_worked,
                wr.notes,
                wr.status,
                wr.submitted_at,
                wr.created_at,
                wr.updated_at,
                p.name AS project_name
            FROM weekly_reports wr
            JOIN projects p ON wr.project_id = p.id
            WHERE wr.user_id = ?
            ORDER BY wr.week_start_date DESC, wr.created_at DESC`,
            [loggedUserId],
        );

        return res.status(200).json({
            message: 'User reports loaded successfully',
            count: rows.length,
            data: rows,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// update report
const updateReport = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'Unauthorized. User ID not found!' });
        }

        const userId = req.user.userId;
        const { reportId } = req.params;

        const {
            projectId,
            weekStartDate,
            weekEndDate,
            tasksCompleted,
            tasksPlanned,
            blockers,
            hoursWorked,
            notes,
        } = req.body;

        const [existingReport] = await db.execute(`SELECT * FROM weekly_reports WHERE id = ?`, [
            reportId,
        ]);

        if (existingReport.length === 0) {
            return res.status(404).json({ message: 'Report not found' });
        }

        const report = existingReport[0];

        if (report.user_id !== userId) {
            return res
                .status(403)
                .json({ message: 'Access denied. You can update only your own report' });
        }

        if (report.status !== 'draft') {
            return res.status(400).json({ message: 'Submitted reports cannot be updated' });
        }

        await db.execute(
            `UPDATE weekly_reports
             SET
                project_id = ?,
                week_start_date = ?,
                week_end_date = ?,
                tasks_completed = ?,
                tasks_planned = ?,
                blockers = ?,
                hours_worked = ?,
                notes = ?
             WHERE id = ?`,
            [
                projectId || report.project_id,
                weekStartDate || report.week_start_date,
                weekEndDate || report.week_end_date,
                tasksCompleted || report.tasks_completed,
                tasksPlanned || report.tasks_planned,
                blockers !== undefined ? blockers : report.blockers,
                hoursWorked !== undefined ? hoursWorked : report.hours_worked,
                notes !== undefined ? notes : report.notes,
                reportId,
            ],
        );

        const [updatedReport] = await db.execute(`SELECT * FROM weekly_reports WHERE id = ?`, [
            reportId,
        ]);

        return res.status(200).json({
            message: 'Report updated successfully',
            data: updatedReport[0],
        });
    } catch (error) {
        console.log(error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                message: 'A report already exists for this week',
            });
        }

        return res.status(500).json({ message: 'Internal server error' });
    }
};

// delete report -> only draft status reports only
const deleteReport = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: 'Unauthorized. User ID not found!' });
        }

        const userId = req.user.userId;
        const { reportId } = req.params;

        const [existingReport] = await db.execute(`SELECT * FROM weekly_reports WHERE id = ?`, [
            reportId,
        ]);

        if (existingReport.length === 0) {
            return res.status(404).json({ message: 'Report not found' });
        }

        const report = existingReport[0];

        if (report.user_id !== userId) {
            return res
                .status(403)
                .json({ message: 'Access denied. You can delete only your own report' });
        }

        if (report.status !== 'draft') {
            return res.status(400).json({
                message: 'Only draft reports can be deleted',
            });
        }

        await db.execute(`DELETE FROM weekly_reports WHERE id = ?`, [reportId]);

        return res.status(200).json({
            message: 'Draft report deleted successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default {
    createReport,
    getAllReports,
    getReportsByUserId,
    updateReport,
    deleteReport,
};
