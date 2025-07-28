import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, PointElement, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(PointElement, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend);


const TimeTrackerChart = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [timesheets, setTimesheets] = useState<any[]>([]);

  useEffect(() => {
    // Fetch the project
    const token = localStorage.getItem("token");
   
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/projects/getprojects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setProjects(data.projects));

    // Fetch the timesheets
    fetch(`${apiUrl}/timesheets/getTimesheet`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setTimesheets(data.timesheets));
  }, []);

  // Process timesheets to calculate total time per project
  const projectTimes = projects.map(project => {
    const totalTime = timesheets
      .filter(timesheet => timesheet.project === project._id)
      .reduce((acc, timesheet) => acc + timesheet.timerValue, 0);

    return {
      name: project.name,
      totalTime: totalTime / 3600, // Convert to hours
    };
  });

  // Prepare data for the bar chart
  const chartData = {
    labels: projectTimes.map(pt => pt.name),
    datasets: [
      {
        label: 'Total Time (hours)',
        data: projectTimes.map(pt => pt.totalTime),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Project Time Tracker</h2>
      <Line data={chartData} />
    </div>
  );
};

export default TimeTrackerChart;
