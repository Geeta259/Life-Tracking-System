# Life Tracking Application

This is a comprehensive life tracking application designed to help users to manage their personal and professional lives efficiently. The application covers various aspects of life management including goals, tasks, finances, fitness routines, attendance, and notes. It provides a user-friendly interface and robust backend to ensure a seamless experience. The frontend is built using React, while the backend is powered by Spring Boot.

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
   - [Change Password](#change-password)
3. [Frontend](#frontend)
4. [Backend](#backend)
5. [Setup and Installation](#setup-and-installation)
6. [Impact and Effectiveness](#impact-and-effectiveness)

## Project Description

The Life Tracking Application is designed to empower users to achieve their goals, manage their tasks, track their finances, maintain their fitness routines, monitor their attendance, and keep important notes. This all-in-one tool provides a holistic approach to life management, helping users to stay organized, motivated, and productive.

This topic was selected due to the increasing complexity of modern life, where individuals often struggle to track multiple tasks and personal goals. 
By integrating various life management features into a single application, users can benefit from a more streamlined and cohesive experience. 
The application aims to reduce the load on users, helping them focus on what matters most and make better decisions based on comprehensive insights into their daily activities and long-term objectives.

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

### Change Password

- **Change Password**: Users can change their password from within the application.

## Frontend

The frontend of the application is built using React. Key features include:
- Intuitive and Responsive UI: Provides an easy-to-use interface for managing various aspects of life tracking.
- Reactstrap: UI components from Reactstrap for building responsive layouts.
- Toastify: Library for showing toast notifications, enhancing user interaction by providing feedback messages for various actions.
- Axios: Library for making HTTP requests, enabling seamless communication with the backend.
- Private Routes: Certain routes are only accessible to authenticated users, enhancing security and user experience.


### Key Technologies

- React
- React Router
- Axios
- Hooks
- Reactstrap for styling

### Structure

- **Components**: Reusable components for various parts of the application.
- **Pages**: Specific pages for different features like login, signup, dashboard, etc.
- **Services**: Functions to handle API calls to the backend.

## Backend

The backend of the application is built using Spring Boot. It provides RESTful APIs for managing user data and application features.

### Key Technologies

- Spring Boot
- Spring Security (for authentication and authorization)
- JPA (for database interactions)
- MySQL (database)

## Impact and Effectiveness

The Life Tracking Application significantly improves users' ability to manage various aspects of their lives in a single, cohesive platform. By integrating goal setting, task management, financial tracking, fitness monitoring, attendance tracking, and note-taking, the application ensures that users have all the tools they need to stay organized and motivated. This holistic approach reduces the need for multiple apps and helps users maintain focus and productivity.

**Key Benefits**:

- **Improved Organization**: Consolidates multiple life management tools into one platform.
- **Enhanced Productivity**: Helps users set and track goals and tasks effectively.
- **Financial Awareness**: Provides detailed financial tracking and reporting.
- **Fitness Motivation**: Encourages users to maintain regular fitness routines.
- **Attendance Tracking**: Helps users monitor their attendance and identify patterns.
- **Centralized Notes**: Allows users to keep important notes in one place.
- **Security and Flexibility**: Users can easily change their passwords, enhancing security.

Overall, this application serves as a valuable resource for anyone looking to streamline their life management processes and achieve their personal and professional goals more efficiently.
