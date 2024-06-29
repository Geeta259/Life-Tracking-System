import React, { useState ,  useEffect} from 'react';
import axios from "axios";
import base_url from '../api/bootapi';
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
import  loginimg from '../images/loginimg.jpg';
import { toast } from 'react-toastify';
import { useNavigate , Link} from 'react-router-dom';
import { doLogin, isLoggedIn } from '../api/auth/Authorize';


const Login = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/tracking-system/dashboard');
    }
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

 

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Simulate an API call
    setTimeout(() => {
      Promise.resolve()
        .then(async () => {
          const response = await axios.post(`${base_url}/login`, { email, password });
          setLoading(false);
         
          //console.log(response.data.jwtToken);
          //console.log(response.data.username);
          
          doLogin(response.data,()=>{
            console.log("login details saved to localstorage....");
            navigate('/tracking-system/dashboard');
          })

          toast.success("Login Successfully!!");

          //localStorage.setItem('loginUser', email);
         // navigate('/dashboard');
        })
        .catch(error => {
          setLoading(false);
          console.error(error); // Handle login error
          toast.error("Invalid email or password");
        });
    }, 2000);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6} xl={5} className="login-container" style={{width:'60%'}}>
          <Row noGutters>
            <Col md={5} className="d-none d-md-block">
              <img
                src={loginimg}
                alt="Login Illustration"
                className="img-fluid"
                style={{ borderRadius: '10px 0 0 10px',height:'100%'}}
              />
            </Col>
            <Col md={7} className="p-4">
              <div className="login-form">
                <h2 className="text-center mb-4">WELCOME BACK</h2>
                <Form onSubmit={handleLogin}>
                  <FormGroup>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Your username or email address"
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
                      placeholder="Your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </FormGroup>
                 
                  <Button color="primary" type="submit" block disabled={loading}>
                    {loading ? <Spinner size="sm" /> : 'SIGN IN'}
                  </Button>
                </Form>
                <div className="text-center mt-3">
                  <a href="forgot-password" className="text-muted">Forget Your Password?</a>
                </div>
                <div className="text-center mt-3">
                  <Link className="text-muted"  to="/signup" action>New User ? Create a new account</Link>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
