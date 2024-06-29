import React, { useState,useEffect } from 'react';
import axios from "axios";
import base_url from '../../api/bootapi';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import forgot from '../../images/forgot.png';
import { isLoggedIn } from '../../api/auth/Authorize';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Container,
    Row,
    Col,
} from 'reactstrap';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      if (isLoggedIn()) {
        navigate('/tracking-system/dashboard');
      }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${base_url}/home/send-otp?email=${email}`);
           
            if (response.status === 200 && response.data !== 0) {
                const otp = response.data; // Extract the OTP directly from response.data
                toast.success("OTP sent to your registered email...!!");
                navigate('/otp-verification', { state: { email, otp } });
            } else if (response.status === 404) {
                toast.error("Enter a valid registered email..!!");
            } else {
                toast.error("Failed to send OTP. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center vh-100">
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={6} xl={5} className="login-container" style={{ width: '60%' }}>
                    <Row noGutters>
                        <Col md={4} className="d-none d-md-block">
                            <img
                                src={forgot}
                                alt="Login Illustration"
                                className="img-fluid"
                                style={{ borderRadius: '10px 0 0 10px', height: '70%',marginTop:'30px' }}
                            />
                        </Col>
                        <Col md={8} className="p-4">
                            <div className="login-form">
                                <h2 className="text-center mb-4">Forgot Your Password?</h2>
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </FormGroup>
                                    <Button color="primary" type="submit" disabled={loading}>
                                        {loading ? 'Sending OTP...' : 'Reset Password'}
                                    </Button>
                                </Form>
                                <div className="text-center mt-3">
                                    <a href="/" className="text-muted">Back to Login</a>
                                </div>
                                <div className="text-center mt-3">
                                    <Link className="text-muted" to="/signup" action>New User? Create a new account</Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default ForgotPassword;
