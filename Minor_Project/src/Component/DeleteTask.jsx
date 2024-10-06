import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const DeleteTask = () => {
    const [deleteId, setDeleteId] = useState('');
    let navigate=useNavigate();

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/tasks/delete?id=${deleteId}`);
            setDeleteId('');
            toast.success(`Task Deleted successfully`);
            setTimeout(() => {
              navigate("/admin");
            }, 2000);  

            
        } catch (error) {
            console.error('There was an error deleting the task!', error);
            toast.error('Error deleting task. Please try again.');
        }
    };

    return (
        <div className="delete-task-container">
            <h2 className="delete-task-heading">Delete Task</h2>
            <input
                type="number"
                value={deleteId}
                onChange={(e) => setDeleteId(e.target.value)}
                placeholder="Enter Task ID to delete"
                required
                className="delete-task-input"
            />
            <button onClick={handleDelete} className="delete-task-button">Delete Task</button>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
};

export default DeleteTask;
