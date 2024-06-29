import React, { useState,useEffect } from 'react';
import axios from 'axios';
import base_url from '../../api/bootapi';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
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

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};

    useEffect(() => {
        if (isLoggedIn()) {
          navigate('/tracking-system/dashboard');
        }
        if (!email) navigate('/forgot-password');
      }, []);

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match. Please try again.");
            return;
        }
        try {
            const response = await axios.post(`${base_url}/home/change-password?email=${email}&newpassword=${newPassword}`);
            if (response.status === 200) {
                toast.success("Password changed successfully...!!");
                navigate('/');
            } else {
                toast.error("Failed to change password. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center vh-100">
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={6} xl={5} className="login-container" style={{ width: '60%' }}>
                    <Row noGutters>
                        <Col md={12} className="p-4">
                            <div className="login-form">
                                <h2 className="text-center mb-4">Change Password</h2>
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Input
                                            type="password"
                                            name="newPassword"
                                            id="newPassword"
                                            placeholder="Enter your new password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Input
                                            type="password"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            placeholder="Confirm your new password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </FormGroup>
                                    <Button color="primary" type="submit">Change Password</Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default ResetPassword;
