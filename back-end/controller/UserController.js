import db from '../model/connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;
const secret_key = process.env.JWT_SECRET;

// user sign up controller
const signUp = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword, userRole } = req.body;

    try {
        console.log(firstName, lastName, email, password, confirmPassword, userRole);

        // all field are required -> check
        if (!firstName || !lastName || !email || !password || !confirmPassword || !userRole) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // need to check is user exists
        const [isUserExists] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

        // if user exists
        if (isUserExists.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // if not create account
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // save user in database
        const [result] = await db.execute(
            'INSERT INTO users (first_name, last_name, email, password_hash, role) VALUES (?,?,?,?,?)',
            [firstName, lastName, email, hashedPassword, userRole],
        );

        if (result.affectedRows > 0) {
            return res.status(201).json({ message: 'User registered successfully' });
        } else {
            return res.status(500).json({ message: 'Failed to register user' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// user sign in controller
const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

        console.log(rows[0]);

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const match = await bcrypt.compare(password, rows[0].password_hash);
        if (match) {
            const token = jwt.sign(
                { userId: rows[0].id, email: rows[0].email, userRole: rows[0].role },
                secret_key,
                {
                    expiresIn: '1h',
                },
            );
            return res.json({ message: 'Login successful', token });
        }

        return res.status(401).json({ message: 'Invalid email or password' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getUser = async (req, res) => {
    try {
        if (!req.user || !req.user.userId) {
            console.log(req.user);
            return res.status(401).json({ message: 'Unauthorized. User ID not found!' });
        }
        const userId = req.user.userId;

        const [rows] = await db.execute('SELECT * FROM users WHERE id =?', [userId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User data loaded successfully', data: rows[0] });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default { signUp, signIn, getUser };
