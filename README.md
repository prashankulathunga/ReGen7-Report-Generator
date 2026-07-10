# ReGen7 - Weekly Report Generator & Team Dashboard

RGEN is a full-stack weekly report management system designed for teams to create, submit, manage, and analyze structured weekly work reports.

The application allows **Team Members** to create and manage their own weekly reports, while **Managers/Admins** can view team-wide reports, manage projects/categories, track submission status, and analyze team progress using dashboard insights.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [User Roles](#user-roles)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Database Design](#database-design)
- [ER Diagram Overview](#er-diagram-overview)
- [Project Structure](#project-structure)
- [Frontend Features](#frontend-features)
- [Backend Features](#backend-features)
- [API Endpoints](#api-endpoints)
- [Installation Guide](#installation-guide)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Authentication Flow](#authentication-flow)
- [Role-Based Access Control](#role-based-access-control)
- [Validation](#validation)
- [Demo Users](#demo-users)
- [Future Improvements](#future-improvements)
- [Challenges Faced](#challenges-faced)
- [Author](#author)

---

## Project Overview

RGEN is an internal team reporting platform that helps organizations collect consistent weekly updates from team members.

The main goal of the system is to replace unstructured weekly updates with a clean, fixed-format report system. Each report follows the same structure, making it easier for managers to compare progress, identify blockers, monitor workload, and track team performance.

Team members can create reports for each week, save them as drafts, submit them, and view their own report history. Managers can view all reports, filter by team member/project/status/date, manage projects, and analyze report data through a dashboard.

---

## Key Features

### Authentication

- User registration
- User login
- User logout
- Password hashing
- Secure authentication using JWT
- Protected routes
- Role-based access control

### Team Member Features

- Create weekly report
- Save report as draft
- Submit report
- Edit own draft reports
- Delete own draft reports
- View own report history
- View assigned projects
- View report status

### Manager/Admin Features

- View all submitted and draft reports
- Filter reports by:
  - Team member
  - Project/category
  - Status
  - Week/date range
- Manage projects/categories
- Assign users to projects
- Update project details
- Delete unused projects
- Track submission status
- Analyze team progress

### Dashboard Features

- Total submitted reports
- Submission compliance overview
- Pending reports
- Open blockers
- Project workload overview
- Recent report activity
- Team report summary

---

## User Roles

The application uses a single `users` table with a `role` field.

Available roles:

| Role | Description |
|---|---|
| `member` | Can create, update, submit, and delete own draft reports |
| `manager` | Can view team reports and manage projects |
| `admin` | Has manager-level access and can be extended for system administration |

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- Sonner Toast
- Lucide React Icons
- React Router DOM

### Backend

- Node.js
- Express.js
- MySQL
- mysql2
- JWT Authentication
- bcrypt password hashing
- Cookie-based authentication
- REST API architecture

### Database

- MySQL
- Relational database design
- Auto-increment primary keys
- Foreign key constraints
- Generated registration code
- Many-to-many user-project relationship

---

## System Architecture

```txt
Client - React Frontend
        |
        | HTTP Requests
        |
Server - Node.js / Express API
        |
        | SQL Queries
        |
Database - MySQL
```

### High-Level Flow

```txt
User logs in
    ↓
JWT token is issued
    ↓
Protected routes verify token
    ↓
Role is checked
    ↓
User can access allowed features
```

---

## Database Design

The database contains four main tables:

1. `users`
2. `projects`
3. `user_projects`
4. `weekly_reports`

### users

Stores all users including team members, managers, and admins.

Important fields:

```txt
id
first_name
last_name
email
password_hash
reg_code
role
is_active
created_at
updated_at
```

### projects

Stores project/category details.

Important fields:

```txt
id
name
description
is_active
created_by
created_at
updated_at
```

### user_projects

Stores the relationship between users and projects.

Important fields:

```txt
user_id
project_id
assigned_at
```

### weekly_reports

Stores weekly work reports submitted by team members.

Important fields:

```txt
id
user_id
project_id
week_start_date
week_end_date
tasks_completed
tasks_planned
blockers
hours_worked
notes
status
submitted_at
created_at
updated_at
```

---

## ER Diagram Overview

```txt
users 1 -------- M weekly_reports

projects 1 ----- M weekly_reports

users M -------- M projects
       through user_projects
```

### Relationship Explanation

- One user can create many weekly reports.
- One project can have many weekly reports.
- One user can be assigned to many projects.
- One project can have many users.
- Managers are also stored in the `users` table.
- Manager access is controlled through the `role` column, not through a separate manager table.

---

## Project Structure

```txt
rgen/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── form/
│   │   │   ├── layout/
│   │   │   └── common/
│   │   │
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── reports/
│   │   │   ├── projects/
│   │   │   └── dashboard/
│   │   │
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── member/
│   │   │   └── manager/
│   │   │
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── types/
│   │   ├── lib/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── reportController.js
│   │   │   └── projectController.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── verifyToken.js
│   │   │   └── roleMiddleware.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── reportRoutes.js
│   │   │   └── projectRoutes.js
│   │   │
│   │   ├── utils/
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── database/
│   └── rgen_db.sql
│
└── README.md
```

---

## Frontend Features

### Authentication Pages

- Sign In page
- Sign Up page
- Form validation using Zod
- React Hook Form controlled inputs
- Toast messages for success/error feedback

### Layout

- Responsive dashboard layout
- Sidebar navigation
- Top navigation
- Role-based menu items
- Clean shadcn/ui card and table design

### Team Member Pages

- My Reports
- Create Report
- Edit Draft Report
- View Report Details
- Assigned Projects

### Manager Pages

- Manager Dashboard
- All Reports
- Project Management
- Team Members
- Submission Status

### Reusable Components

- FormInput
- FormTextarea
- ProjectCreateForm
- ProjectTable
- ReportForm
- ReportTable
- DashboardCards
- ProtectedRoute

---

## Backend Features

### Authentication

- Register user
- Login user
- Logout user
- Get authenticated user
- Password hashing using bcrypt
- JWT token generation
- Token verification middleware

### Reports

- Create weekly report
- Get all reports for manager/admin
- Get own reports for member
- Update draft report
- Delete draft report only

### Projects

- Create project
- Update project
- Delete project
- Get projects by user ID
- Assign users to project

### Security

- Passwords are never stored as plain text
- Passwords are stored as hashed values
- JWT is used for authentication
- Role-based access control protects manager routes
- Members can only access their own reports

---

## API Endpoints

### Authentication Routes

Base URL:

```txt
/api/auth
```

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/register` | Register new user | Public |
| POST | `/login` | Login user | Public |
| POST | `/logout` | Logout user | Authenticated |
| GET | `/me` | Get logged-in user | Authenticated |

---

### User Routes

Base URL:

```txt
/api/users
```

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/me` | Get current user profile | Authenticated |
| GET | `/` | Get all users | Manager/Admin |

---

### Report Routes

Base URL:

```txt
/api/reports
```

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/` | Create weekly report | Member |
| GET | `/all` | Get all reports | Manager/Admin |
| GET | `/my-reports` | Get own reports | Member |
| PUT | `/:reportId` | Update own draft report | Member |
| DELETE | `/:reportId` | Delete own draft report | Member |

### Create Report Request Body

```json
{
  "projectId": 1,
  "weekStartDate": "2026-07-06",
  "weekEndDate": "2026-07-12",
  "tasksCompleted": "Completed login UI and signup UI.",
  "tasksPlanned": "Implement authentication API.",
  "blockers": "Need final role-based route structure.",
  "hoursWorked": 25,
  "notes": "Frontend layout completed.",
  "status": "draft"
}
```

### Submit Report Request Body

```json
{
  "projectId": 1,
  "weekStartDate": "2026-07-06",
  "weekEndDate": "2026-07-12",
  "tasksCompleted": "Completed login UI and signup UI.",
  "tasksPlanned": "Implement authentication API.",
  "blockers": "Need final role-based route structure.",
  "hoursWorked": 25,
  "notes": "Frontend layout completed.",
  "status": "submitted"
}
```

---

### Project Routes

Base URL:

```txt
/api/projects
```

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/` | Create project | Manager/Admin |
| PUT | `/:projectId` | Update project | Manager/Admin |
| DELETE | `/:projectId` | Delete project | Manager/Admin |
| GET | `/my-projects` | Get logged-in user projects | Authenticated |
| GET | `/user/:userId` | Get projects by user ID | Member own / Manager any |

### Create Project Request Body

```json
{
  "name": "Internal Tooling",
  "description": "Internal software tools and dashboard improvements.",
  "assignedUserIds": [1, 2, 3]
}
```

### Update Project Request Body

```json
{
  "name": "Internal Tools",
  "description": "Updated project description",
  "isActive": true,
  "assignedUserIds": [1, 3]
}
```

---

## Installation Guide

### Prerequisites

Make sure the following are installed:

```txt
Node.js
npm
MySQL Server
Git
```

Recommended versions:

```txt
Node.js: 18+
npm: 9+
MySQL: 8+
```

---

## Clone the Repository

```bash
git clone https://github.com/your-username/rgen-weekly-report-dashboard.git
cd rgen-weekly-report-dashboard
```

---

## Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=rgen_db

JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1h

CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

## Database Setup

Open MySQL and run the database script.

```bash
mysql -u root -p
```

Then run:

```sql
SOURCE path/to/database/rgen_db.sql;
```

Or manually run the SQL file using MySQL Workbench.

---

## Database SQL

```sql
DROP DATABASE IF EXISTS rgen_db;
CREATE DATABASE rgen_db;
USE rgen_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,

    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,

    reg_code VARCHAR(20)
        GENERATED ALWAYS AS (
            CONCAT('RGEN', LPAD(id + 1000, 4, '0'))
        ) STORED UNIQUE,

    role ENUM('member', 'manager', 'admin') NOT NULL DEFAULT 'member',

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) NOT NULL UNIQUE,
    description TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_by INT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_projects_created_by
        FOREIGN KEY (created_by)
        REFERENCES users(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);

CREATE TABLE user_projects (
    user_id INT NOT NULL,
    project_id INT NOT NULL,

    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (user_id, project_id),

    CONSTRAINT fk_user_projects_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_user_projects_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE weekly_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,
    project_id INT NOT NULL,

    week_start_date DATE NOT NULL,
    week_end_date DATE NOT NULL,

    tasks_completed TEXT NOT NULL,
    tasks_planned TEXT NOT NULL,
    blockers TEXT,
    hours_worked DECIMAL(5,2),
    notes TEXT,

    status ENUM('draft', 'submitted') NOT NULL DEFAULT 'draft',

    submitted_at TIMESTAMP NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_reports_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_reports_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_week_dates
        CHECK (week_end_date >= week_start_date),

    CONSTRAINT chk_hours_worked
        CHECK (hours_worked IS NULL OR hours_worked >= 0),

    CONSTRAINT unique_user_week
        UNIQUE (user_id, week_start_date, week_end_date)
);
```

---

## Running the Application

### Run Backend

```bash
cd backend
npm install
npm run dev
```

Backend will run on:

```txt
http://localhost:5000
```

---

### Run Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```txt
http://localhost:5173
```

---

## Authentication Flow

```txt
User submits login form
        ↓
Backend checks email and password
        ↓
Password is compared with hashed password
        ↓
JWT token is created
        ↓
Token is stored in secure cookie
        ↓
Frontend loads authenticated user
        ↓
User is redirected based on role
```

---

## Role-Based Access Control

### Member Access

Members can:

```txt
Create own reports
View own reports
Edit own draft reports
Delete own draft reports
View assigned projects
```

Members cannot:

```txt
View all team reports
Manage projects
Access manager dashboard
Delete submitted reports
Edit submitted reports
```

### Manager/Admin Access

Managers and admins can:

```txt
View all reports
Filter reports
Manage projects
Assign users to projects
View dashboard metrics
Track submission status
```

---

## Validation

Frontend validation is handled using:

```txt
React Hook Form
Zod
shadcn/ui Field components
```

### Register Schema Example

```ts
export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
    role: z.enum(["member", "manager", "admin"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
```

### Project Schema Example

```ts
export const createProjectSchema = z.object({
  name: z
    .string()
    .min(3, "Project name must be at least 3 characters")
    .max(100, "Project name must be less than 100 characters"),

  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),

  assignedUserIds: z.array(z.number()).optional(),
});
```

---

## Demo Users

Use these users after inserting sample data.

> Passwords depend on the seed data and backend hashing implementation. Replace these with real seeded credentials when finalizing the demo.

| Role | Email | Description |
|---|---|---|
| Member | alex.johnson@example.com | Team member account |
| Member | sarah.williams@example.com | Team member account |
| Member | michael.brown@example.com | Team member account |
| Manager | olivia.wilson@example.com | Manager account |
| Admin | james.anderson@example.com | Admin account |

---

## Important Business Rules

### Report Rules

- A member can create only one report for the same week.
- A member can update only their own reports.
- Submitted reports cannot be edited.
- Only draft reports can be deleted.
- `submitted_at` is `NULL` until the report is submitted.
- When a report is submitted, `submitted_at` is updated to the current timestamp.

### Project Rules

- Only managers/admins can create projects.
- Only managers/admins can update projects.
- Only managers/admins can delete projects.
- Projects already used in weekly reports should not be deleted.
- A project can have many assigned users.
- A user can be assigned to many projects.

### User Rules

- Passwords should never be returned to the frontend.
- Passwords should never be stored as plain text.
- Authenticated user data should not include `password_hash`.

---

## UI Design

The user interface follows a modern SaaS dashboard style.

### Design Principles

- Clean layout
- Simple navigation
- Reusable components
- Clear form validation
- Responsive design
- Consistent spacing
- Professional dashboard cards
- Modern tables with actions

### Main UI Components

```txt
Button
Card
Input
Textarea
Table
Badge
Dropdown Menu
Alert Dialog
Field
Checkbox
Sidebar
Navbar
Toast
```

---

## Manager Dashboard Metrics

The manager dashboard can show:

```txt
Total reports submitted this week
Submission compliance rate
Pending reports
Late reports
Open blockers
Total hours worked
Project workload distribution
Recent submitted reports
```

---

## Example SQL Queries for Dashboard

### Total Submitted Reports

```sql
SELECT COUNT(*) AS total_submitted_reports
FROM weekly_reports
WHERE status = 'submitted'
AND week_start_date = '2026-07-06'
AND week_end_date = '2026-07-12';
```

### Open Blockers

```sql
SELECT COUNT(*) AS open_blockers
FROM weekly_reports
WHERE blockers IS NOT NULL
AND blockers != '';
```

### Reports With User and Project

```sql
SELECT 
    wr.id,
    CONCAT(u.first_name, ' ', u.last_name) AS team_member,
    u.email,
    p.name AS project_name,
    wr.week_start_date,
    wr.week_end_date,
    wr.tasks_completed,
    wr.tasks_planned,
    wr.blockers,
    wr.hours_worked,
    wr.status,
    wr.submitted_at
FROM weekly_reports wr
JOIN users u ON wr.user_id = u.id
JOIN projects p ON wr.project_id = p.id
ORDER BY wr.week_start_date DESC, wr.created_at DESC;
```

### Workload By Project

```sql
SELECT 
    p.name AS project_name,
    SUM(wr.hours_worked) AS total_hours
FROM weekly_reports wr
JOIN projects p ON wr.project_id = p.id
GROUP BY p.id, p.name
ORDER BY total_hours DESC;
```

---

## Future Improvements

The following features can be added in future versions:

- AI-powered weekly team summary
- AI chat assistant for manager questions
- Email reminders for pending reports
- CSV/PDF export
- Notification system
- Advanced dashboard charts
- Report approval workflow
- Comment system for manager feedback
- Audit logs
- Dark mode
- Unit and integration tests
- Docker support
- CI/CD deployment pipeline

---

## Challenges Faced

### Role-Based Access Control

One challenge was designing access for members and managers without duplicating user tables. This was solved by using one `users` table with a `role` column.

### Report Submission Workflow

Reports can exist as drafts before submission. Therefore, `submitted_at` is nullable and only gets a timestamp when the report is submitted.

### Project Assignment

Users and projects have a many-to-many relationship. This was solved using the `user_projects` junction table.

### Data Consistency

The system prevents duplicate weekly reports for the same user and same week using a unique constraint on:

```txt
user_id
week_start_date
week_end_date
```

---

## Development Notes

Recommended commit style:

```bash
feat(auth): add sign in and sign up pages
feat(layout): add dashboard layout
feat(report): implement report creation
feat(project): add project management section
feat(api): add report backend endpoints
fix(auth): handle invalid login response
refactor(ui): improve reusable form components
docs: update README
```

---

## Submission Deliverables

For the technical assessment, the following should be submitted:

```txt
GitHub repository link
Video demo link
ER diagram link
Presentation file link
```

---

## Author

Developed by:

```txt
Prashan Kulathunga
```

---

## License

This project is created for technical assessment and educational purposes.
