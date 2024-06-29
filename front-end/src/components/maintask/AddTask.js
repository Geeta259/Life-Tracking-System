import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, CardBody, Card, CardTitle } from 'reactstrap';
import axios from 'axios';
import base_url from '../../api/bootapi';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const AddTask = () => {
  const [goals, setGoals] = useState([]);
  const loggedInUserEmail = localStorage.getItem('loginUser');
  const [minDate, setMinDate] = useState('');
  const [formData, setFormData] = useState({
    goalId: '',
    goal:'',
    taskName: '',
    priority: 'Medium',
    deadline: '',
    useremail: loggedInUserEmail,
  });

  const loggedInUser = localStorage.getItem('loginUser'); 
  const token = JSON.parse(loggedInUser).jwtToken;
  const useremail =  JSON.parse(loggedInUser).username;

  useEffect(() => {
    fetchGoals();
      // Get today's date in the format yyyy-mm-dd
      const today = new Date().toISOString().split('T')[0];
      setMinDate(today);
  
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await axios.get(`${base_url}/show-goals/${useremail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'goal') {
      const selectedGoal = goals.find(goal => goal.goal === value);
      setFormData({ ...formData, goal: value, goalId: selectedGoal ? selectedGoal.id : '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${base_url}/add-task`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Task added successfully...");
      //console.log('Task added successfully:', response.data);
      // Reset form fields
      navigate('/tracking-system/show-tasks');
     
      setFormData({
        goal: '',
        goalId: '',
        task: '',
        priority: 'Medium',
        deadline: '',
        useremail: loggedInUserEmail,
      });
    } catch (error) {
     // console.error('Error adding task:', error);
      toast.error("Something went wrong...");
    }
  };
 
  return (
    <Card style={{ width: '60%', margin: '30px auto', borderRadius: '50px',textAlign: 'left', padding: '20px' }}>
    <CardTitle style={{ textAlign: 'center', marginBottom: '30px', fontSize:'28px'}}>Add New Task</CardTitle>
    <CardBody>
       <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="goalSelect">Goal</Label>
          <Input type="select" id="goalSelect" name="goal" onChange={handleChange} value={formData.goal} required>
            <option value="">Select a Goal</option>
            {goals.map((goal) => (
              <option key={goal.id} value={goal.goal}>
                {goal.goal}
              </option>
            ))}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="taskName">Task Name</Label>
          <Input
            type="text"
            id="taskName"
            name="task"
            placeholder="Enter task name"
            value={formData.task}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="prioritySelect">Priority</Label>
          <Input type="select" id="prioritySelect" name="priority" onChange={handleChange} value={formData.priority} required>
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
            min={minDate}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <div style={{ textAlign: 'center' }}>
        <Button className='bg-success' type="submit" style={{ marginTop: '20px', alignSelf: 'center', width: 'auto', fontSize: '20px', borderRadius: '20px' }}>
             Add Task
              </Button>
        </div>
      </Form>
    </CardBody>
    </Card>
  );
};

export default AddTask;
