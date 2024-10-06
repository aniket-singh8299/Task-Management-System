import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const TaskAdd = () => {
    let navigate = useNavigate();
    let { id } = useParams();
    let { state } = useLocation();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: '',
        due_date: '',
        priority: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/tasks/savetask/${id}`, formData);
            console.log("Task assigned successfully:", response.data);
            toast.success(`Task assigned successfully to ${id}`);
            setTimeout(() => {
                navigate("/admin");
            }, 2000);  
        } catch (error) {
            console.error("Error Assigning task:", error);
            toast.error("Error Assigning task");
        }
    };

    return (
        <section className="task-add-section">
            <form className="task-form" onSubmit={handleSubmit}>
                <h2 className="form-title">Assign Task to {id}</h2>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-input"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="">Select status</option>
                        <option value="PENDING">Pending</option>
                        <option value="IN PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="due_date"
                        value={formData.due_date}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="priority">Priority:</label>
                    <select
                        id="priority"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="form-select"
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

export default TaskAdd;
