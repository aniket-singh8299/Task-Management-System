import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateTask = () => {
    const [taskId, setTaskId] = useState('');
    const [task, setTask] = useState({
        status: '',
        description: '',
        due_date: '',
        priority: '',
        title: '',
    });

    let navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({
            ...task,
            [name]: value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/tasks/update/${taskId}`, task);
            console.log('Task updated:', response.data);
            toast.success('Task updated successfully');
            setTaskId(''); 
            setTask({ status: '', description: '', due_date: '', priority: '', title: '' }); 

            // Navigate to the User page after successful update
            navigate('/user', { state: { updatedTask: response.data } });
        } catch (error) {
            console.error('There was an error updating the task!', error);
            toast.error('Error updating task. Please try again.');
        }
    };

    return (
        <div className="update-task-container">
            <h2>Update Task {taskId}</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="number"
                    value={taskId}
                    onChange={(e) => setTaskId(e.target.value)}
                    placeholder="Enter Task ID to update"
                    required
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Updated Title"
                    value={task.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="status"
                    placeholder="Updated Status"
                    value={task.status}
                    onChange={handleChange}
                    required
                    
                />
                <textarea
                    name="description"
                    placeholder="Updated Description"
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
                    placeholder="Updated Priority"
                    value={task.priority}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Update Task</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default UpdateTask;