import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const TaskAddU = () => {
  let navigate = useNavigate();
  let { id } = useParams();  
  let { state } = useLocation();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    date: '',
    priority: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(`http://localhost:8080/tasks/savetask/${id}`, formData);
      console.log('Task assigned successfully:', response.data);
      toast.success(`Task assigned successfully to ${id}`);
      setTimeout(() => {
        navigate("/user");
      }, 2000);
    } catch (error) {
      console.error('Error assigning task:', error);
      setError('Failed to assign task. Please try again.');
      toast.error(`Failed to  assign task. Please try again.`);

    }
  };

  return (
    <section className="task-add-section">
      <form className="task-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Assign Task to User {id}</h2>  
        {error && <p className="error-text">{error}</p>}
        <div className="form-group">
          <label htmlFor="title" className="label">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="label">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="status" className="label">Status:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select status</option>
            <option value="PENDING">Pending</option>
            <option value="IN PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="date" className="label">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="priority" className="label">Priority:</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <button type="submit" className="form-submit-button">Submit</button>  
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </section>
  );
};

export default TaskAddU;
