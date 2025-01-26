import { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, ArcElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, ArcElement);

const PieTimeTrackerChart = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [timesheets, setTimesheets] = useState<any[]>([]);
  
  useEffect(() => {
    // Fetch the token from localStorage
    const token = localStorage.getItem('token');
    
    // Fetch the projects data
    fetch('http://localhost:5000/api/projects/getprojects', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setProjects(data.projects));

    // Fetch the timesheets data
    fetch('http://localhost:5000/api/timesheets/getTimesheet', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setTimesheets(data.timesheets));
  }, []);

  // Process the timesheets data to calculate total time per project
  const projectTimes = projects.map(project => {
    const totalTime = timesheets
      .filter(timesheet => timesheet.project === project._id)
      .reduce((acc, timesheet) => acc + timesheet.timerValue, 0);

    return {
      name: project.name,
      totalTime: totalTime / 3600, // Convert to hours
      timesheetData: timesheets.filter(timesheet => timesheet.project === project._id),
    };
  });

  // Prepare data for Bar chart (Total time spent per project)
  const barChartData = {
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

  // Prepare data for Line chart (Time spent per project over time)
  const lineChartData = {
    labels: projectTimes[0]?.timesheetData.map((ts: any) => new Date(ts.createdAt).toLocaleString()) || [],
    datasets: projectTimes.map((project, idx) => ({
      label: project.name,
      data: project.timesheetData.map(ts => ts.timerValue / 3600), // Convert time to hours
      fill: false,
      borderColor: `rgba(${75 + idx * 10}, 192, 192, 1)`,
      tension: 0.1,
    })),
  };


  return (
    <div>
      <h2>Time Tracker Charts</h2>

      <div style={{  marginBottom: '40px' }}>
        <h3>Bar Chart - Total Time per Project</h3>
        <Bar data={barChartData} />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3>Line Chart - Time Spent Over Time</h3>
        <Line data={lineChartData} />
      </div>

      
    </div>
  );
};

export default PieTimeTrackerChart;
