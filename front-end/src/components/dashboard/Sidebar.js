import React, { useState, useEffect } from 'react';
import base_url from '../../api/bootapi';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import {ListAlt, Logout, MoneyOff, MoneyRounded, Task } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import loginicon from '../../images/loginicon.png';
import axios from 'axios';
import { doLogout } from '../../api/auth/Authorize'
import { FaBurn, FaCheck, FaPlus } from 'react-icons/fa';

const Sidebar = () => {
  const menuItems = [
    { text: 'Dashboard', link: '/tracking-system/dashboard', icon: <HomeIcon /> },
    { text: 'Profile', link: '/tracking-system/profile', icon: <PersonIcon /> },
   { text: 'Goals', link: '/tracking-system/goals-show', icon: <ListAlt /> }, 
    { text: 'Tasks', link: '/tracking-system/show-tasks', icon: <Task /> },
    { text: 'Incomes', link: '/tracking-system/incomes', icon: <MoneyRounded /> },
    { text: 'Expenses', link: '/tracking-system/expenses', icon: <MoneyOff /> },
    { text: 'Fitness', link: '/tracking-system/fitness', icon: <FaBurn/> },
    { text: 'Attendance', link: '/tracking-system/attendance', icon: <FaCheck/> },
    { text: 'Notes', link: '/tracking-system/sticky-notes', icon: <FaPlus/> },
    { text: 'Settings', link: '/tracking-system/settings', icon: <SettingsIcon /> },
  ];

  const [user, setUser] = useState({});
  const loggedInUser = localStorage.getItem('loginUser'); 
  const token = loggedInUser ? JSON.parse(loggedInUser).jwtToken : '';
  const useremail = loggedInUser ? JSON.parse(loggedInUser).username : ''; 
  const [userImage, setUserImage] = useState(null);
  const [image,setImage] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logout Successfully!!");
    doLogout(()=>{
      navigate('/');
    })
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${base_url}/profile/${useremail}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
        setImage(response.data.profile);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

     
    const fetchImage = async () => {
      try {
        if (user && image) {
          const response = await axios.get(
            `${base_url}/image/${image}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              responseType: 'blob',
            }
          );
          const imageUrl = URL.createObjectURL(response.data);
          setUserImage(imageUrl);
        } else {
          setUserImage(loginicon); // Default image if user.profile is null
        }
      } catch (error) {
        console.error("Error fetching user image:", error);
      }
    };


    if (token && useremail) {
      fetchUserData();
      fetchImage();
    }
  }, [useremail, token,image]);

  return (
    <div style={{ position: 'fixed', top: '0', bottom: '0', left: '0', width: '200px', background: 'black', height: '100vh', overflow: 'auto', color: 'lightgray' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
        <img
          style={{ width: '45px', height: '45px', borderRadius: '50%' }}
          src={user.profile === 'null' || user.profile === null ? loginicon : userImage}
          alt="Profile"
        />
        <h2 style={{ marginLeft: '10px', fontSize: '22px', color: 'white' }}>{user.name}</h2>
      </div>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} component={Link} to={item.link} sx={{ color: 'gray' }}>
            <ListItemIcon sx={{ color: 'lightgray', padding: '2px',fontSize:'14px',marginRight:'5px' }}>
              {item.icon}
              <ListItemText primary={item.text} />
            </ListItemIcon>
          </ListItem>
        ))}
        <ListItem onClick={handleLogout} sx={{ color: 'white',cursor:'pointer' }}>
          <ListItemIcon sx={{ color: 'lightgray', padding: '2px' }}>
            <Logout />
            <ListItemText primary="Logout" />
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;
