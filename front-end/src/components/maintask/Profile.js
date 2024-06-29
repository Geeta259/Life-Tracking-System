import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, CardImg, Button, Table } from 'reactstrap';
import  '../../css/style.css'
import base_url from '../../api/bootapi';
import  loginicon from '../../images/loginicon.png'
import { useNavigate } from 'react-router-dom';


const Profile = () => {

  const [user, setUser] = useState(null);
  const loggedInUser = localStorage.getItem('loginUser'); 
  const token = JSON.parse(loggedInUser).jwtToken;

  //console.log(token);
  const useremail =  JSON.parse(loggedInUser).username;
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState(null);
  const [image,setImage] = useState(null);
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
      // Make POST request to your backend API endpoint
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



    if (useremail && token) {
      fetchUserData();
      fetchImage();
    }
  },[useremail,token,image]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleUpdateProfile = () => {
    navigate('/tracking-system/update-profile', { state: { user } });
  };

  return (
    <div className="text-center">
      <Card style={{ maxWidth: '400px', margin: '30px auto', borderRadius: '40px'}}>
        <CardImg top   src={user.profile === 'null' || user.profile === null ? loginicon : userImage}
          alt="User Profile" style={{ borderRadius: '50%', width: '170px', height: '160px', margin: 'auto', marginTop: '20px' }} />
        
        <CardBody style={{ marginTop: '10px' }}>
          <h3>{user.name}</h3>
          <Table responsive>
            <tbody>
              <tr>
                <th scope="row">Email</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th scope="row">Username</th>
                <td>{user.name}</td>
              </tr>
              <tr>
                <th scope="row">City</th>
                <td>{user.city}</td>
              </tr>
              <tr>
                <th scope="row">State</th>
                <td>{user.state}</td>
              </tr>
              <tr>
                <th scope="row">Contact</th>
                <td>{user.contactNo}</td>
              </tr>
              <tr>
                <th scope="row">D.O.B</th>
                <td>{user.dob}</td>
              </tr>
            
            </tbody>
          </Table>
          <div style={{ textAlign: 'center' }}>
            <Button type="submit" onClick={handleUpdateProfile} className='bg-success' style={{ width: 'auto',fontSize: '20px', borderRadius: '40px' }}>
              Update Profile
            </Button>
          </div>
        </CardBody>
      </Card>

      
    </div>
  );
};

export default Profile;
