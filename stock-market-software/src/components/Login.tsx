import React, { useState, useContext } from "react";
import "../styling/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/BackendClientAPI"; // adjust path if needed
import axios from "axios"; // Import axios
import { LightModeContext } from "../utils/LightModeContext";

const Login = () => {
  const [username, setUsername] = useState(""); // this is actually the email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showHelpOptions, setShowHelpOptions] = useState(false);
  const navigate = useNavigate();

  const lightModeContext = useContext(LightModeContext);
  const lightMode = lightModeContext?.lightMode || "light";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await login(username, password);
      console.log("Login success:", response);
      navigate("/"); // adjust to your actual route
    } catch (err) {
      const message =
        (err as Error).message || "Login failed. Please try again.";
      setError(message);
    }
  };

  return (
    <div
      className={`login-container ${
        lightMode === "dark"
          ? "login-container login-container-dark"
          : "login-container login-container-light"
      }`}
    >
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <button
          className="help-button"
          onClick={() => setShowHelpOptions(!showHelpOptions)}
        >
          I need help
        </button>
        {showHelpOptions && (
          <div className="help-options">
            <a href="#" className="help-link">
              Forgot Password?
            </a>
            <a href="#" className="help-link">
              Forgot Username?
            </a>
          </div>
        )}
        <p className="signup-text">
          Don't have an account?{" "}
          <Link to="/sign-up" className="signup-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
