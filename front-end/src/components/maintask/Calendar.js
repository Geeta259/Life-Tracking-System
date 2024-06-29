import React, { useState, useEffect } from 'react';
import { Table, Input } from 'reactstrap';
import axios from 'axios';
import base_url from '../../api/bootapi';
import { toast } from 'react-toastify';

const Calendar = ({ selectedMonth, attendanceData, fetchAttendanceData, fetchAttendance }) => {
  const loggedInUser = localStorage.getItem('loginUser');
  const token = JSON.parse(loggedInUser)?.jwtToken;

  const daysInMonth = new Date(new Date().getFullYear(), selectedMonth, 0).getDate();
  const firstDayOfMonth = new Date(new Date().getFullYear(), selectedMonth - 1, 1).getDay();

  // Initialize daysStatus array with all days set to false initially
  const initialDaysStatus = Array.from({ length: daysInMonth }, () => false);
  const [daysStatus, setDaysStatus] = useState(initialDaysStatus);

  // Update daysStatus based on attendanceData when it changes
  useEffect(() => {
    const updatedStatus = Array.from({ length: daysInMonth }, (_, index) => {
      const dayData = attendanceData.find(data => data.day === index + 1);
      return dayData ? dayData.status : false;
    });
    setDaysStatus(updatedStatus);
  }, [attendanceData, daysInMonth, selectedMonth]);

  const handleDayClick = async (day) => {
    const newStatus = [...daysStatus];
    const currentIndex = day - 1;
    const currentStatus = newStatus[currentIndex];
    const updatedStatus = !currentStatus;

    // Toggle the status locally
    newStatus[currentIndex] = updatedStatus;
    setDaysStatus(newStatus);

    try {
      if (!updatedStatus) {
        // Delete attendance via API if status is false (unchecked)
        await axios.delete(
          `${base_url}/delete-attendance`,
          {
            data: {
              month: selectedMonth,
              day: day,
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        toast.success('Selected day attendance removed!');
      } else {
        // Update attendance via API if status is true (checked)
        await axios.post(
          `${base_url}/add-attendance`,
          {
            month: selectedMonth,
            day: day,
            status: updatedStatus
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        toast.success('Selected day attendance recorded!');
      }


      // Fetch updated attendance data
      await fetchAttendanceData(selectedMonth);
      await fetchAttendance();
      
    } catch (error) {
      console.error('Error updating/deleting attendance:', error);
      toast.error('Something went wrong...!');

      // Revert the local status if API call fails
      newStatus[currentIndex] = currentStatus;
      setDaysStatus(newStatus);
    }
  };

  const renderDays = () => {
    const daysArray = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(<td key={`empty-${i}`} style={{ border: 'none' }} />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const cellStyle = {
        textAlign: 'center',
        verticalAlign: 'middle',
        cursor: 'pointer',
        height: '100px',
        backgroundColor: daysStatus[day - 1] ? 'green' : 'white', // Example background color change
        color: daysStatus[day - 1] ? 'white' : 'black', // Example text color change
      };
      
      daysArray.push(
        <td key={day} style={{ textAlign: 'center', verticalAlign: 'middle', cursor: 'pointer', height: '100px' }} onClick={() => handleDayClick(day)}>
          {day}
          <div>
            <Input
              type="checkbox"
            
              checked={daysStatus[day - 1]}
              style={{ backgroundColor: daysStatus[day - 1] ? 'green' : 'white'}}
              readOnly
            />
          </div>
        </td>
      );
    }
    return daysArray;
  };

  const renderTableRows = () => {
    const rows = [];
    const days = renderDays();
    for (let i = 0; i < days.length; i += 7) {
      rows.push(<tr key={i} >{days.slice(i, i + 7)}</tr>);
    }
    return rows;
  };

  return (
    <div>
      <Table bordered style={{ tableLayout: 'fixed', width: '100%', marginTop: '20px',height:'300px'}}>
        <thead>
          <tr>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <th key={day} style={{ textAlign: 'center', verticalAlign: 'middle' }}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </Table>
    </div>
  );
};

export default Calendar;
