import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Preloader from './components/Preloader';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Privateroute from './components/dashboard/Privateroute';
import GoalSettingForm from './components/maintask/GoalSettingForm';
import Dashboard from './components/maintask/Dashboard';
import MainLayout from './components/dashboard/MainTask';
import ShowGoals from './components/maintask/ShowGoals';
import UpdateGoal from './components/maintask/UpdateGoal';
import AddTask from './components/maintask/AddTask';
import ShowTasks from './components/maintask/ShowTasks';
import UpdateTask from './components/maintask/UpdateTask';
import Profile from './components/maintask/Profile';
import UpdateProfile from './components/maintask/UpdateProfile';
import ChangePassword from './components/maintask/ChangePassword';
import Expenses from './components/maintask/Expenses';
import Incomes from './components/maintask/Incomes';
import ForgotPassword from './components/forgot/ForgotPassword';
import VerifyOTP from './components/forgot/VerifyOTP';
import ResetPassword from './components/forgot/ResetPassword';
import CreateExercise from './components/maintask/Fitness';
import Fitness from './components/maintask/Fitness';
import Attendance from './components/maintask/Attendance';
import ShowNote from './components/maintask/ShowNote';


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time

    return () => clearTimeout(timer);
  }, []);




  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={loading ? <Preloader /> : <Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verification" element={<VerifyOTP />} />
          <Route path="/change-password" element={<ResetPassword />} />

          <Route path="/tracking-system" element={<Privateroute/>}>
                <Route path="dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
                <Route path="goal-setting" element={<MainLayout><GoalSettingForm /></MainLayout>} />
                <Route path="goals-show" element={<MainLayout><ShowGoals /></MainLayout>} />
                <Route path="update-goal" element={<MainLayout><UpdateGoal/></MainLayout>} />
                <Route path="add-task" element={<MainLayout><AddTask /></MainLayout>} />
                <Route path="show-tasks" element={<MainLayout><ShowTasks /></MainLayout>} />
                <Route path="update-task" element={<MainLayout><UpdateTask /></MainLayout>} />
                <Route path="fitness" element={<MainLayout><Fitness /></MainLayout>} />
                <Route path="profile" element={<MainLayout><Profile/></MainLayout>} />
                <Route path="update-profile" element={<MainLayout><UpdateProfile/></MainLayout>} />
                <Route path="incomes" element={<MainLayout><Incomes/></MainLayout>} />
                <Route path="expenses" element={<MainLayout><Expenses/></MainLayout>} />
                <Route path="attendance" element={<MainLayout><Attendance/></MainLayout>} />
                <Route path="sticky-notes" element={<MainLayout><ShowNote/></MainLayout>} />
                <Route path="settings" element={<MainLayout><ChangePassword/></MainLayout>} />

          </Route>
        
          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
