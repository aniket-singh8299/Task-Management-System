import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import UpdateTask from './UpdateTask';
import DeleteTask from './DeleteTask';
import Assign from './Assign';
import { useNavigate } from 'react-router-dom';


const Admin1 = () => {
    let navigate=useNavigate();
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showAssign, setShowAssign] = useState(false);
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users');
            setUsers(response.data);
            toast.success('Users fetched successfully!');
            
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Error fetching users.');
        }
    };

    return (
        <div className="admin-container">
            <h1>Task Management System</h1>
            <div className="button-container">
                
                <button onClick={fetchUsers}>Fetch All Users</button>
                <button onClick={() => setShowUpdate(!showUpdate)}>Update Task</button>
                <button onClick={() => setShowDelete(!showDelete)}>Delete Task</button>
                <button onClick={() => setShowAssign(!showAssign)}>Assign Task</button>
            </div>

            {showUpdate && <UpdateTask/>}
            {showDelete && <DeleteTask />}
            {showAssign && <Assign/>}

            <ToastContainer />
        </div>
    );
};

export default Admin1;
