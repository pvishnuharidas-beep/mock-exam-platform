# Mock Exam Platform Requirements

## Modules
Software Requirements Specification (SRS)
Mock Exam Platform
1. Introduction
1.1 Purpose

The purpose of this document is to provide a detailed description of the Mock Exam Platform system. The document outlines the functional and non-functional requirements of the system and serves as a reference for developers, testers, and stakeholders involved in the development process.

This document defines how the system should behave, what features it must support, and the constraints under which it operates.

1.2 Scope

The Mock Exam Platform is an online examination system designed to allow students to practice exams and administrators to manage exams, questions, and users.

The system will provide the following functionalities:

User registration and authentication

Role-based access control

Exam creation and management

Question management

Exam attempt and submission

Automatic result calculation

Result viewing and reporting

The system will be implemented using:

Backend API built with Node.js and Express

Authentication using JWT

Database for storing users, exams, questions, and results

1.3 Definitions and Acronyms
Term	Description
Admin	System administrator who manages exams and users
Student	User who takes exams
JWT	JSON Web Token used for authentication
API	Application Programming Interface
SRS	Software Requirements Specification
2. Overall Description
2.1 System Overview

The Mock Exam Platform will consist of multiple modules:

Authentication module

User management module

Exam management module

Question management module

Exam attempt module

Result management module

The system will follow a client-server architecture where the frontend communicates with the backend through REST APIs.

2.2 System Architecture

System Architecture:

User Interface (Frontend)
        ↓
REST API Server (Node.js + Express)
        ↓
Database (MongoDB)

Components:

Frontend (Web Interface)

Backend API server

Database server

2.3 User Roles
Admin

Admin users can:

Create and manage exams

Add, update, and delete questions

Manage users

View exam results

Monitor system usage

Student

Student users can:

Register and login

View available exams

Attempt exams

Submit answers

View their results

2.4 Assumptions and Dependencies

Assumptions:

Users have internet access.

Users use modern web browsers.

System database is available and operational.

Dependencies:

Backend requires Node.js runtime.

Database requires MongoDB server.

3. Functional Requirements
3.1 Authentication Module
Description

Handles user registration, login, and authentication.

Functional Requirements

The system shall:

Allow users to register with username and password.

Allow users to login using registered credentials.

Generate JWT tokens upon successful login.

Verify authentication tokens for protected APIs.

Assign roles to users (Admin or Student).

API Endpoints

Register User

POST /api/auth/register

Request:

{
 "username": "vishnu",
 "password": "1234",
 "role": "student"
}

Response:

User registered successfully

Login

POST /api/auth/login

Response:

{
 "message": "Login successful",
 "token": "JWT_TOKEN"
}
3.2 User Management Module
Description

Handles user-related operations such as viewing users and managing roles.

Functional Requirements

The system shall:

Allow admin to view all users.

Allow admin to delete users.

Allow admin to update user roles.

Allow users to view their profile information.

API Endpoints

Get all users

GET /api/users

Get user details

GET /api/users/:id

Delete user

DELETE /api/users/:id

Update user role

PUT /api/users/:id
3.3 Exam Management Module
Description

Handles creation and management of exams.

Functional Requirements

The system shall:

Allow admin to create exams.

Allow admin to update exam details.

Allow admin to delete exams.

Allow students to view available exams.

Exam Data Structure
{
 "title": "Math Mock Test",
 "duration": 60,
 "totalMarks": 100
}
API Endpoints

Create exam

POST /api/exams

Get all exams

GET /api/exams

Update exam

PUT /api/exams/:id

Delete exam

DELETE /api/exams/:id
3.4 Question Management Module
Description

Handles creation and management of exam questions.

Functional Requirements

The system shall:

Allow admin to add questions.

Allow admin to update questions.

Allow admin to delete questions.

Allow questions to be linked to exams.

Question Data Structure
{
 "question": "What is 2 + 2?",
 "options": ["1","2","3","4"],
 "correctAnswer": "4",
 "examId": "EXAM_ID"
}
API Endpoints

Add question

POST /api/questions

Get questions for exam

GET /api/questions/exam/:examId

Update question

PUT /api/questions/:id

Delete question

DELETE /api/questions/:id
3.5 Exam Attempt Module
Description

Allows students to take exams.

Functional Requirements

The system shall:

Allow students to start an exam.

Record answers submitted by students.

Track exam duration.

Submit exam answers.

API Endpoints

Start exam

POST /api/exam/start

Submit exam

POST /api/exam/submit

Example request:

{
 "answers": [
   {"questionId": "1", "answer": "4"},
   {"questionId": "2", "answer": "B"}
 ]
}
3.6 Result Management Module
Description

Handles calculation and storage of exam results.

Functional Requirements

The system shall:

Automatically calculate exam scores.

Store exam results.

Allow students to view their results.

Allow admin to view all results.

Result Data Structure
{
 "userId": "USER_ID",
 "examId": "EXAM_ID",
 "score": 80,
 "totalMarks": 100
}
API Endpoints

Get student result

GET /api/results/my

Get all results

GET /api/results
4. Non-Functional Requirements
Performance

The system should support multiple users accessing the system simultaneously.

Security

The system must implement:

JWT authentication

Role-based access control

Secure password storage

Reliability

The system should ensure no data loss for exams or results.

Scalability

The system should be designed to support increasing numbers of users and exams.

5. Database Design

The database will contain the following collections:

Users

User
 - id
 - username
 - password
 - role

Exams

Exam
 - id
 - title
 - duration
 - totalMarks

Questions

Question
 - id
 - question
 - options
 - correctAnswer
 - examId

Results

Result
 - id
 - userId
 - examId
 - score
6. System Constraints

The system must:

Use Node.js backend

Follow REST API design

Use JSON data format

Support modern browsers

7. Future Enhancements

Possible future improvements:

Online exam timer

Question randomization

Leaderboard

Exam analytics

AI-based question recommendation

8. Conclusion

This document describes the functional and non-functional requirements of the Mock Exam Platform. The system will allow administrators to manage exams and students to practice exams online. The system architecture ensures scalability, security, and maintainability