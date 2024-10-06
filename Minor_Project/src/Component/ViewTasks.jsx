import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewTasks = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { id } = location.state || {}; 
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/tasks/user/${id}`);
        setTasks(response.data); 
      } catch (error) {
        setError('Error fetching tasks.');
      }
    };

    fetchTasks();
  }, [id]);

  return (
    <section className="view-tasks">
      <h2 className="tasks-heading">Tasks Assigned to User ID: {id}</h2>
      {error && <p className="error">{error}</p>}
      {tasks.length > 0 ? (
        <ul className="tasks-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <div className="task-details">
                <h3>{task.title}</h3>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Due Date:</strong> {task.due_date}</p>
                <p><strong>Priority:</strong> {task.priority}</p>
                <p><strong>Status:</strong> {task.status}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found.</p>
      )}
      <button className="back-button" onClick={() => navigate(-1)}>Back to User Page</button>
    </section>
  );
};

export default ViewTasks;
