import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, Row, Col, Spinner, Card } from 'reactstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import base_url from '../../api/bootapi';

const UpdateProfile = () => {
  const location = useLocation();
  const user = location.state?.user;

  const [name, setName] = useState(user?.name || '');
  const email = user.email;
  const [city, setCity] = useState(user?.city || '');
  const [state, setState] = useState(user?.state || '');
  const [contactNo, setContactNo] = useState(user?.contactNo || '');
  const [dob, setDob] = useState(user?.dob || '');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.dob) {
      //create a new date object .toISOString This method converts the Date object to a string in ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ).
      setDob(new Date(user.dob).toISOString().split('T')[0]);
    }
  }, [user]);

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const loggedInUser = localStorage.getItem('loginUser'); 
  const token = JSON.parse(loggedInUser).jwtToken;
  const useremail =  JSON.parse(loggedInUser).username;
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    //FormData object is a built-in JavaScript object

    const formData = new FormData();
    formData.append('name', name);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('contactNo', contactNo);
    formData.append('dob', dob);
    formData.append('email',email);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      await axios.put(`${base_url}/updateUser`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`
            }
        }
      );
      setLoading(false);
      toast.success('Profile updated successfully!');
      navigate('/tracking-system/profile');
    } catch (error) {
      setLoading(false);
      toast.error('An error occurred. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <Card style={{ borderRadius: '40px', textAlign: 'left', padding: '20px', width: '50%', margin: '60px auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Update Profile</h2>
      <Form onSubmit={handleUpdate}>
        <Row form>
          <Col md={12}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
      
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="city">City</Label>
              <Input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="state">State</Label>
              <Input
                type="text"
                id="state"
                name="state"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="contactNo">Contact Number</Label>
              <Input
                type="text"
                id="contactNo"
                name="contactNo"
                placeholder="Contact Number"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="dob">Date of Birth</Label>
              <Input
                type="date"
                id="dob"
                name="dob"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="profileImage">Profile Image</Label>
          <Input
            type="file"
            id="profileImage"
            name="profileImage"
            onChange={handleFileChange}
          />
        </FormGroup>
        <div style={{ textAlign: 'center' }}>
          <Button type="submit" className='bg-success' style={{ width: 'auto', fontSize: '20px', borderRadius: '10px' }}>
            {loading ? <Spinner size="sm" /> : 'Update Profile'}
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default UpdateProfile;
