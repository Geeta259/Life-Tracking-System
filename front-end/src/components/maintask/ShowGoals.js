import React, { useState, useEffect } from 'react';
import { Table, Button, ButtonGroup,Modal, ModalHeader, ModalBody, ModalFooter,  Progress,CardTitle,Card,CardBody,Col,Row,ListGroup,ListGroupItem } from 'reactstrap';
import { FaEdit, FaTrash, FaPlus,FaExclamationTriangle, FaMinusCircle } from 'react-icons/fa';
import { FaAward, FaTasks, FaChartLine} from 'react-icons/fa'; // Added FaSave icon


import base_url from '../../api/bootapi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ShowGoals = () => {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();
  const [filteredGoals, setFilteredGoals] = useState([]);
  const loggedInUser = localStorage.getItem('loginUser'); 
  const token = JSON.parse(loggedInUser).jwtToken;
  const useremail =  JSON.parse(loggedInUser).username;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState(null);
  const [completedGoalsCount, setCompletedGoalsCount] = useState(0);
  const [pendingGoalsCount, setPendingGoalsCount] = useState(0);

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
      const goalsWithTasks = await Promise.all(response.data.map(async (goal) => {
        const taskResponse = await axios.get(`${base_url}/show-tasks/${goal.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return {
            ...goal,
            tasks: taskResponse.data
        };
    }));
      setGoals(goalsWithTasks);
      setFilteredGoals(goalsWithTasks);
      countCompletedAndPendingGoals(goalsWithTasks);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  // Function to filter goals based on selected category
  const filterGoalsByCategory = (category) => {
    if (category === 'All') {
      setFilteredGoals(goals);
    } else {
      setFilteredGoals(goals.filter(goal => goal.category === category));
    }
  };

  // Function to filter goals based on selected time period
 
  const filterGoalsByTimePeriod = (timePeriod) => {
    const currentDate = new Date();
    let filtered = goals.filter(goal => {
      const goalDate = new Date(goal.deadline);
  
      if (timePeriod === 'today') {
        return goalDate.toDateString() === currentDate.toDateString();
      } else if (timePeriod === 'weekly') {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
  
        return goalDate >= startOfWeek && goalDate <= endOfWeek;
      } else if (timePeriod === 'monthly') {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
        return goalDate >= startOfMonth && goalDate <= endOfMonth;
      }
  
      return true;
    });
    
    setFilteredGoals(filtered);
  };
  

  // Function to edit a goal
  const editGoal = (id) => {
    // Logic to edit a goal
    navigate('/tracking-system/update-goal', { state: { id } });
    console.log(`Editing goal with id ${id}`);
  };

  const getAddForm = ()=>{
    navigate('/tracking-system/goal-setting');
  }

  const toggleDeleteModal = (goalId) => {
    setGoalToDelete(goalId);
    setDeleteModalOpen(!deleteModalOpen);
  };

  const confirmDeleteGoal = async () => {
    try {
      await axios.delete(`${base_url}/delete-goal/${goalToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchGoals(); // Refresh the goals list after deletion
      toast.success('Goal deleted successfully..');
      setDeleteModalOpen(false);
    } catch (error) {
      toast.error('Error deleting this Goal...', error);
    }
  };

  const calculateProgress = (totalTasks, completedTasks) => {
    if (totalTasks === 0) return 0;
    return (completedTasks / totalTasks) * 100;
};


const calculateTotalTime = (tasks) => {
     let totalTime = 0;
    tasks.forEach(task => {
      if (task && task.time){
        const timeArray = task.time.split(':').map(Number);
        const seconds = timeArray[0] * 3600 + timeArray[1] * 60 + timeArray[2];
        totalTime += seconds;
      }
    
    });
    return formatSecondsToTimeString(totalTime);
};

const formatSecondsToTimeString = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const countCompletedAndPendingGoals = (goals) => {
  let completed = 0;
  let pending = 0;
  goals.forEach(goal => {
    const totalTasks = goal.tasks.length;
    const completedTasks = goal.tasks.filter(task => task.status === 'Completed').length;
    if (totalTasks > 0 && totalTasks === completedTasks) {
      completed++;
    } else {
      pending++;
    }
  });
  setCompletedGoalsCount(completed);
  setPendingGoalsCount(pending);
};

  return (
    <div>

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
              <FaAward size={30} className="mb-2" color="#a736d6" />
              <CardTitle>{completedGoalsCount}</CardTitle>
              <p>Completed Goals</p>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <CardBody>
            <FaMinusCircle size={30} className="mb-2" color="#a736d6" />
              <CardTitle>{pendingGoalsCount}</CardTitle>
              <p>Pending Goals</p>
            </CardBody>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="text-center">
            <CardBody>
              <FaChartLine size={30} className="mb-2" color="#a736d6" />
              <CardTitle>{goals.filter(goal => goal.priority === 'High').length}</CardTitle>
              <p>High Priority Goals</p>
            </CardBody>
          </Card>
        </Col>
      </Row>

    <Row style={{marginTop:'30px'}}>
        <Col md={4}>
          <Card>
            <CardBody>
              <CardTitle style={{fontSize:'20px'}}>Goals Reminder</CardTitle>
              <ListGroup flush>
              {goals.filter(goal => goal.reminder === 'true').slice(0, 5)
               .map((highgoal,index) => (
                <ListGroupItem key={index} style={{display:'flex',flexDirection:'column'}}>{highgoal.goal}<span style={{color:'gray',fontSize:'14px'}}>Deadline: {highgoal.deadline} || {highgoal.category}</span></ListGroupItem>
              ))}

              </ListGroup>
            </CardBody>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <CardBody>
              <CardTitle  style={{fontSize:'26px'}}>Recent Goals</CardTitle>
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
                goals.sort((a, b) => (b.id)-(a.id)).slice(0,5).map(goal => (
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

      {/**  goals report */}
      <h2 style={{marginBottom: '40px', marginTop: '60px' }}> Your Goals</h2>
      <div  style={{marginBottom:'20px',  textAlign:'left'}}>
      <Button className='bg-primary'
          style={{
            height: 'fit-content',
            marginLeft:'15px',
            border:'none'
          }}
          onClick={() => getAddForm()}
        >
          <FaPlus /> Add New Goal
        </Button>
          </div>
    

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <ButtonGroup className="mb-3 mx-3">
          <Button className='bg-warning'
            style={{ marginRight: '20px',border:'none'}}
            onClick={() => filterGoalsByTimePeriod('today')}
          >
            Today
          </Button>
          <Button  className='bg-warning'
            style={{ marginRight: '20px',border:'none'}}
            onClick={() => filterGoalsByTimePeriod('weekly')}
          >
            Weekly
          </Button>
          <Button className='bg-warning'
            style={{ marginRight: '20px',border:'none'}}
            onClick={() => filterGoalsByTimePeriod('monthly')}
          >
            Monthly
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mb-3" style={{marginLeft: 'auto'}}>
          <Button className='bg-warning'
            style={{ marginRight: '20px',border:'none'}}
            onClick={() => filterGoalsByCategory('All')}
          >
            All
          </Button>
          <Button className='bg-warning'
            style={{ marginRight: '20px',border:'none'}}
            onClick={() => filterGoalsByCategory('Health')}
          >
            Health
          </Button>
          <Button className='bg-warning'
            style={{ marginRight: '20px',border:'none'}}
            onClick={() => filterGoalsByCategory('Work')}
          >
            Work
          </Button>
          <Button className='bg-warning'
            style={{ marginRight: '20px',border:'none'}}
            onClick={() => filterGoalsByCategory('Personal')}
          >
            Personal
          </Button>
          <Button className='bg-warning'
            style={{ marginRight: '20px',border:'none'}}
            onClick={() => filterGoalsByCategory('Social')}
          >
            Social
          </Button>
          <Button  className='bg-warning'
            style={{ marginRight: '20px',border:'none'}}
            onClick={() => filterGoalsByCategory('Chores')}
          >
            Chores
          </Button>
          <Button className='bg-warning'
            style={{ marginRight: '20px',border:'none'}}
            onClick={() => filterGoalsByCategory('Other')}
          >
            Other
          </Button>
        </ButtonGroup>
      
      </div>

        <div style={{ maxHeight: '500px',overflowY: 'auto',position: 'relative'}}>
      <Table bordered responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Goals</th>
            <th>Task</th>
            <th>Completed</th>    
            <th>Deadline</th>
            <th>Priority</th>
            <th>Spent Time</th>
            <th>Progress</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {filteredGoals.sort((a, b) => (b.id)-(a.id)).map((goal) => {
               const totalTasks = goal.tasks ? goal.tasks.length : 0;
               const completedTasks = goal.tasks ? goal.tasks.filter(task => task.status === 'Completed').length : 0;
               const progress = calculateProgress(totalTasks, completedTasks);
               const totalTime = calculateTotalTime(goal.tasks);
               return (
            <tr key={goal.id}>
              <td>GOAL{goal.id}</td>
              <td>{goal.goal}</td>
              <td>{totalTasks}</td>
              <td>{completedTasks}</td>
              <td>{goal.deadline}</td>
              <td>{goal.priority}</td>
              <td>{totalTime}</td>
              <td>
                            <Progress value={progress} color="success" style={{ height: '23px' }} className="mb-2">
                                                {Math.round(progress)}%
                                            </Progress>
                                </td>

                                <td>
                                    <span className={`badge ${progress === 100 ? 'bg-success' : progress > 0 ? 'bg-info' : 'bg-primary'}`}>
                                        {progress === 100 ? 'Completed' : progress > 0 ? 'On-Progress' : 'Not Start'}
                                    </span>
                                </td>
              <td>
                <ButtonGroup>
                  <Button
                    style={{ marginRight: '10px', backgroundColor: 'white',border:'none' }}
                    onClick={() => editGoal(goal.id)}
                    className='text-primary'
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    style={{ backgroundColor: '#fff',border:'none'  }}
                    onClick={() => toggleDeleteModal(goal.id)}
                    className='text-danger'
                  >
                    <FaTrash />
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
            )
          })}
        </tbody>
      </Table>
        </div>

         
         {/* Delete confirmation modal */}
     <Modal isOpen={deleteModalOpen} toggle={toggleDeleteModal} centered>
      <ModalHeader toggle={toggleDeleteModal}>
        <FaExclamationTriangle style={{ marginRight: '10px', color: 'red' }} />
        Confirm Delete
      </ModalHeader>
      <ModalBody>
        Are you sure you want to delete this goal?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={confirmDeleteGoal}>Delete</Button>
        <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
      </ModalFooter>
    </Modal>
       



    </div>
  );
};

export default ShowGoals;
