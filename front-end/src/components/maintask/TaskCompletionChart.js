import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import axios from 'axios';
import base_url from '../../api/bootapi';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const TaskCompletionChart = () => {
    const [completionRateData, setCompletionRateData] = useState({
        labels: ['Completed', 'Pending'],
        datasets: [{
            data: [0, 0],
            backgroundColor: ['#4caf50', '#f44336'],
            hoverBackgroundColor: ['#66bb6a', '#e57373']
        }]
    });

    const [taskDistributionData, setTaskDistributionData] = useState({
        labels: ['Health', 'Personal', 'Work', 'Social', 'Chores', 'Other'],
        datasets: [
            {
                label: 'Completed Tasks',
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: '#4caf50'
            },
            {
                label: 'Pending Tasks',
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: '#f44336'
            }
        ]
    });


    useEffect(() => {
        fetchChartData();
    }, []);

    const loggedInUser = localStorage.getItem('loginUser'); 
  const token = JSON.parse(loggedInUser).jwtToken;
  const useremail =  JSON.parse(loggedInUser).username;

    const fetchChartData = async () => {
        try {
            const response = await axios.get(`${base_url}/get-tasks/${useremail}`,{
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
            const tasks = response.data;

            // Process data
            const categories = ['Health', 'Personal', 'Work', 'Social', 'Chores', 'Other'];
            const completedTasks = categories.map(category => tasks.filter(task => task.category === category && task.status === 'Completed').length);
            const pendingTasks = categories.map(category => tasks.filter(task => task.category === category && task.status === 'Pending').length);
          
            const totalCompleted = completedTasks.reduce((sum, val) => sum + val, 0);
            const totalPending = pendingTasks.reduce((sum, val) => sum + val, 0);

            setCompletionRateData({
                labels: ['Completed', 'Pending'],
                datasets: [{
                    data: [totalCompleted, totalPending],
                    backgroundColor: ['#85e37f', '#7fbbe3'],
                    hoverBackgroundColor: ['#66bb6a', '#e57373']
                }]
            });

            setTaskDistributionData({
                labels: categories,
                datasets: [
                    {
                        label: 'Completed Tasks',
                        data: completedTasks,
                        backgroundColor: '#85e37f'
                    },
                    {
                        label: 'Pending Tasks',
                        data: pendingTasks,
                        backgroundColor: '#7fbbe3'
                    }
                ]
            });

       
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };

    return (
        <div style={{ display: 'flex', width: '100%' ,marginTop:'10px'}}>
             <div style={{width:'40%',margin:'20px',height:'300px'}}>
                    <h3 style={{ color: 'white', textAlign: 'left' }}>Task Completion Rate</h3>
                    <Pie data={completionRateData} />
                </div>

                <div style={{ marginTop: '10px', width: '55%',marginTop:'10px',height:'300px' }}>
                    <h3 style={{ color: 'white', textAlign: 'left'}}>Goals Task Distribution</h3>
                    <Bar
                        data={taskDistributionData}
                        options={{
                            scales: {
                                x: {
                                    stacked: true,
                                },
                                y: {
                                    stacked: true,
                                    beginAtZero: true
                                }
                            }
                        }}
                    />
                </div>
            </div>
    );
};

export default TaskCompletionChart;
