import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card,  CardBody,
  CardTitle, Dropdown,DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';
import base_url from '../../api/bootapi';
import AttendanceCalendar from './Calendar';
import {FaTasks, FaCheck,  FaMinus } from 'react-icons/fa';
import { Pie, Bar } from 'react-chartjs-2';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [monthDropdownOpen, setMonthDropdownOpen] = useState(false);
  const [completeAttendance, setCompleteAttendance] = useState([]);
  const loggedInUser = localStorage.getItem('loginUser');
  const token = JSON.parse(loggedInUser)?.jwtToken;
  const [totalActiveDays, setTotalActiveDays] = useState(0);
  const [totalAbsentDays, setTotalAbsentDays] = useState(0);
  const [maxConsecutiveActiveDays, setMaxConsecutiveActiveDays] = useState(0);
  const [currentConsecutiveActiveDays, setCurrentConsecutiveActiveDays] = useState(0);


  useEffect(() => {
    fetchAttendanceData(selectedMonth);
  }, [selectedMonth]);

  useEffect(() => {
    removeOldAttendanceData();
    fetchAttendance();

  }, []);

  useEffect(() => {
    calculateAttendanceStats();
  }, [completeAttendance]);

  const removeOldAttendanceData = () => {
    axios.delete(`${base_url}/remove-old-attendance`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      console.log('Old attendance data removed:', response.data);
    }).catch(error => {
      console.error('Error removing old attendance data:', error);
    });
  };

  const fetchAttendanceData = (month) => {
    axios.get(`${base_url}/get-attendance?month=${month}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setAttendanceData(response.data);
    }).catch(error => {
      console.error('Error fetching attendance data:', error);
      // Handle error
    });
  };

  const fetchAttendance = () => {
    axios.get(`${base_url}/get-attendance-data`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setCompleteAttendance(response.data);
    }).catch(error => {
      console.error('Error fetching attendance data:', error);
      // Handle error
    });
  };

  function daysInYear(year) {
    return ((year % 4 === 0 && year % 100 > 0) || year %400 == 0) ? 366 : 365;
}


function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getDaysInMonth(month, year) {
  return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

  const calculateAttendanceStats = () => {
    // Calculate total active days
    const activeDays = completeAttendance.length;
    setTotalActiveDays(activeDays);

    // Calculate total days in the current year
    // Calculate total days in the current year
    const today = new Date();
    console.log(today);
    const year = today.getFullYear();
    console.log(year);

    const totalDaysInYear = daysInYear(year);// Get total days in the current year
  
    console.log(totalDaysInYear);
    // Calculate total absent days
    const absentDays = totalDaysInYear - activeDays;
    setTotalAbsentDays(absentDays); // Calculate total absent days
   

    //create a set in which month-day as a string present
    const activeDaysSet = new Set(
      completeAttendance
        .filter(record => record.status)  // Ensure only days with status true are considered
        .map(record => `${record.month}-${record.day}`)
    );
  
    console.log("Active Days Set:", activeDaysSet); // Debug print
  
    let maxConsecutive = 0;
    let currentConsecutive = 0;
  
    for (let month = 1; month <= 12; month++) {
      const daysInMonth = getDaysInMonth(month, year);
      for (let day = 1; day <= daysInMonth; day++) {
        if (activeDaysSet.has(`${month}-${day}`)) {
          currentConsecutive++;
          if (currentConsecutive > maxConsecutive) {
            maxConsecutive = currentConsecutive;
          } } else {
            currentConsecutive = 0;
          }
        }
      }

    setMaxConsecutiveActiveDays(maxConsecutive);
    

    //current consecutive days
    const currentDay = today.getDate();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // Months are zero-based in JavaScript
   

  for (let month = 1; month <= currentMonth; month++) {
    const daysInMonth = getDaysInMonth(month, currentYear);
    for (let day = 1; day <= (month === currentMonth ? currentDay : daysInMonth); day++) {
      if (activeDaysSet.has(`${month}-${day}`)) {
        currentConsecutive++;
      } else {
        currentConsecutive = 0;
      }
    }
  }

  setCurrentConsecutiveActiveDays(currentConsecutive);
    
  };


  
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setMonthDropdownOpen(false); // Close the month dropdown after selection
  };

  const calculateChartData = () => {
    // Data for pie chart - active vs absent days
    const pieChartData = {
      labels: ['Total Active Days', 'Total Absent Days'],
      datasets: [
        {
          data: [totalActiveDays, totalAbsentDays],
          backgroundColor: ['#36a2eb', '#ff6384'],
          hoverBackgroundColor: ['#36a2eb', '#ff6384'],
        },
      ],
    };

     // Data for bar chart - active vs absent days per month
     const barChartData = {
      labels: [...Array(12).keys()].map(month => new Date(0, month).toLocaleString('default', { month: 'short' })),
      datasets: [
        {
          label: 'Active Days',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
          hoverBorderColor: 'rgba(54, 162, 235, 1)',
          data: Array.from({ length: 12 }, (_, month) => calculateActiveDaysForMonth(month + 1)),
        },  {
          label: 'Absent Days',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)',
          hoverBorderColor: 'rgba(255, 99, 132, 1)',
          data: Array.from({ length: 12 }, (_, month) => calculateAbsentDaysForMonth(month + 1)),
        },
      ],
    };

    return { pieChartData, barChartData };
  };

  // Helper function to calculate active days for a specific month
  const calculateActiveDaysForMonth = (month) => {
    return completeAttendance.filter(record => record.month === month && record.status).length;
  };

 // Helper function to calculate absent days for a specific month
const calculateAbsentDaysForMonth = (month) => {
  const daysInMonth = getDaysInMonth(month, new Date().getFullYear());
  const activeDaysSet = new Set(completeAttendance.filter(record => record.month === month && record.status).map(record => record.day));
  return daysInMonth - activeDaysSet.size;
};

  // Data for charts
  const { pieChartData, barChartData } = calculateChartData();

 

  const toggleMonthDropdown = () => setMonthDropdownOpen(prevState => !prevState);
 

  return (
    <Container>
      <Row className="mb-4">
          <Col md={3}>
            <Card className="text-center">
              <CardBody>
                <FaTasks size={30} className="mb-2" color="#a736d6" />
                <CardTitle>{totalActiveDays}</CardTitle>
                <p>Total active days in current year</p>
              </CardBody>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="text-center">
              <CardBody>
                <FaMinus size={30} className="mb-2" color="#a736d6" />
                <CardTitle>{totalAbsentDays}</CardTitle>
                <p>Total absent days in current year</p>
              </CardBody>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="text-center">
              <CardBody>
                <FaCheck size={30} className="mb-2" color="#a736d6" />
                <CardTitle>{maxConsecutiveActiveDays}</CardTitle>
                <p>Maximum consecutive active days in current year</p>
              </CardBody>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="text-center">
              <CardBody>
                <FaTasks size={30} className="mb-2" color="#a736d6" />
                <CardTitle>{currentConsecutiveActiveDays}</CardTitle>
                <p>Current consecutive active days  in current year</p>
              </CardBody>
            </Card>
          </Col>
      </Row>


      <Row className="mt-3">
        <Col md={6}>
        <div style={{display:'flex',fontSize:'20px',color:'black',margin:'10px'}}>
          <label style={{marginRight:'30px'}}>Select a Month : </label>
        <Dropdown isOpen={monthDropdownOpen} toggle={toggleMonthDropdown} style={{ borderRadius: '30px', height: '40px', width: '200px' }}>
          <DropdownToggle caret style={{ backgroundColor: '#fff', color: '#000', borderRadius: '30px',border:'1px solid rgba(0,0,0,0.17)', width: '100%' }}>
            {new Date(0, selectedMonth - 1).toLocaleString('default', { month: 'long' })}
          </DropdownToggle>
          <DropdownMenu style={{ width: '100%' }}>
            {[...Array(12).keys()].map((month) => (
              <DropdownItem key={month} onClick={() => handleMonthChange(month + 1)}>
                {new Date(0, month).toLocaleString('default', { month: 'long' })}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        </div>
       

        <AttendanceCalendar   selectedMonth={selectedMonth}
            attendanceData={attendanceData}
            fetchAttendanceData={fetchAttendanceData}
            fetchAttendance={fetchAttendance} />

        </Col>
        <Col md={6} style={{marginTop:'6%'}}>
          {/* Pie Chart */}
          <Card className="mb-3">
            <CardBody>
              <Pie
                style={{height:'240px'}}
                data={pieChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </CardBody>
          </Card>
            {/* Bar Chart */}
          <Card>
            <CardBody>
              <Bar
               style={{height:'250px'}}
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    xAxes: [{ stacked: true }],
                    yAxes: [{ stacked: true }],
                  },
                }}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      
    </Container>
  );
};

export default Attendance;
