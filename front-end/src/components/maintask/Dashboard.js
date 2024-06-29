// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { FaDollarSign, FaUsers, FaTasks, FaChartLine, FaListAlt, FaClock } from 'react-icons/fa';
import base_url from '../../api/bootapi';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Table,
} from 'reactstrap';
import { FaAward, FaIndianRupeeSign, FaListCheck, FaRupeeSign, FaUpwork } from 'react-icons/fa6';

const NewDash = () => {
  const [goals, setGoals] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const loggedInUser = localStorage.getItem('loginUser'); 
  const token = JSON.parse(loggedInUser).jwtToken;
  const useremail =  JSON.parse(loggedInUser).username;


  const [taskPie, setTaskPie] = useState({
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [],
        backgroundColor: ['#8F00FF', '#FFA500'],
      },
    ],
  });

  const [taskProgress, setTaskProgress] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Tasks Bar',
        data: [],
        backgroundColor: '#8F00FF',
      },
    ],
  });

  useEffect(() => {
    fetchGoals();
    fetchTasks();
    fetchExpenses();
  }, []);

  useEffect(() => {
    // Categorize tasks
    const categories = ['Health', 'Work', 'Personal', 'Social', 'Chores', 'Other'];
    setTaskProgress({
      labels: categories,
      datasets: [
        {
          label: 'Total Tasks Bar',
          data: categories.map(cat => tasks.filter(task => task.category === cat).length),
          backgroundColor: 'rgb(240 130 191)',
        },
      ],
    });

    const completedTasks = tasks.filter(task => task.status === 'Completed').length;
    const pendingTasks = tasks.filter(task => task.status === 'Pending').length;

    setTaskPie({
      labels: ['Completed', 'Pending'],
      datasets: [
        {
          data: [completedTasks, pendingTasks],
          backgroundColor: ['rgb(107 226 138)', 'rgb(97 222 234)'],
        },
      ],
    });

  }, [tasks]);

  const fetchGoals = async () => {
    try {
      const goalResponse = await axios.get(`${base_url}/show-goals/${useremail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setGoals(goalResponse.data);
    } catch (error) {
      console.error('Error fetching goals', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${base_url}/get-tasks/${useremail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${base_url}/get-expenses/${useremail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const expensesData = response.data.map(expense => ({
        ...expense,
        amount: parseFloat(expense.amount)
      }));
      setExpenses(expensesData);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const totalExpense = expenses.reduce((acc, expense) => acc + (expense.amount || 0), 0);
  const goalsReminders = goals.filter(goal => goal.reminder === 'true');

  return (
    <Container fluid className="p-3">
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <CardBody>
              <FaTasks size={30} className="mb-2" color="#a736d6" />
              <CardTitle>{goals.length}</CardTitle>
              <p>Total Goals</p>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <CardBody>
              <FaListAlt size={30} className="mb-2" color="#a736d6" />
              <CardTitle>{tasks.length}</CardTitle>
              <p>Total Tasks</p>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <CardBody>
              <FaIndianRupeeSign size={30} className="mb-2" color="#a736d6" />
              <CardTitle>{totalExpense}</CardTitle>
              <p>Total Expenses</p>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <CardBody>
              <FaClock size={30} className="mb-2" color="#a736d6" />
              <CardTitle>{goalsReminders.length}</CardTitle>
              <p>Goals Reminder</p>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Card>
            <CardBody>
              <CardTitle>Total Task Of Each Category</CardTitle>
              <Bar data={taskProgress} />
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardBody>
              <CardTitle>Tasks Report</CardTitle>
              <Doughnut data={taskPie} />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Card>
            <CardBody>
              <CardTitle style={{ fontSize: '20px' }}>Top Priority Task</CardTitle>
              <ListGroup flush>
                {tasks.filter(task => task.priority === 'High').sort((a, b) => new Date(a.deadline) - new Date(b.deadline)).slice(0, 5)
                  .map((hightask, index) => (
                    <ListGroupItem key={index} style={{ display: 'flex', flexDirection: 'column' }}>{hightask.task}<span style={{ color: 'gray', fontSize: '14px' }}>{hightask.deadline} || {hightask.category}</span></ListGroupItem>
                  ))}
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <CardBody>
              <CardTitle style={{ fontSize: '20px' }}>Top Priority Goals</CardTitle>
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Deadline</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {goals.filter(goal => goal.priority === 'High' || goal.priority === 'Medium').slice(0, 6).map(goal => (
                    <tr key={goal.id}>
                      <td>GOAL{goal.id}</td>
                      <td>{goal.goal}</td>
                      <td>{goal.category}</td>
                      <td>{goal.deadline}</td>
                      <td>{goal.priority}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NewDash;
