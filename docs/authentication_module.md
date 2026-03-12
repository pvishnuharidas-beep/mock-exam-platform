Authentication Module

(Mock Exam Platform – Software Requirements / Design)

1. Module Overview
1.1 Purpose

The Authentication Module is responsible for verifying user identity and controlling access to the Mock Exam Platform. It ensures that only authorized users can access system resources such as exams, questions, and results.

The module performs the following primary functions:

User account creation

User login verification

Token generation and validation

Role-based access control

Session management

Secure password storage

The authentication system uses:

JSON Web Token for secure API authentication

bcrypt for password encryption

2. Authentication Module Architecture
Client
   |
   v
API Request
   |
   v
Authentication Middleware
   |
   +--------------------+
   | Authentication API |
   +--------------------+
      |          |
      v          v
 Login Service  Registration Service
      |
      v
 Token Service
      |
      v
 Authorization Service
      |
      v
 Database
3. Sub-Modules of Authentication

The Authentication Module consists of the following 13 sub-modules.

No	Sub-Module
1	User Registration
2	Input Validation
3	Password Encryption
4	Password Comparison
5	Login Service
6	Token Generation
7	Token Verification
8	Session Management
9	Refresh Token
10	Role Management
11	Authorization
12	Logout
13	Authentication Middleware
4. Sub-Module Specifications
4.1 User Registration Sub-Module
Purpose

Allows new users to create an account in the system.

Input
Field	Description
username	unique user name
password	user password
role	student/admin

Example:

{
 "username": "vishnu",
 "password": "1234",
 "role": "student"
}
Processing

Validate user input.

Check if the username already exists.

Encrypt the password.

Store user data in database.

Output

Success:

{
 "message": "User registered successfully"
}

Failure:

{
 "message": "User already exists"
}
Dependencies
Depends On
Input Validation
Password Encryption
User Database
4.2 Input Validation Sub-Module
Purpose

Ensure that incoming user data follows required format.

Input

User request body.

Example:

{
 "username": "",
 "password": "12"
}
Processing

Check required fields.

Validate string length.

Validate role values.

Output

Valid:

{
 "status": "valid"
}

Invalid:

{
 "message": "Invalid input"
}
Dependencies
Depends On
Registration
Login
4.3 Password Encryption Sub-Module
Purpose

Encrypt user password before storing in database.

Input

Plain password.

mypassword
Processing

Hash password using bcrypt.

Output

Encrypted password.

$2b$10$asf98asf9sdf8sdf8...
Dependencies
Depends On
bcrypt library
4.4 Password Comparison Sub-Module
Purpose

Compare user entered password with stored encrypted password.

Input
Field	Description
enteredPassword	user input
storedPassword	encrypted password
Processing

Use bcrypt compare function.

Output
true / false
Dependencies
Depends On
Password Encryption
Login Module
4.5 Login Sub-Module
Purpose

Authenticate users.

Input
{
 "username": "vishnu",
 "password": "1234"
}
Processing

Validate input.

Retrieve user record.

Compare passwords.

Generate authentication token.

Output
{
 "message": "Login successful",
 "token": "JWT_TOKEN"
}
Dependencies
Depends On
Input Validation
Password Comparison
Token Generation
4.6 Token Generation Sub-Module
Purpose

Generate authentication token.

Input
Field
userId
role

Example:

{
 "userId": 12,
 "role": "admin"
}
Processing

Create JWT token.

Output
JWT_TOKEN
Dependencies
Depends On
Login Module
JWT Library
4.7 Token Verification Sub-Module
Purpose

Verify validity of token for protected APIs.

Input
Authorization: Bearer TOKEN
Processing

Extract token.

Verify token signature.

Decode payload.

Output

Valid user information.

Dependencies
Depends On
Token Generation
4.8 Session Management Sub-Module
Purpose

Maintain active user sessions.

Input
Field
userId
token
Output

Session stored / updated.

Dependencies
Depends On
Login
Token Generation
4.9 Refresh Token Sub-Module
Purpose

Generate new access tokens after expiration.

Input
refreshToken
Output
newAccessToken
Dependencies
Depends On
Token Generation
Session Management
4.10 Role Management Sub-Module
Purpose

Define system user roles.

Example roles:

Admin
Student
Examiner
Dependencies
Depends On
User Database
4.11 Authorization Sub-Module
Purpose

Ensure users access only permitted resources.

Input
Field
role
API endpoint
Output
Access Granted

or

Access Denied
Dependencies
Depends On
Token Verification
Role Management
4.12 Logout Sub-Module
Purpose

End user authentication session.

Input
JWT token
Output
{
 "message": "Logout successful"
}
Dependencies
Depends On
Token Verification
Session Management
4.13 Authentication Middleware
Purpose

Protect backend APIs.

Example protected endpoint:

GET /api/admin
Input

HTTP request with token.

Output

Authorized / Unauthorized response.

Dependencies
Depends On
Token Verification
Authorization
5. Authentication Flow Diagram
User
  |
  v
Register / Login
  |
  v
Authentication Controller
  |
  v
Password Verification
  |
  v
Token Generation
  |
  v
Client receives token
  |
  v
Client API Request
  |
  v
Authentication Middleware
  |
  v
Token Verification
  |
  v
Authorization
  |
  v
Access Granted