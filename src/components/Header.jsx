import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./header.css";
import "../Styles/header.css";

export default function Header(){
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [menu, setMenu] = useState(false);

    const logout = () =>{
        localStorage.removeItem("user");
        navigate("/auth");
    };

    return(
        <header className="navBar">
            <div className="logo"> PlantCare Planner</div>

            <nav className={menu ? "nav-links active" : "nav-links"}>
                <Link to="/">Home</Link>

                {!user && <Link to="/auth">Login/Register</Link>}

                {user && <>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/plants">My Plants</Link>
                </>}

                {user && user.role==="ADMIN" && <Link to="/admin">Admin Panel</Link>}

                {user && <a onClick={logout} style={{cursor:"pointer"}}>Logout</a>}
            </nav>

            <div className="hamburger" onClick={() => setMenu(!menu)}>
  <span></span>
  <span></span>
  <span></span>
</div>
        </header>
    );
}
