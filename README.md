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

**Screenshots**:
![Screenshot (458)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/d7234b25-9635-4c77-a90f-472ab508309b)
![Screenshot (459)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/5637618c-3a97-4406-9eda-13c3861c89e6)
![Screenshot (460)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/31bb348a-847d-4f30-b353-df3e021a4640)
![Screenshot (461)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/846dbe89-bd8b-441c-8a95-e501a8c92d3a)
![Screenshot (462)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/bcc40003-6bb6-4f2e-ae9f-0ab39bfaf162)
![Screenshot (436)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/42f03a5c-31f6-44ba-821a-c071a1c5411e)
![Screenshot (437)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/dc7614cc-f16e-4bfd-acd6-2512e5654045)
![Screenshot (438)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/8a17e2e0-ee1f-45dd-8d71-491fe7348adb)
![Screenshot (439)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/24b97621-57ad-48e8-9c51-4427e588a4b7)
![Screenshot (440)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/d2c3ca4a-4efc-4a61-ba00-02d3244e0ca4)
![Screenshot (441)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/9b76ef58-cf76-4e31-959f-ac5a8343775a)
![Screenshot (442)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/641229f5-35c9-499f-97cc-e4c400fd5711)
![Screenshot (443)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/413b7f2c-50e6-433e-845f-4d7595b2fefb)
![Screenshot (444)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/9476d703-c991-40f4-a4f3-e9caad1d2b7f)
![Screenshot (445)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/7904bd94-f1e3-4e1b-b008-e515f76b0072)
![Screenshot (446)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/a66a58dc-9d68-44ed-9316-922197c0e216)
![Screenshot (447)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/a6017f06-f13e-4fa0-b66b-b6d854de121a)
![Screenshot (448)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/6413ebcb-d914-4a53-9b92-c168429c294b)
![Screenshot (449)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/e166535e-6b24-4778-8e26-d457cbdc5ab3)
![Screenshot (450)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/4fd2442d-ccb8-470b-9fe0-6324ce3e3350)
![Screenshot (451)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/23cb5d43-bc2d-44dd-b631-9441a1d8150a)
![Screenshot (452)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/eacee36a-3e11-4261-9a18-5d14cb682013)
![Screenshot (453)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/cbbe8e60-4d7e-4c12-bde3-96af48e377e0)
![Screenshot (456)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/0656e313-f5c6-4a90-ab24-0c61d3003814)
![Screenshot (457)](https://github.com/Geeta259/Life-Tracking-System/assets/75520947/67177575-7284-4137-9265-81d698b75112)

