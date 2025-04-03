import React, { useState } from "react";
import "../styling/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showHelpOptions, setShowHelpOptions] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    console.log("Logging in with", { username, password });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
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
          <Link to="/sign-up">
            <button type="submit" className="login-button">
              Login
            </button>
          </Link>
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
