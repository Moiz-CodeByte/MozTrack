"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";


const TimesheetManager = () => {
  const [timesheets, setTimesheets] = useState([]);
  const [projects, setProjects] = useState([]);
  const [stopwatchValue, setStopwatchValue] = useState<number>(0);
  const [taskName, setTaskName] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [editTimers, setEditTimers] = useState({}); 
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [rawTimeInput, setRawTimeInput] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 16));
  const [editDates, setEditDates] = useState({});
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const TIMESHEET_API = `${apiUrl}/timesheets`;
  const PROJECTS_API = `${apiUrl}/projects/getprojects`;
  const [token, setToken] = useState("");

  // Safe access to localStorage (only in browser)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  const AUTH_HEADER = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  // Stopwatch logic
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setStopwatchValue((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Format seconds to HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Parse HH:MM:SS back to seconds
  const parseTime = (timeString: string) => {
    try {
      const parts = timeString.split(":");
      const hrs = parseInt(parts[0]) || 0;
      const mins = parseInt(parts[1]) || 0;
      const secs = parseInt(parts[2]) || 0;
      return hrs * 3600 + mins * 60 + secs;
    } catch (error) {
      console.error("Error parsing time:", error);
      return 0; // Return 0 seconds as fallback
    }
  };

  // Fetch projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get(PROJECTS_API, AUTH_HEADER);
      setProjects(response.data.projects || []);
    } catch (error) {
      console.log("Error fetching projects:", error);
      setErrorMessage("Failed to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch timesheets
  const fetchTimesheets = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${TIMESHEET_API}/getTimesheet`, AUTH_HEADER);
      setTimesheets(Array.isArray(response.data) ? response.data : response.data.timesheets || []);
    } catch (error) {
      console.log("Error fetching timesheets:", error);
      setErrorMessage("Failed to load timesheets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new timesheet entry
  const addTimesheet = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validate required fields
      if (!selectedProject) {
        setErrorMessage("Please select a project.");
        setLoading(false);
        return;
      }
      if (!taskName) {
        setErrorMessage("Please enter a task name.");
        setLoading(false);
        return;
      }

      // Validate date if provided
      let createdAtValue;
      try {
        const dateObj = new Date(selectedDate);
        if (isNaN(dateObj.getTime())) {
          setErrorMessage("Invalid date format. Please select a valid date.");
          setLoading(false);
          return;
        }
        createdAtValue = dateObj.toISOString();
      } catch (error) {
        console.error("Error processing date:", error);
        setErrorMessage("Invalid date format. Please select a valid date.");
        setLoading(false);
        return;
      }

      const payload = {
        project: selectedProject,
        name: taskName,
        timerValue: stopwatchValue,
        createdAt: createdAtValue,
      };

      const response = await axios.post(TIMESHEET_API, payload, AUTH_HEADER);
      console.log("Add timesheet response:", response.data);
      
      setSuccessMessage("Timesheet added successfully!");
      fetchTimesheets();
      resetForm(); // Reset form after successful submission
    } catch (error: any) {
      console.error("Error adding timesheet:", error);
      
      // Extract and display more specific error message if available
      const errorMsg = error.response?.data?.message || "Failed to add timesheet. Please try again.";
      setErrorMessage(errorMsg);
      
      // Clear error message after 5 seconds
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  // Reset form fields after submission
  const resetForm = () => {
    setTaskName("");
    setStopwatchValue(0);
    setIsRunning(false);
    setRawTimeInput("");
  };

  // Update a specific timesheet
  const updateTimesheet = async (id: string) => {
    setLoading(true);
    try {
      // Create update payload with proper typing
      const payload: { timerValue?: number; createdAt?: string } = {};
      
      // Add timer value to payload if it was edited
      if (editTimers[id]) {
        // Validate time format before parsing
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
        if (!timeRegex.test(editTimers[id])) {
          setErrorMessage("Invalid time format. Please use HH:MM:SS format (24-hour).");
          setLoading(false);
          return;
        }
        const timerValueInSeconds = parseTime(editTimers[id]); // Parse time from HH:MM:SS format
        payload.timerValue = timerValueInSeconds;
      }
      
      // Add date to payload if it was edited
      if (editDates[id]) {
        try {
          // Validate the date is valid
          const dateObj = new Date(editDates[id]);
          if (isNaN(dateObj.getTime())) {
            setErrorMessage("Invalid date format. Please select a valid date.");
            setLoading(false);
            return;
          }
          // Force the date to be exactly as entered without timezone adjustments
          payload.createdAt = dateObj.toISOString();
          console.log('Date being sent:', dateObj, 'ISO String:', payload.createdAt);
        } catch (error) {
          console.error("Error processing date:", error);
          setErrorMessage("Invalid date format. Please select a valid date.");
          setLoading(false);
          return;
        }
      }
      
      // Only proceed if there are changes to update
      if (Object.keys(payload).length === 0) {
        setErrorMessage("No changes to update.");
        setLoading(false);
        return;
      }
      
      console.log('Update payload:', payload);
      
      const response = await axios.put(
        `${TIMESHEET_API}/${id}`,
        payload,
        AUTH_HEADER
      );
      
      console.log("Update response:", response.data);
      
      // Clear the edit states for this timesheet
      setEditTimers(prev => {
        const newState = {...prev};
        delete newState[id];
        return newState;
      });
      
      setEditDates(prev => {
        const newState = {...prev};
        delete newState[id];
        return newState;
      });
      
      setSuccessMessage("Timesheet updated successfully!");
      fetchTimesheets();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error: any) {
      console.error("Error updating timesheet:", error);
      
      // Extract and display more specific error message if available
      const errorMsg = error.response?.data?.message || "Failed to update timesheet. Please try again.";
      setErrorMessage(errorMsg);
      
      // Clear error message after 5 seconds
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  // Delete a specific timesheet
  const deleteTimesheet = async (id: string) => {
    if (!confirm("Are you sure you want to delete this timesheet?")) {
      return;
    }
    
    setLoading(true);
    try {
      await axios.delete(`${TIMESHEET_API}/${id}`, AUTH_HEADER);
      setSuccessMessage("Timesheet deleted successfully!");
      fetchTimesheets();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting timesheet:", error);
      setErrorMessage("Failed to delete timesheet. Please try again.");
      
      // Clear error message after 3 seconds
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Handle manual time edits - updated to accept string for time format
  const handleEditTimerChange = (id: string, value: string) => {
    setEditTimers((prev) => ({ ...prev, [id]: value }));
  };
  
  // Handle date edits
  const handleEditDateChange = (id: string, value: string) => {
    setEditDates((prev) => ({ ...prev, [id]: value }));
  };
  
  // Removed clock toggle and clock edit functions as we're using 24-hour time selection only

  // Fetch data when token is available
  useEffect(() => {
    if (!token) {
      console.log("Authorization token not found. Please log in.");
      return;
    }
    fetchProjects();
    fetchTimesheets();
  }, [token]); // Re-run when token changes

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Timesheet Manager</h1>
      
      {/* Alert Messages */}
      {errorMessage && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {errorMessage}
          <button type="button" className="btn-close" onClick={() => setErrorMessage("")}></button>
        </div>
      )}
      
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {successMessage}
          <button type="button" className="btn-close" onClick={() => setSuccessMessage("")}></button>
        </div>
      )}
      
      {/* Loading Indicator */}
      {loading && (
        <div className="d-flex justify-content-center mb-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="row flex-column-reverse flex-md-row">
        {/* Add Timesheet Section */}
        <div className="col-md-12 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0 fs-5">Add New Timesheet</h3>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="projectSelect" className="form-label">Select Project</label>
                <select
                  id="projectSelect"
                  className="form-select"
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  required
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
                <label htmlFor="taskName" className="form-label">
                  Task Name
                </label>
                <input
                  id="taskName"
                  type="text"
                  className="form-control"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  required
                  placeholder="Enter task description"
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Time Spent (24-hour format)</label>
                <div className="row">
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      value={rawTimeInput || formatTime(stopwatchValue)}
                      onChange={(e) => {
                        const timeValue = e.target.value;
                        setRawTimeInput(timeValue);
                        
                        // Only convert to seconds if format is valid
                        if (/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(timeValue)) {
                          const seconds = parseTime(timeValue);
                          setStopwatchValue(seconds);
                        }
                      }}
                      placeholder="HH:MM:SS (e.g., 23:30:45)"
                    />
                    <small className="text-muted">Enter time in 24-hour format (HH:MM:SS). Hours can be 00-23.</small>
                  </div>
                </div>
                
                <div className="mt-2 d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setIsRunning(!isRunning);
                      if (!isRunning) {
                        setRawTimeInput(""); // Clear raw input when starting stopwatch
                      }
                    }}
                  >
                    {isRunning ? "Pause" : "Start"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setStopwatchValue(0);
                      setIsRunning(false);
                      setRawTimeInput(""); // Clear raw input when resetting
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="dateTime" className="form-label">Date and Time</label>
                <input
                  id="dateTime"
                  type="datetime-local"
                  className="form-control"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                <small className="text-muted">Current date and time is set by default</small>
              </div>
              
              <button 
                type="button"
                className="btn btn-success w-100 mt-3" 
                onClick={(e) => addTimesheet(e as React.FormEvent)}
                disabled={loading || !selectedProject || !taskName}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Adding...
                  </>
                ) : "Add Timesheet"}
              </button>
            </div>
          </div>
        </div>
        
        {/* Timesheet List Section */}
        <div className="col-md-12 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h3 className="mb-0 fs-5">Timesheet Entries</h3>
              <span className="badge bg-light text-dark">{timesheets.length} Entries</span>
            </div>
            <div className="card-body">
              {timesheets.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted">No timesheet entries found</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>Project</th>
                        <th>Task</th>
                        <th>Time</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timesheets.map((timesheet) => (
                        <tr key={timesheet._id}>
                          <td>{projects.find((p) => p._id === timesheet.project)?.name || "Unknown"}</td>
                          <td>{timesheet.name}</td>
                          <td>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={editTimers[timesheet._id] || formatTime(timesheet.timerValue)}
                              onChange={(e) => {
                                const timeValue = e.target.value;
                                // Allow typing by updating state regardless of format
                                handleEditTimerChange(timesheet._id, timeValue);
                                
                                // Only validate when needed, but don't block typing
                              }}
                              placeholder="HH:MM:SS"
                            />
                            <small className="text-muted d-block">24-hour format (00-23:MM:SS)</small>
                          </td>
                          <td>
                            <input
                              type="datetime-local"
                              className="form-control form-control-sm"
                              value={editDates[timesheet._id] || new Date(timesheet.createdAt).toISOString().slice(0, 16)}
                              onChange={(e) => handleEditDateChange(timesheet._id, e.target.value)}
                            />
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <button
                                className="btn btn-sm btn-success"
                                onClick={() => updateTimesheet(timesheet._id)}
                                disabled={loading || (!editTimers[timesheet._id] && !editDates[timesheet._id])}
                              >
                                <i className="bi bi-check"></i> Save
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteTimesheet(timesheet._id)}
                                disabled={loading}
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimesheetManager;
