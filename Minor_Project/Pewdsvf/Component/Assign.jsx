import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Assign = () => {
    const [task, setTask] = useState({
        status: '',
        description: '',
        due_date: '',
        priority: '',
        title: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({
            ...task,
            [name]: value,
        });
    };

    const handleAssign = async (e) => {
        e.preventDefault();
        const userId = document.getElementById("userIdInput").value;
        try {
            const response = await axios.post(`http://localhost:8080/tasks/savetask/${userId}`, task);
            toast.success('Task assigned successfully');
        } catch (error) {
            console.error('Error assigning task:', error);
            toast.error('Error assigning task.');
        }
    };

    return (
        <div className="form-container">
            <h2>Assign Task</h2>
            <form onSubmit={handleAssign}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={task.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="status"
                    placeholder="Status"
                    value={task.status}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={task.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="due_date"
                    value={task.due_date}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="priority"
                    placeholder="Priority"
                    value={task.priority}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    id="userIdInput"
                    placeholder="Enter User ID"
                    required
                />
                <button type="submit">Assign Task</button>
            </form>
        </div>
    );
};

export default Assign;
