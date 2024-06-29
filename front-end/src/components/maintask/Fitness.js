import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup,ButtonGroup, Label, Input, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardTitle } from 'reactstrap';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { FaEdit, FaTrash, FaExclamationTriangle, FaBurn, FaCalendarCheck, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import base_url from '../../api/bootapi';



const Fitness = () => {
  const loggedInUser = localStorage.getItem('loginUser');
  const token = JSON.parse(loggedInUser).jwtToken;
  const useremail = JSON.parse(loggedInUser).username;

  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [exerciseData, setExerciseData] = useState({
    name: '',
    category: '',
    weight: '',
    duration: '',
    reps: '',
    sets: '',
    uemail: useremail  // Ensure useremail is included in initial state
  });
  const [editingId, setEditingId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState(null);

  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [workouts, setWorkouts] = useState(0);
  const [consecutiveDays, setConsecutiveDays] = useState(0);


  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const response = await axios.get(`${base_url}/get-exercise/${useremail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
   
      // Sort exercises by postedDate in descending order
      const sortedExercises = response.data.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
      setExercises(sortedExercises);
      setFilteredExercises(sortedExercises);
      calculateConsecutiveDays(sortedExercises);
      updateDashboard(sortedExercises);
      setEditingId(null);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  const calculateCalories = (exercise) => {
    const { weight, duration, reps, sets } = exercise;
    return ((weight / 10) * duration * (parseInt(reps) + parseInt(sets)) * 0.1);
  };
  
  const calculateConsecutiveDays = (exercises) => {
    let count = 1,max=0;
    for (let i = 0; i < exercises.length; i++) {
      const currentDate = new Date(exercises[i].postedDate);
      const prevDate = new Date(exercises[i + 1]?.postedDate);
  
      if (i === 0 || isNextDay(prevDate, currentDate)) {
        count++;
        max=count>max?count:max;
      } else {
        count=0;
      }
    }
    setConsecutiveDays(max);
  };
  const isNextDay = (prevDate, currentDate) => {
    if (!prevDate) return false;
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((currentDate - prevDate) / oneDay));
    return diffDays === 1;
  };

  const updateDashboard = (data) => {
    const currentDate = new Date().toDateString();
    const todayData = data.filter(exercise => new Date(exercise.postedDate).toDateString() === currentDate);
  
    const totalCalories = todayData.reduce((acc, exercise) => acc + calculateCalories(exercise), 0);
    const totalWorkouts = todayData.length;
  
    setCaloriesBurned(totalCalories);
    setWorkouts(totalWorkouts);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseData({ ...exerciseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${base_url}/update-exercise/${editingId}`, exerciseData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        await fetchExercises(); // Fetch updated list of exercises
       
        toast.success('Exercise updated successfully!');
      } else {
        const response = await axios.post(`${base_url}/add-exercise`, exerciseData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setExercises([...exercises, response.data]);
        await fetchExercises(); // Fetch updated list of exercises
      
        toast.success('Exercise added successfully!');
      }
      // Reset form data
      setExerciseData({
        name: '',
        category: '',
        weight: '',
        duration: '',
        reps: '',
        sets: '',
        uemail: useremail  // Reset useremail as well
      });
      updateDashboard([...exercises, exerciseData]);
    } catch (error) {
      toast.error('Something went wrong. Try again!');
      console.error('Error adding/updating exercise:', error);
    }
  };

  const handleDeleteExercise = async () => {
    try {
      await axios.delete(`${base_url}/delete-exercise/${exerciseToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedExercises = exercises.filter(exercise => exercise.id !== exerciseToDelete);
      await  fetchExercises();
      setDeleteModalOpen(false);
      toast.success('Exercise deleted successfully.');
      updateDashboard(updatedExercises);
    } catch (error) {
      console.error('Error deleting exercise:', error);
    }
  };

  const handleEditExercise = (id) => {
    const exercise = exercises.find(ex => ex.id === id);
    setExerciseData(exercise);
    setEditingId(id);
  };

  const toggleDeleteModal = (exerciseId) => {
    setExerciseToDelete(exerciseId);
    setDeleteModalOpen(!deleteModalOpen);
  };

  const calculateTotalTimeByDate = () => {
    // Initialize an object to store total times for each day of the week
    const totalTimeByDate = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0
    };
  
    // Loop through exercises and accumulate total time for each day
    exercises.forEach(exercise => {
      let formattedDate;
      try {
        // Attempt to parse the date assuming it is in YYYY-MM-DD format
        formattedDate = new Date(exercise.postedDate).toISOString().slice(0, 10);
      } catch (error) {
        console.error(`Error parsing date for exercise ID ${exercise.id}:`, error);
        return; // Skip this exercise if date parsing fails
      }
  
      // Get the day name (e.g., "Monday") from the formatted date
      const dayName = new Date(formattedDate).toLocaleDateString('en-US', { weekday: 'long' });
  
      // Increment the total time for the corresponding day
      totalTimeByDate[dayName] += parseInt(exercise.duration);
    });
  
    return totalTimeByDate;
  };

  const totalTimeByDate = calculateTotalTimeByDate();

const barData = {
  labels: Object.keys(totalTimeByDate),
  datasets: [
    {
      label: 'Total Workout Time (minutes)',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: Object.values(totalTimeByDate)
    }
  ]
};

const barOptions = {
  scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Total Workout Time (minutes)'
      },
      ticks: {
        beginAtZero: true
      }
    }],
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Day of the Week'
      }
    }]
  },
  title: {
    display: true,
    text: 'Weekly Total Workout Time',
    fontSize: 20
  },
  legend: {
    display: true,
    position: 'top'
  }
};

  // Process data for Pie chart
  const pieCategories = exercises.reduce((acc, exercise) => {
    acc[exercise.category] = (acc[exercise.category] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(pieCategories),
    datasets: [
      {
        label: 'Workout Categories',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A', '#949FB1'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A', '#949FB1'],
        data: Object.values(pieCategories)
      }
    ]
  };

  const pieOptions = {
    title: {
      display: true,
      text: 'Workout Categories',
      fontSize: 20
    },
    legend: {
      display: true,
      position: 'right'
    }
  };

  // Function to filter goals based on selected time period
  const filterExerciseByTimePeriod = (timePeriod) => {
    const currentDate = new Date();
    let filtered = exercises.filter(exercise => {
      const exerciseDate = new Date(exercise.postedDate);
  
      if (timePeriod === 'today') {
        return exerciseDate.toDateString() === currentDate.toDateString();
      } else if (timePeriod === 'weekly') {
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
  
        return exerciseDate >= startOfWeek && exerciseDate <= endOfWeek;
      } else if (timePeriod === 'monthly') {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
        return exerciseDate >= startOfMonth && exerciseDate <= endOfMonth;
      }
  
      return true;
    });
    
    setFilteredExercises(filtered);
  };

  const filterExerciseByCategory = (category) => {
    if (category === 'All') {
      setFilteredExercises(exercises);
    } else {
      setFilteredExercises(exercises.filter(exercise => exercise.category === category));
    }
  };

  return (
    <Container fluid className="mt-5">

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <CardBody>
              <FaBurn size={30} className="mb-2" color="#a736d6" />
              <CardTitle style={{fontSize:'18px'}}>{caloriesBurned.toLocaleString()} kcal</CardTitle>
              <p>Calories Burned for today</p>
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <CardBody>
              <FaCheck size={30} className="mb-2" color="#a736d6" />
              <CardTitle style={{fontSize:'18px'}}>{workouts.toLocaleString()}</CardTitle>
              <p>Total number of workouts for today</p>
            </CardBody>
          </Card>
        </Col>

        <Col md={4}>
      <Card className="text-center">
        <CardBody>
          <FaCalendarCheck size={30} className="mb-2" color="#a736d6" />
          <CardTitle style={{fontSize:'18px'}}>{consecutiveDays}</CardTitle>
          <p>Maximum Consecutive Days</p>
        </CardBody>
      </Card>
    </Col>


      </Row>


      <Row className='mt-4'>
        <Col md={6}>
            <Card>
            <CardBody  style={{height:'350px'}}>
              <CardTitle>Daily Track of Workout Time</CardTitle>
              <Bar data={barData} options={barOptions} />
              </CardBody>
            </Card>
        
        </Col>
        <Col md={6}>
          <Card style={{border:'none'}}>
          <CardBody  style={{height:'350px',marginLeft:'50px'}}>
              <CardTitle>Workout Categories</CardTitle>
              <Pie style={{marginLeft:'60px'}} data={pieData} options={pieOptions}/>
            </CardBody>
        
          </Card>
         
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Card>
            <CardBody>
              <CardTitle style={{ fontSize: '20px' }}>{editingId ? 'Update Workout' : 'Add Workout'}</CardTitle>
              <Form className="exercise-form mt-4" onSubmit={handleSubmit}>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="name">Exercise Name</Label>
                      <Input type="text" id="name" name="name" value={exerciseData.name} onChange={handleChange} required />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="category">Category</Label>
                      <Input type="select" id="category" name="category" value={exerciseData.category} onChange={handleChange} required>
                        <option value="" disabled>Select Category</option>
                        <option value="Leg">Leg</option>
                        <option value="Chest">Chest</option>
                        <option value="Shoulder">Shoulder</option>
                        <option value="Back">Back</option>
                        <option value="Arm">Arm</option>
                        <option value="Cardio">Cardio</option>
                        <option value="Other">Other</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="weight">Weight (kg)</Label>
                      <Input type="number" id="weight" name="weight" value={exerciseData.weight} onChange={handleChange} required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="duration">Duration (minutes)</Label>
                      <Input type="number" id="duration" name="duration" value={exerciseData.duration} onChange={handleChange} required />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="reps">Reps</Label>
                      <Input type="number" id="reps" name="reps" value={exerciseData.reps} onChange={handleChange} required />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="sets">Sets</Label>
                      <Input type="number" id="sets" name="sets" value={exerciseData.sets} onChange={handleChange} required />
                    </FormGroup>
                  </Col>
                </Row>
                <Button className='bg-info' type="submit" style={{ marginTop: '20px', alignSelf: 'center', width: 'auto', fontSize: '20px', borderRadius: '20px' ,border:'none'}}>
                {editingId ? 'Update Workout' : 'Add Workout'}
              </Button>
           
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>


      <div style={{ display: 'flex',marginTop:'60px', flexWrap: 'wrap' }}>
        <ButtonGroup className="mb-3 mx-3">
          <Button className='bg-warning'
            style={{ marginRight: '20px',border:'none'}}
            onClick={() => filterExerciseByTimePeriod('today')}
            >
            Today
          </Button>
          <Button  className='bg-warning'
            style={{ marginRight: '20px',border:'none'}} 
            onClick={() => filterExerciseByTimePeriod('weekly')}
            >
            Weekly
          </Button>
          <Button className='bg-warning'
            style={{ marginRight: '20px',border:'none'}}
            onClick={() => filterExerciseByTimePeriod('monthly')}
            >
            Monthly
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mb-3" style={{marginLeft: 'auto'}}>
          <Button className='bg-warning'
            style={{ marginRight: '20px',border:'none'}}
            onClick={() => filterExerciseByCategory('All')}
            >
            All
          </Button>
          <Button className='bg-warning'
            style={{ marginRight: '20px',border:'none'}}
            onClick={() => filterExerciseByCategory('Leg')}
            >
            Leg
          </Button>
          <Button className='bg-warning'
            style={{ marginRight: '20px',border:'none'}}
            onClick={() => filterExerciseByCategory('Chest')}
            >
            Chest
          </Button>
          <Button className='bg-warning'
            style={{ marginRight: '20px',border:'none'}}
            onClick={() => filterExerciseByCategory('Shoulder')}
            >
            Shoulder
          </Button>
          <Button className='bg-warning'
            style={{ marginRight: '20px',border:'none'}}
            onClick={() => filterExerciseByCategory('Back')}
            >
            Back
          </Button>
          <Button  className='bg-warning'
            style={{ marginRight: '20px',border:'none'}}
            onClick={() => filterExerciseByCategory('Arm')}
            >
            Arm
          </Button>
          <Button className='bg-warning'
            style={{ marginRight: '20px',border:'none'}}
            onClick={() => filterExerciseByCategory('Cardio')}
            >
            Cardio
          </Button>
          <Button className='bg-warning'
            style={{ marginRight: '20px',border:'none'}}
            onClick={() => filterExerciseByCategory('Other')}
            >
            Other
          </Button>
        </ButtonGroup>
      
      </div>


        <div style={{ maxHeight: '500px',width:'100%',overflowY: 'auto',position: 'relative'}}>
       
          <Table bordered responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Weight (kg)</th>
                <th>Duration (min)</th>
                <th>Reps</th>
                <th>Sets</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {filteredExercises.map((exercise, index) => (
                <tr key={exercise.id}>
                  <th scope="row">EXE{index + 1}</th>
                  <td>{exercise.name}</td>
                  <td>{exercise.category}</td>
                  <td>{exercise.weight}</td>
                  <td>{exercise.duration}</td>
                  <td>{exercise.reps}</td>
                
                  <td>{exercise.sets}</td>
                  <td>{exercise.postedDate}</td>
                  <td>
                    <Button  className="text-primary" style={{background:'#fff',border:'none'}} size="sm" onClick={() => handleEditExercise(exercise.id)}>
                      <FaEdit />
                    </Button>{' '}
                    <Button  className="text-danger" style={{background:'#fff',border:'none'}} size="sm" onClick={() => toggleDeleteModal(exercise.id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
     
        </div>
    

      <Modal isOpen={deleteModalOpen} toggle={() => setDeleteModalOpen(!deleteModalOpen)}>
        <ModalHeader toggle={() => setDeleteModalOpen(!deleteModalOpen)}>
          <FaExclamationTriangle /> Delete Exercise
        </ModalHeader>
        <ModalBody>
          Are you sure you want to delete this exercise?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDeleteExercise}>Delete</Button>{' '}
          <Button color="secondary" onClick={() => setDeleteModalOpen(!deleteModalOpen)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Fitness;
