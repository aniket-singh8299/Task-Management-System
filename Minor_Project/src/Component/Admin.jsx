import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteTask from "./DeleteTask";

const Admin = () => {
    let navigate=useNavigate();
  let [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  let[card,setCard]=useState();

  const handleLogin= async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/users");
      console.log("Data Fetched Successfully", data);
      let userDetails = data.data;
      setUserDetails(userDetails);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Login failed");
      } else {
        setError("Network error or server not reachable");
      }
    }
  };
  let handleUpdate = async (ele,id) => {
    navigate(`/update/${id}`,{state:ele}) 

  };

  let handleTask=async (ele,id)=>{
    navigate(`/addtask/${id}`,{state:ele});
}

let handleDelete = (id) => {
  navigate(`/delete/${id}`, { state: { id } }); 
};

  useEffect(()=>{
    if(card!== undefined)
    handleLogin()
  },[card])
  return (
    <section className="Adminpage">
    <div>
        <h1>Welcome to Admin Page!</h1>
    </div>
    <button className="admin" onClick={handleLogin}>View All Users</button>
    {/* <DeleteTask handleDelete={handleDelete} /> Use the DeleteTask component */}
    <div className="userDetails">
        {userDetails.map((ele) => {
            return (
                <div key={ele.id} className="userCard">
                    <h2>Id: {ele.id}</h2>
                    <h2>Name: {ele.name}</h2>
                    <h2>Email: {ele.email}</h2>
                    <h2> Role: {ele.role}</h2>
                    <button onClick={() => { handleUpdate(ele, ele.id) }}>Update</button>
                    <button onClick={() => { handleDelete(ele.id) }}>Delete</button>
                    <button onClick={() => { handleTask(ele, ele.id) }}>Assign Task</button>
                </div>
            );
        })}
    </div>
</section>
  );
};

export default Admin;
