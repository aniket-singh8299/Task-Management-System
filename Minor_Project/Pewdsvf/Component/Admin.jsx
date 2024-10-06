import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Admin = () => {
    const [task, setTask] = useState({
        status: '',
        description: '',
        due_date: '',
        priority: '',
        title: '',
    });
    const [taskId, setTaskId] = useState(''); 
    const [deleteId, setDeleteId] = useState(''); 
    const [showCard, setShowCard] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({
            ...task,
            [name]: value,
        });
    };
    const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:8080/app/getuser'); 
          setUsers(response.data);
          setShowCard(true); 
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Task Submitted:', task);
        
        const userId = document.getElementById("numberInput").value; // Get user ID from input
        try {
            const response = await axios.post(`http://localhost:8080/tasks/savetask/${userId}`, task);
            console.log('Task created:', response.data);
            toast.success('Task created successfully');
        } catch (error) {
            console.error('There was an error creating the task!', error);
            toast.error('Error creating task. Please try again.');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/tasks/delete?id=${deleteId}`);
            toast.success('Task deleted successfully');
            setDeleteId(''); // Clear the input after deletion
        } catch (error) {
            console.error('There was an error deleting the task!', error);
            toast.error('Error deleting task. Please try again.');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/tasks/update/${taskId}`, task);
            console.log('Task updated:', response.data);
            toast.success('Task updated successfully');
            setTaskId(''); // Clear the input after update
        } catch (error) {
            console.error('There was an error updating the task!', error);
            toast.error('Error updating task. Please try again.');
        }
    };

    return (
        <div className="form-container">
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
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
                    id="numberInput"
                    placeholder="Enter User ID"
                    required
                />
                <button type="submit">Submit Task</button>
            </form>

            <h2>Delete Task</h2>
            <input
                type="number"
                value={deleteId}
                onChange={(e) => setDeleteId(e.target.value)}
                placeholder="Enter Task ID to delete"
                required
            />
            <button onClick={handleDelete}>Delete Task</button>

            <h2>Update Task</h2>
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
}

export default Admin;
