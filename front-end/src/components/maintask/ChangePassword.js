import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Form, FormGroup, Label, Input, Button, CardBody, CardTitle, Card } from 'reactstrap';
import base_url from '../../api/bootapi';
import axios from 'axios';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loggedInUser = localStorage.getItem('loginUser'); 
  const token = JSON.parse(loggedInUser).jwtToken;
  const useremail =  JSON.parse(loggedInUser).username;

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }

    setIsLoading(true);

    try {
      // Change password
      const response = await axios.put(`${base_url}/change-pass`, {
        email: useremail,
        oldPassword: currentPassword,
        newPassword: newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response);

      if (response.status === 200) {
        toast.success(response.data);
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Error changing password, please try again later.');
    } finally {
      setIsLoading(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <Card style={{ width: '60%', margin: '30px auto', borderRadius: '50px',textAlign: 'left', padding: '20px' }}>
      <CardTitle style={{ textAlign: 'center', marginBottom: '30px', fontSize:'28px'}}>Change Password</CardTitle>    
      <CardBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="currentPassword">Current Password</Label>
            <Input
              type="password"
              id="currentPassword"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="newPassword">New Password</Label>
            <Input
              type="password"
              id="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="confirmPassword">Confirm New Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </FormGroup>

          <div style={{ textAlign: 'center' }}>
            <Button type="submit" className='bg-success' style={{ width: 'auto', fontSize: '20px', borderRadius: '40px' }} disabled={isLoading}>
              {isLoading ? 'Changing...' : 'Change Password'}
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default ChangePassword;
