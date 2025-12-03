import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsers() {
  const [users,setUsers] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8080/users") 
      .then(res=>setUsers(res.data))
      .catch(()=>alert("Unable to load users"));
  },[]);

  return (
    <div className="page">
      <h1 className="page-title">Admin Panel – Users</h1>
      <p className="page-subtitle">Full system user list view.</p>

      <div className="card-grid" style={{marginTop:'1rem'}}>
        {users.map(u=>(
          <div className="card" key={u.id}>
            <h3>{u.name}</h3>
            <p className="muted">{u.email}</p>
            <span className="badge-link">{u.role}</span>
          </div>
        ))}

        {users.length===0 && <p className="muted">No users found</p>}
      </div>
    </div>
  );
}
