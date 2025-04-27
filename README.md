# Task Management Application

A full-stack task management application built with React, Node.js, Express, MongoDB, and plain CSS.

## Features
- User registration and login with JWT authentication
- Create, view, update, and delete tasks
- Filter tasks by status (All, Active, Completed)
- Task properties: title, description, status, priority, creation date
- Responsive UI with plain CSS
- Custom authentication hook
- Prop validation with PropTypes

## Technical Choices
- **Frontend**: React with Vite for fast development and build, React Router for navigation, plain CSS for styling
- **Backend**: Node.js with Express for RESTful API, MongoDB for NoSQL database
- **Authentication**: JWT for secure user authentication
- **State Management**: React Hooks for local state, custom `useAuth` hook for authentication state
- **Error Handling**: Comprehensive error handling in API routes and frontend API calls
- **Database**: MongoDB with Mongoose for schema-based data modeling

## Database Schema
### User
```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date (default: now)
}
--
### Tasks
{
  title: String (required),
  description: String,
  status: String (enum: ['incomplete', 'complete'], default: 'incomplete'),
  priority: String (enum: ['Low', 'Medium', 'High'], default: 'Low'),
  userId: ObjectId (ref: 'User', required),
  createdAt: Date (default: now)
}
```
--
# $ Prerequisites
Node.js (v16 or higher)

MongoDB ( MongoDB compass)

## Dependencies for Run Project
## frontend
```javascript
npx create-react-app frontend

npm install axios react-router-dom
```
## Backend
```javascript
npm init -y
npm install express mongoose bcryptjs jsonwebtoken dotenv cors

GENERATE JWT SECRET KEY:
Terminal : node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
## Running the Application
### frontend:
```javascript
npm start
```
### backend: 
```javascript
node server.js
```
## Test Users(seed.js)
--
note:before run this backend server run seed data
```javascript
node seed.js
```

```javascript
Email: test1@example.com, Password: password123
Email: test2@example.com, Password: password123
```


