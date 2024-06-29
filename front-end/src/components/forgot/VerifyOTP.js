import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isLoggedIn } from '../../api/auth/Authorize';
import { Button, Form, FormGroup, Input, Container, Row, Col } from 'reactstrap';

const VerifyOTP = () => {
    const [otp, setOtp] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { email, otp: sentOtp } = location.state || {};
 
    
    useEffect(() => {
        if (isLoggedIn()) navigate('/tracking-system/dashboard');
        if (!sentOtp) navigate('/forgot-password');
    }, []);

   

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseInt(otp, 10) === sentOtp) {
            toast.success("OTP verified successfully...!!");
            navigate('/change-password', { state: { email } });
        } else {
            toast.error("Invalid OTP. Please try again.");
        }
    };

   

    return (
        <Container className="d-flex align-items-center justify-content-center vh-100">
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={6} xl={5} className="login-container" style={{ width: '60%' }}>
                    <Row noGutters>
                        <Col md={12} className="p-4">
                            <div className="login-form">
                                <h2 className="text-center mb-4">Verify OTP</h2>
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Input
                                            type="number"
                                            name="otp"
                                            id="otp"
                                            placeholder="Enter the OTP sent to your email"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                        />
                                    </FormGroup>
                                    <Button color="primary" type="submit">Verify OTP</Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default VerifyOTP;
