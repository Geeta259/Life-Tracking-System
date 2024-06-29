import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, CardBody, Card, CardTitle } from 'reactstrap';
import { useNavigate,useLocation  } from 'react-router-dom';
import base_url from '../../api/bootapi';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateTask = () => {
  const location = useLocation();
  const id = location.state?.id;

  const [formData, setFormData] = useState({
    task: '',
    priority: 'Medium',
    deadline: '',
    status:'',
  });


  useEffect(() => {
  fetchTaskDetails();
  },[]);

  const loggedInUser = localStorage.getItem('loginUser'); 
  const token = JSON.parse(loggedInUser).jwtToken;
  const useremail =  JSON.parse(loggedInUser).username;

  const fetchTaskDetails = async () => {
    try {
      const response = await axios.get(`${base_url}/get-task/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      setFormData(response.data);
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show error message to user
    }
  };
 
  const handleChange = (e) => {
    const { name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const response = await axios.put(`${base_url}/update-task/${id}`, formData,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.success('Task updated successfully');
        navigate('/tracking-system/show-tasks');
      } catch (error) {
        toast.error('Something went wrong...');
        console.error('Error updating task:', error);
      }
  };

  return (
    <Card style={{ width: '60%', margin: '30px auto', borderRadius: '50px',textAlign: 'left', padding: '20px' }}>
    <CardTitle style={{ textAlign: 'center', marginBottom: '30px', fontSize:'28px'}}>Update Task</CardTitle>  
       <CardBody>
         <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="taskName">Task Name</Label>
          <Input
            type="text"
            id="taskName"
            name="task"
            value={formData.task}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="prioritySelect">Priority</Label>
          <Input type="select" id="prioritySelect" value={formData.priority}  name="priority" onChange={handleChange} required>
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="deadline">Deadline</Label>
          <Input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="statusSelect">Status</Label>
          <Input type="select" id="statusSelect" value={formData.status} name="status" onChange={handleChange} required>
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </Input>
        </FormGroup>

        <div style={{ textAlign: 'center' }}>
        <Button className='bg-success' type="submit" style={{ marginTop: '20px', alignSelf: 'center', width: 'auto', fontSize: '20px', borderRadius: '20px' }}>
                Update Task
              </Button>
        </div>
      </Form>
      </CardBody>
      </Card>
  );
};

export default UpdateTask;
