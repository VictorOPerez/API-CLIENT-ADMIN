import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthConstext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthConstext);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">lamabooking</span>
        </Link>
        {user ? (
          user.username
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button onClick={() => navigate("/login")} className="navButton">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
