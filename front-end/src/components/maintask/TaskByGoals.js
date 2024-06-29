import React, { useState, useEffect } from 'react';
import { Table, Button, ButtonGroup, Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FaEdit, FaTrash, FaExclamationTriangle, FaPlay, FaPause, FaClock ,FaPlus} from 'react-icons/fa';
import base_url from '../../api/bootapi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import TaskCompletionChart from './TaskCompletionChart';


const TaskByGoals = () => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [timers, setTimers] = useState({});
  const [elapsedTimes, setElapsedTimes] = useState({});
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState('');
  const loggedInUser = localStorage.getItem('loginUser'); 
  const token = JSON.parse(loggedInUser).jwtToken;
  const useremail =  JSON.parse(loggedInUser).username;

  const navigate = useNavigate();

  //for running time
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTimes((prev) => ({ ...prev }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  useEffect(() => {
    if (selectedGoal) {
      fetchTasks(selectedGoal);
    }
  }, [selectedGoal]);

  const handleGoalChange = (e) => {
    const selectedGoalId = parseInt(e.target.value);
    setSelectedGoal(selectedGoalId);
  };

  const getAddForm = ()=>{
    navigate('/tracking-system/add-task');
  }

  const fetchTasks = async (goalId) => {
    try {
      const response = await axios.get(`${base_url}/show-tasks/${goalId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const tasks = response.data.map(task => ({
        ...task,
        time: convertTimeStringToMilliseconds(task.time)
      }));
      setTasks(tasks);
      setFilteredTasks(tasks);
      setElapsedTimes(tasks.reduce((acc, task) => ({ ...acc, [task.id]: task.time }), {}));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const editTask = (id) => {
    navigate('/tracking-system/update-task', { state: { id } });
  };

  const toggleDeleteModal = (id) => {
    setTaskToDelete(id);
    setDeleteModalOpen(!deleteModalOpen);
  };

  const confirmDeleteTask = async () => {
    try {
      await axios.delete(`${base_url}/delete-task/${taskToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Task deleted successfully.');
      fetchTasks(selectedGoal);
      setDeleteModalOpen(false);
    } catch (error) {
      toast.error('Error deleting this Task...', error);
    }
  };

  const filterTasksByStatus = (status) => {
    if (status === 'Completed') {
      const completedTasks = tasks.filter(task => task.status === 'Completed');
      setFilteredTasks(completedTasks);
    } else if (status === 'Pending') {
      const pendingTasks = tasks.filter(task => task.status === 'Pending');
      setFilteredTasks(pendingTasks);
    } else {
      setFilteredTasks(tasks);
    }
  };

  const startTimer = (taskId) => {
    console.log('Starting timer for task ID:', taskId);
    const startTime = Date.now();
    console.log('Start time:', startTime);
    setTimers((prevTimers) => ({ ...prevTimers, [taskId]: startTime }));
  };

  const stopTimer = (taskId) => {
    console.log('Stopping timer for task ID:', taskId);
    const elapsedTime = Date.now() - timers[taskId];
    console.log('Elapsed time:', elapsedTime);
    setElapsedTimes((prevElapsedTimes) => ({ ...prevElapsedTimes, [taskId]: (prevElapsedTimes[taskId] || 0) + elapsedTime }));
    setTimers((prevTimers) => ({ ...prevTimers, [taskId]: null }));
  };

  const saveTimer = async (taskId) => {
    try {
      const elapsedTime = elapsedTimes[taskId] || 0;
      const formattedTime = formatMillisecondsToTimeString(elapsedTime);
      await axios.put(`${base_url}/task-time/${taskId}/${formattedTime}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Timer saved successfully.');
    } catch (error) {
      toast.error('Error saving timer.', error);
    }
  };
  

  const convertTimeStringToMilliseconds = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  };

  const formatMillisecondsToTimeString = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const getTotalElapsedTime = (taskId) => {
    const runningTime = timers[taskId] ? Date.now() - timers[taskId] : 0;
    const previousTime = elapsedTimes[taskId] || 0;
    return runningTime + previousTime;
  };

  return (
    <div>

             
        <div>
        <h2 style={{ marginTop: '40px'}}>Tasks Report</h2>
        <TaskCompletionChart/>
          </div>  


      <h2 style={{ marginBottom: '60px', marginTop: '10%' }}>Show Tasks for Selected Goal</h2>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}> 
      <div  style={{marginBottom:'20px',  textAlign:'left'}}>
      <Button className='bg-primary'
          style={{
            height: 'fit-content',
            border:'none'
          }}
          onClick={() => getAddForm()}
        >
          <FaPlus /> Add New Task
        </Button>
          </div>


            
        <div className="custom-select-wrapper" style={{ display: 'flex',width:'40%'}}>
          <Label for="goalSelect" style={{ color: '#fff', marginRight: '10px', marginTop: '5px', fontSize: '18px'}}>Select your Goal :</Label>
          <Input type="select" id="goalSelect" onChange={handleGoalChange} value={selectedGoal} style={{ borderRadius: '10px', height: '40px' }} required>
            <option value="">Select a Goal</option>
            {goals.map((goal) => (
              <option key={goal.id} value={goal.id}>{goal.goal}</option>
            ))}
          </Input>
        </div>

            
        <div style={{ display: 'flex',width:'30%'}}>
          <Button className="bg-success" onClick={() => filterTasksByStatus('Completed')} style={{ borderRadius: '40px',border:'none', height: 'fit-content'}}>Completed</Button>
          <Button className="bg-danger" onClick={() => filterTasksByStatus('Pending')} style={{ borderRadius: '40px',border:'none' ,marginLeft:'20px',height: 'fit-content'}}>Pending</Button>
          <Button className="bg-info text-white" onClick={() => filterTasksByStatus('All')} style={{ marginLeft: '20px', borderRadius: '20px',border:'none',height: 'fit-content' }}>All</Button>
          </div>

      </div>
    

      <div>
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th>Category</th>
              <th>Deadline</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>TASK{task.id}</td>
                <td>{task.task}</td>
                <td>{task.category}</td>
                <td>{task.deadline}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td>
                  <div>
                    <FaClock style={{ marginRight: '5px',color:'red' }} />
                    {formatMillisecondsToTimeString(getTotalElapsedTime(task.id))}
                    {task.status === 'Pending' && (
                      <Button className="bg-warning text-white" size="sm" onClick={() => saveTimer(task.id)} style={{ marginLeft: '5px',border:'none',borderRadius:'40px' }}>Save Time</Button>
                    )}
                  </div>
                </td>
                <td>
                  <ButtonGroup>
                    {task.status === 'Pending' ? (
                      !timers[task.id] ? (
                        <Button style={{ marginRight: '10px', backgroundColor: '#fff', border: 'none' }} className='text-success' onClick={() => startTimer(task.id)}>
                          <FaPlay />
                        </Button>
                      ) : (
                        <Button style={{ marginRight: '10px', backgroundColor: '#fff', border: 'none' }} className='text-info' onClick={() => stopTimer(task.id)}>
                          <FaPause />
                        </Button>
                      )
                    ) : ''}
                    <Button style={{ backgroundColor: '#fff', border: 'none' }} className='text-primary' onClick={() => editTask(task.id)}>
                      <FaEdit />
                    </Button>
                    <Button style={{ backgroundColor: '#fff', border: 'none' }} className='text-danger' onClick={() => toggleDeleteModal(task.id)}>
                      <FaTrash />
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal isOpen={deleteModalOpen} toggle={toggleDeleteModal} centered>
        <ModalHeader toggle={toggleDeleteModal}>
          <FaExclamationTriangle style={{ marginRight: '10px', color: 'red' }} />
          Confirm Delete
        </ModalHeader>
        <ModalBody>
          Are you sure you want to delete this task?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirmDeleteTask}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
      
    </div>
  );
};

export default TaskByGoals;
