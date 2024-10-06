import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DeleteTask = () => {
    const [deleteId, setDeleteId] = useState('');

    const handleDelete = async () => {
        try {
            let de=await axios.delete(`http://localhost:8080/tasks/delete?id=${deleteId}`);
            toast.success('Task deleted successfully');
            console.log(de)
            setDeleteId(''); 
        } catch (error) {
            console.error('Error deleting task:', error);
            toast.error('Error deleting task.');
        }
        
    };

    return (
        <div className="form-container">
            <h2>Delete Task</h2>
            <input
                type="number"
                value={deleteId}
                onChange={(e) => setDeleteId(e.target.value)}
                placeholder="Enter Task ID to delete"
                required
            />
            <button onClick={handleDelete}>Delete Task</button>
        </div>
    );
};

export default DeleteTask;
