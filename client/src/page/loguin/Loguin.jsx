import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthConstext } from "../../context/AuthContext";
import "./loguin.css";

const Loguin = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthConstext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      console.log(credentials);
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lImupt"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lImupt"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Loguin
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Loguin;
