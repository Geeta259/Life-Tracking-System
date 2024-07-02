# Life Tracking Application

This is a comprehensive life tracking application designed to help users manage their personal and professional lives efficiently. The application covers various aspects of life management including goals, tasks, finances, fitness routines, attendance, and notes. It provides a user-friendly interface and robust backend to ensure a seamless experience. The frontend is built using React, while the backend is powered by Spring Boot.

## Table of Contents

1. [Project Description](#project-description)
2. [Features](#features)
   - [User Authentication](#user-authentication)
   - [Goal Tracking](#goal-tracking)
   - [Task Management](#task-management)
   - [Salary Tracking](#salary-tracking)
   - [Fitness Tracking](#fitness-tracking)
   - [Streak Tracking](#streak-tracking)
   - [Note-Taking](#note-taking)
3. [Frontend](#frontend)
4. [Backend](#backend)
5. [Setup and Installation](#setup-and-installation)
6. [Impact and Effectiveness](#impact-and-effectiveness)

## Project Description

The Life Tracking Application is designed to empower users to achieve their goals, manage their tasks, track their finances, maintain their fitness routines, monitor their attendance, and keep important notes. This all-in-one tool provides a holistic approach to life management, helping users stay organized, motivated, and productive.

## Features

### User Authentication

- **Signup**: New users can register by providing their details.
- **Login**: Registered users can log in using their credentials. JWT tokens are used for authentication.
- **Forgot Password**: Users can reset their password by requesting an OTP sent to their email.
- **Set New Password**: Users can set a new password after verifying the OTP.

### Goal Tracking

- **Add, Edit, Delete Goals**: Users can manage their goals by adding, editing, and deleting them.
- **Category-wise Filtering**: Goals can be filtered based on categories.
- **Progress Tracking**: Users can check the progress of their goals and get a detailed analysis of their completion status.

### Task Management

- **Add Tasks**: Users can add tasks that need to be completed to achieve their goals.
- **Filter Tasks**: Tasks can be filtered based on the selected goal.
- **Completed vs. Pending**: Users can check the status of tasks (completed or pending) and get detailed analysis and reports on time spent on each task.

### Salary Tracking

- **Track Income and Expenses**: Users can track their income and categorize their expenses.
- **Expense Reports**: Users can view reports on how much they have spent in various categories and compare available funds vs. expenses.

### Fitness Tracking

- **Daily Workout Tracking**: Users can log the time spent on workouts daily.
- **Category-wise Overview**: Users can view their workouts categorized by type.
- **Calorie Burn Reports**: Users can see how many calories they burned today and their total workouts for the day.
- **Consecutive Days**: Users can track their maximum consecutive workout days and their current streak.

### Streak Tracking

- **Attendance Tracking**: Users can track their attendance and see active and absent days via charts and graphs.
- **Monthly Overview**: Users can select a month to view the details of active and absent days.
- **Streak Analysis**: Users can get an overview of their maximum consecutive active days and current consecutive days in the current year.

### Note-Taking

- **Add Notes**: Users can add important notes.
- **Edit and Delete Notes**: Users can edit and delete their notes as needed.

## Frontend

The frontend of the application is built using React. It provides an intuitive and responsive user interface for managing various aspects of life tracking.

### Key Technologies

- React
- React Router
- Axios
- Redux (if used for state management)
- CSS/SCSS for styling

### Structure

- **Components**: Reusable components for various parts of the application.
- **Pages**: Specific pages for different features like login, signup, dashboard, etc.
- **Services**: Functions to handle API calls to the backend.

## Backend

The backend of the application is built using Spring Boot. It provides RESTful APIs for managing user data and application features.

### Key Technologies

- Spring Boot
- Spring Security (for authentication and authorization)
- JPA/Hibernate (for database interactions)
- MySQL/PostgreSQL (database)
- Lombok (for reducing boilerplate code)

### Structure

- **Controllers**: Handle HTTP requests and responses.
- **Services**: Contain business logic.
- **Repositories**: Interface with the database.
- **Models**: Define the structure of data.
- **DTOs**: Data Transfer Objects for transferring data between layers.

## Setup and Installation

### Prerequisites

- Node.js and npm (for the frontend)
- Java JDK (for the backend)
- MySQL/PostgreSQL database

### Steps

1. **Clone the repository**: `git clone <repository-url>`
2. **Frontend Setup**:
   - Navigate to the frontend directory: `cd frontend`
   - Install dependencies: `npm install`
   - Start the frontend server: `npm start`
3. **Backend Setup**:
   - Navigate to the backend directory: `cd backend`
   - Configure the database connection in `application.properties`
   - Build the backend application: `mvn clean install`
   - Start the backend server: `mvn spring-boot:run`

### Configuration

- **Database Configuration**: Set up the database connection in the `application.properties` file.
- **Environment Variables**: Configure necessary environment variables for the application.

## Impact and Effectiveness

The Life Tracking Application significantly improves users' ability to manage various aspects of their lives in a single, cohesive platform. By integrating goal setting, task management, financial tracking, fitness monitoring, attendance tracking, and note-taking, the application ensures that users have all the tools they need to stay organized and motivated. This holistic approach reduces the need for multiple apps and helps users maintain focus and productivity.

**Key Benefits**:

- **Improved Organization**: Consolidates multiple life management tools into one platform.
- **Enhanced Productivity**: Helps users set and track goals and tasks effectively.
- **Financial Awareness**: Provides detailed financial tracking and reporting.
- **Fitness Motivation**: Encourages users to maintain regular fitness routines.
- **Attendance Tracking**: Helps users monitor their attendance and identify patterns.
- **Centralized Notes**: Allows users to keep important notes in one place.

Overall, this application serves as a valuable resource for anyone looking to streamline their life management processes and achieve their personal and professional goals more efficiently.
