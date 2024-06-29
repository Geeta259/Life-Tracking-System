import React, { useState ,  useEffect} from 'react';
import { toast } from 'react-toastify';
import {useNavigate, useLocation } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  CardBody,
  Card,
  CardTitle
} from 'reactstrap';
import base_url from '../../api/bootapi';
import axios from 'axios';
   
const UpdateGoal = () => {
    const location = useLocation();
    const id = location.state?.id;
    const [formData, setFormData] = useState({
      category: 'Select Category',
      goal: '',
      date: '',
      reminder: false,
      priority: 'Select Priority',
      description: '',
    });
    
    const loggedInUser = localStorage.getItem('loginUser'); 
  const token = JSON.parse(loggedInUser).jwtToken;
  
    // Fetch goal data when component mounts
    useEffect(() => {
      fetchGoalData();
    }, []);
  
    // Function to fetch goal data by ID
    const fetchGoalData = async () => {
      try {
        const response = await axios.get(`${base_url}/get-goal/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFormData(response.data);
      } catch (error) {
        toast.error('Error fetching goal data');
        console.error('Error fetching goal data:', error);
      }
    };
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.put(`${base_url}/update-goal/${id}`, formData,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('Goal updated successfully');
        navigate('/tracking-system/goals-show');
      } catch (error) {
        toast.error('Something went wrong...');
        console.error('Error updating goal:', error);
      }
    };

  return (
    <Card style={{ width: '60%', margin: '30px auto', borderRadius: '50px',textAlign: 'left', padding: '20px' }}>
    <CardTitle style={{ textAlign: 'center', marginBottom: '30px', fontSize:'28px'}}>Update Goal</CardTitle>    
       <CardBody>
        <Form onSubmit={handleSubmit}>
          <Row style={{marginBottom:'10px'}}>
            <Col md={6}>
              <FormGroup>
                <Label for="category" style={{fontSize:'18px'}}>Category</Label>
                <Input
                  type="select"
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="select category">Select Category</option>
                  <option value="Health">Health</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Social">Social</option>
                  <option value="Chores">Chores</option>
                  <option value="Other">Other</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="goal" style={{fontSize:'18px'}}>Goal</Label>
                <Input
                  type="text"
                  name="goal"
                  id="goal"
                  placeholder="Enter your goal"
                  value={formData.goal}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{marginBottom:'10px'}}>
            <Col md={12}>
              <FormGroup>
                <Label for="description" style={{fontSize:'18px'}}>Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Enter details about your goal"
                  value={formData.description}
                  onChange={handleChange}
                  style={{ height: '100px', borderRadius: '5px' }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row style={{marginBottom:'10px'}}>
            <Col md={6}>
              <FormGroup>
                <Label for="date" style={{fontSize:'18px'}}>Date of Completion</Label>
                <Input
                  type="date"
                  name="deadline"
                  id="date"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="priority" style={{fontSize:'18px'}}>Set Goal Priority</Label>
                <Input
                  type="select"
                  name="priority"
                  id="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                   <option value="select priority">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row style={{marginBottom:'10px'}}>
           
            <Col md={12}>
              <FormGroup check style={{ marginTop: '20px',fontSize:'18px' }}>
                <Label check> 
                  <Input
                    type="checkbox"
                    name="reminder"
                    id="reminder"
                    checked={formData.reminder}
                    onChange={handleChange}
                    style={{ marginRight: '10px'}}
                  />
                  Do you want to get reminder of this goal?
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}  style={{textAlign:'center'}}>
            <Button className='bg-success' type="submit" style={{ marginTop: '20px', alignSelf: 'center', width: 'auto', fontSize: '20px', borderRadius: '20px' }}>
                Update Goal
              </Button>

            </Col>
          
          </Row>
         
        </Form>
      </CardBody>
       </Card>
  );
};

export default UpdateGoal;
