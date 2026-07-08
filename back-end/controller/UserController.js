import db from '../model/connection.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;
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
const signIn = (req, res) => {
    try {
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export default { signUp, signIn };
