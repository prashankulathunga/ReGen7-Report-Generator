import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import cors from 'cors';

import db from './model/connection.js';

// route import
import UserRoute from './route/UserRoute.js';
import ReportRoute from './route/ReportRoute.js';
import ProjectRoute from './route/ProjectRoute.js';

// initialize express app
const app = express();
app.use(express.json());

// define cors for cros origin problem -> :5173 to :3000
app.use(cors());

// .env file configuration
dotenv.config();

const port = process.env.PORT;

// because we need to get body data -> req.body
app.use(bodyParser.json());

// Test database connection
const testDatabaseConnection = async () => {
    try {
        const [rows] = await db.query('SHOW TABLES;');
        console.log(
            `Connected to the database: Tables found: ${rows.map((row) => Object.values(row)[0]).join(', ')}`,
        );
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

// Start the server
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    await testDatabaseConnection();
});

// route section
app.use('/api/v1/user', UserRoute);
app.use('/api/v1/report', ReportRoute);
app.use('/api/v1/project', ProjectRoute);
