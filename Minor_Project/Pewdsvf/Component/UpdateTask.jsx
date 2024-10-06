import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateTask = () => {
    const [taskId, setTaskId] = useState('');
    const [task, setTask] = useState({
        status: '',
        description: '',
        due_date: '',
        priority: '',
        title: '',
    });
    const [loading, setLoading] = useState(false); // State for loading
    const [error, setError] = useState(''); // State for error messages

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({
            ...task,
            [name]: value,
        });
    };

    const fetchTask = async () => {
        if (!taskId) return; // Avoid fetching if taskId is empty
        try {
            const response = await axios.get(`http://localhost:8080/tasks/${taskId}`);
            setTask(response.data);
        } catch (error) {
            console.error('Error fetching task:', error);
            toast.error('Error fetching task. Please check the Task ID.');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        setError(''); // Reset any previous errors

        try {
            const response = await axios.put(`http://localhost:8080/tasks/update/${taskId}`, task);
            console.log('Task updated:', response.data);
            toast.success('Task updated successfully');
            setTaskId(''); // Clear the input after update
            setTask({ status: '', description: '', due_date: '', priority: '', title: '' }); // Reset task state
        } catch (error) {
            console.error('There was an error updating the task!', error);
            setError('Error updating task. Please try again.'); // Set error message
            toast.error('Error updating task. Please try again.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="form-container">
            <h2>Update Task</h2>
            <input
                type="number"
                value={taskId}
                onChange={(e) => setTaskId(e.target.value)}
                placeholder="Enter Task ID to fetch task"
                required
            />
            <button type="button" onClick={fetchTask}>Fetch Task</button> {/* Button to fetch task */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            <form onSubmit={handleUpdate}>
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Task'}
                </button> {/* Button text changes based on loading state */}
            </form>
        </div>
    );
};

export default UpdateTask;
