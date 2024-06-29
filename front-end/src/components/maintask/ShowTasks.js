import React, { useState, useEffect } from 'react';
import { Table,Row,Col,Card,CardBody,CardTitle,ListGroup,ListGroupItem } from 'reactstrap';
import { FaAward, FaTasks, FaChartLine, FaMinusCircle} from 'react-icons/fa'; // Added FaSave icon
import '../../css/style.css';
import base_url from '../../api/bootapi';
import axios from 'axios';
import TaskByGoals from './TaskByGoals';


const ShowTasks = () => {
 
  const [topTasks, setTopTasks] = useState([]);
  const loggedInUser = localStorage.getItem('loginUser'); 
  const token = JSON.parse(loggedInUser).jwtToken;
  const useremail =  JSON.parse(loggedInUser).username;
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await axios.get(`${base_url}/show-goals/${useremail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setGoals(response.data);
      const taskresponse = await axios.get(`${base_url}/get-tasks/${useremail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTopTasks(taskresponse.data);

    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };


  return (
    <div>

<Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <CardBody>
            <FaTasks size={30} className="mb-2" color="#a736d6" />
              <CardTitle>{topTasks.length}</CardTitle>
              <p>Total Tasks</p>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <CardBody>
              <FaAward size={30} className="mb-2" color="#a736d6" />
              <CardTitle>{topTasks.filter(task => task.status === 'Completed').length}</CardTitle>
              <p>Completed Task</p>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <CardBody>
            <FaMinusCircle size={30} className="mb-2" color="#a736d6" />
              <CardTitle>{topTasks.filter(task => task.status === 'Pending').length}</CardTitle>
              <p>Pending Task</p>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <CardBody>
              <FaChartLine size={30} className="mb-2" color="#a736d6" />
              <CardTitle>{topTasks.filter(task => task.priority === 'High' && task.status === 'Pending').length}</CardTitle>
              <p>High Priority Tasks</p>
            </CardBody>
          </Card>
        </Col>
      </Row>

      
    <Row style={{marginTop:'30px'}}>
        <Col md={4}>
          <Card>
            <CardBody>
              <CardTitle style={{fontSize:'20px'}}>High Priority Tasks</CardTitle>
              <ListGroup flush>
              {topTasks.filter(topTasks => topTasks.priority === 'High' && topTasks.status === 'Pending').slice(0, 5).map((toptask,index) => (
                <ListGroupItem key={index} style={{display:'flex',flexDirection:'column'}}>{toptask.task}<span style={{color:'gray',fontSize:'14px'}}>Deadline: {toptask.deadline} || {toptask.category}</span></ListGroupItem>
              ))}

              </ListGroup>
            </CardBody>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <CardBody>
              <CardTitle  style={{fontSize:'26px'}}>Recent Tasks</CardTitle>
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
                {
                topTasks.sort((a, b) => (b.id)-(a.id)).slice(0,5).map(task => (
                    <tr key={task.id}>
                    <td>TASK{task.id}</td>
                    <td>{task.task}</td>
                    <td>{task.category}</td>
                    <td>{task.deadline}</td>
                    <td>{task.priority}</td>
                    </tr>
                ))}

                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      

      <Row style={{marginTop:'30px'}}>
        <Col md={12}>
          <TaskByGoals/>
        </Col>
      </Row>

</div>
);
};

export default ShowTasks;

