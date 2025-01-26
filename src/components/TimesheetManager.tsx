"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";


const TimesheetManager = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [projects, setProjects] = useState([]);
  const [stopwatchValue, setStopwatchValue] = useState(0); // Stopwatch in seconds
  const [selectedProject, setSelectedProject] = useState("");
  const [editTimers, setEditTimers] = useState({}); // Store updated time values for each timesheet
  const [isRunning, setIsRunning] = useState(false);

  const TIMESHEET_API = "http://localhost:5000/api/timesheets";
  const PROJECTS_API = "http://localhost:5000/api/projects/getprojects";
  const token = localStorage.getItem("token");

  const AUTH_HEADER = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  // Stopwatch logic
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setStopwatchValue((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Format time in HH:MM:SS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Parse HH:MM:SS back to seconds
  const parseTime = (timeString) => {
    const [hrs, mins, secs] = timeString.split(":").map(Number);
    return hrs * 3600 + mins * 60 + secs;
  };

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const response = await axios.get(PROJECTS_API, AUTH_HEADER);
      setProjects(response.data.projects || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Fetch timesheets
  const fetchTimesheets = async () => {
    try {
      const response = await axios.get(`${TIMESHEET_API}/getTimesheet`, AUTH_HEADER);
      setTimesheets(Array.isArray(response.data) ? response.data : response.data.timesheets || []);
    } catch (error) {
      console.error("Error fetching timesheets:", error);
    }
  };

  // Add a new timesheet entry
  const addTimesheet = async () => {
    if (!selectedProject) {
      alert("Please select a project.");
      return;
    }
    try {
      await axios.post(
        `${TIMESHEET_API}/add`,
        {
          projectId: selectedProject,
          timerValue: stopwatchValue,
        },
        AUTH_HEADER
      );
      setStopwatchValue(0); // Reset stopwatch
      fetchTimesheets();
    } catch (error) {
      console.error("Error adding timesheet:", error);
    }
  };

  // Update a specific timesheet
  const updateTimesheet = async (id) => {
    try {
      const timerValueInSeconds = parseTime(editTimers[id]); // Parse time from HH:MM:SS format
      await axios.put(
        `${TIMESHEET_API}/${id}`,
        { timerValue: timerValueInSeconds },
        AUTH_HEADER
      );
      fetchTimesheets();
    } catch (error) {
      console.error("Error updating timesheet:", error);
    }
  };

  // Delete a specific timesheet
  const deleteTimesheet = async (id) => {
    try {
      await axios.delete(`${TIMESHEET_API}/${id}`, AUTH_HEADER);
      fetchTimesheets();
    } catch (error) {
      console.error("Error deleting timesheet:", error);
    }
  };

  // Handle manual time edits
  const handleEditTimerChange = (id, value) => {
    setEditTimers((prev) => ({ ...prev, [id]: value }));
  };

  // Fetch data on component mount
  useEffect(() => {
    if (!token) {
      console.error("Authorization token not found. Please log in.");
      return;
    }
    fetchProjects();
    fetchTimesheets();
  }, [token]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Timesheet Manager</h1>

      {/* Add Timesheet Section */}
      <div className="card p-3 mb-4">
        <h2 className="mb-3">Add Timesheet</h2>
        <div className="mb-3">
          <label htmlFor="projectSelect" className="form-label">Select Project</label>
          <select
            id="projectSelect"
            className="form-select"
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Stopwatch</label>
          <input
            type="text"
            className="form-control"
            value={formatTime(stopwatchValue)}
            onChange={(e) => setStopwatchValue(parseTime(e.target.value))}
          />
          <div className="mt-2">
            <button
              className="btn btn-primary me-2"
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? "Pause" : "Start"}
            </button>
            <button className="btn btn-secondary" onClick={() => setStopwatchValue(0)}>
              Reset
            </button>
          </div>
        </div>
        <button className="btn btn-success mt-3" onClick={addTimesheet}>Add</button>
      </div>

      {/* Timesheet List Section */}
      <div className="card p-3">
        <h2 className="mb-3">Timesheet Entries</h2>
        <ul className="list-group">
          {timesheets.map((timesheet) => (
            <li key={timesheet._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <p><strong>Project Name:</strong> {projects.find((p) => p._id === timesheet.project)?.name || "Unknown"}</p>
                <p><strong>Timer Value:</strong></p>
                <input
                  type="text"
                  className="form-control"
                  value={editTimers[timesheet._id] || formatTime(timesheet.timerValue)}
                  onChange={(e) => handleEditTimerChange(timesheet._id, e.target.value)}
                />
                <p><strong>Created At:</strong> {new Date(timesheet.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <button
                  className="btn btn-success me-2"
                  onClick={() => updateTimesheet(timesheet._id)}
                  disabled={!editTimers[timesheet._id]}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTimesheet(timesheet._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimesheetManager;
