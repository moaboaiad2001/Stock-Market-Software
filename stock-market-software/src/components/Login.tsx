import React, { useState } from "react";
import "../styling/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showHelpOptions, setShowHelpOptions] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with", { email, password });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
