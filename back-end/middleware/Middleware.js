import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

const Secret_key = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
    // Verify token here

    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token not provided or invalid format!' });
    }

    // Remove "Bearer " prefix to get actual token
    const token = authHeader.split(' ')[1];

    console.log(authHeader);

    // Check if token is valid and not expired
    if (!token) {
        return res.status(401).json({ message: 'Token not provided!' });
    }

    try {
        // Verify the token
        const decodedValue = jwt.verify(token, Secret_key);
        console.log(decodedValue); // Log the decoded value for debugging purposes
        req.user = decodedValue; // Attach user info to the request
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        return res.status(403).json({ message: 'Token is not valid!' });
    }
};

export default { verifyToken };
