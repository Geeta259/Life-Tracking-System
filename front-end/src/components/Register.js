import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
  Spinner,
} from 'reactstrap';
import '../css/style.css'; // Importing custom styles
import registerimg from '../images/registerimg.jpg';
import { toast } from 'react-toastify';
import { useNavigate ,Link} from 'react-router-dom';
import base_url from '../api/bootapi';
import { isLoggedIn } from '../api/auth/Authorize';

const Register = () => {

  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/tracking-system/dashboard');
    }
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);
 


  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Confirm password match validation
    if (password !== confirmPassword) {
      setLoading(false);
      toast.error("Passwords don't match.");
      return;
    }

    // Contact number validation
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contactNo)) {
      setLoading(false);
      toast.error('Invalid contact number. It must be a 10-digit number.');
      return;
    }

      
  const userData = {
    name,
    email,
    password,
    contactNo,
    city,
    state,
    dob,
  };

    try {
      // Make POST request to your backend API endpoint
      const response = await axios.post(`${base_url}/adduser`, userData);

      // If the request is successful, handle the response
      setLoading(false);
      toast.success('Signup Successful!');
      toast.success('Login now !!');
      navigate('/');
    } catch (error) {
      // If there's an error, handle it
      setLoading(false);
      toast.error('An error occurred. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6} xl={5} className="login-container" style={{ width: '60%' }}>
          <Row noGutters>
            <Col md={5} className="d-none d-md-block">
              <img
                src={registerimg}
                alt="Login Illustration"
                className="img-fluid"
                style={{ borderRadius: '10px 0 0 10px', height: '75%', marginLeft: '25px', marginTop: '50px' }}
              />
            </Col>
            <Col md={7} className="p-4">
              <div className="login-form">
                <h2 className="text-center mb-4">SIGN UP</h2>
                <Form onSubmit={handleSignup}>
                  <FormGroup>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      name="contactNo"
                      id="contactNo"
                      placeholder="Contact Number"
                      value={contactNo}
                      onChange={(e) => setContactNo(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      name="city"
                      id="city"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      name="state"
                      id="state"
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="date"
                      name="dob"
                      id="dob"
                      placeholder="Date of Birth"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <Button color="primary" type="submit" block disabled={loading}>
                    {loading ? <Spinner size="sm" /> : 'SIGN UP'}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <a href="forgot-password" className="text-muted">Forget Your Password?</a>
                </div>
                <div className="text-center mt-3">
                  <Link className="text-muted"  to="/" action>Already Registered? Sign In</Link>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
