# Life Tracking System

## Features

### Authentication and Authorization
- **JWT Authentication**: Secure user login and session management using JSON Web Tokens.
- **Forgot Password Module**: Ability for users to reset their passwords via email.

### Goals and Progress Tracking
- **Goal Management**: Users can create, update, and delete their own goals.
- **Task Tracking**: Within each goal, tasks can be added to track progress.
- **Progress Monitoring**: Track completed and pending tasks to achieve goals.

### Fitness Tracking
- **Daily, Weekly, Monthly Tracking**: Monitor fitness activities and calories burned across different time intervals.
- **Category-wise Monitoring**: Track fitness activities based on different categories (e.g., cardio, strength).

### Finance Tracking
- **Expense and Income Tracking**: Log and categorize expenses and incomes.
- **Category-wise Analysis**: Understand spending patterns across various expense categories.

### Streak Tracking
- **Yearly Streak**: Track consecutive active days throughout the year.
- **Monthly Streak**: Monitor monthly activity streaks to maintain consistency.

### Note Taking
- **Note Management**: Users can create and save important notes.
- **Reminder Integration**: Store notes in a database for easy retrieval and reminders.

## Technologies Used

- **Backend**: Developed using Spring Boot for robust and scalable API services.
- **Authentication**: Implemented JWT for secure authentication and authorization.
- **Frontend**: Built with React for a dynamic and responsive user interface.

## Installation and Setup

### Prerequisites
- Java Development Kit (JDK) 11 or higher
- Node.js and npm/yarn for frontend dependencies

### Backend Setup
1. Clone the repository.
2. Navigate to the `backend` directory.
3. Run `./mvnw spring-boot:run` to start the backend server.

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Run `npm install` or `yarn install` to install dependencies.
3. Run `npm start` or `yarn start` to start the frontend development server.

### Configuration
- Backend: Update `application.properties` with database and security configurations.
- Frontend: Configure API endpoints in `src/api/config.js`.

## Usage
- Access the application at `http://localhost:3000` (frontend) and `http://localhost:8080` (backend).
- Register, login, and explore various modules to track goals, fitness, finances, streaks, and notes.


## License
- This project is licensed under the MIT License - see the LICENSE file for details.
