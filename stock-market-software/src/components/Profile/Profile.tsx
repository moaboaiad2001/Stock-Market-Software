import React from "react";
import "../../styling/Profile.css";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="profile-page">
      <h1 className="profile-title">Account</h1>
      <div className="profile-sections">
        <Link to="/personal-information" className="profile-link">
          <div className="profile-card">
            <span className="icon">💰</span>
            <h2>Personal Information</h2>
          </div>
        </Link>
        <Link to="/transfers" className="profile-link">
          <div className="profile-card">
            <span className="icon">🔒</span>
            <h2>Transfers</h2>
          </div>
        </Link>
        <div className="profile-card">
          <span className="icon">👤</span>
          <h2>Portfolio Overview</h2>
        </div>
        <div className="profile-card">
          <span className="icon">🔔</span>
          <h2>Transaction History</h2>
        </div>
        <div className="profile-card">
          <span className="icon">📊</span>
          <h2>Apply for Option Trading</h2>
        </div>
        <Link to="/rewards" className="profile-link">
          <div className="profile-card">
            <span className="icon">📊</span>
            <h2>Rewards</h2>
          </div>
        </Link>
        <div className="profile-card">
          <span className="icon">⚙️</span>
          <h2>Settings</h2>
        </div>
        <div className="profile-card">
          <span className="icon">🚪</span>
          <h2>Logout</h2>
        </div>
      </div>

      <div className="profile-sidebar">
        <h3>General Preferences</h3>
        <div className="sidebar-item">
          <span>Change language</span> <span>English ➝</span>
        </div>
        <div className="sidebar-item">
          <span>Max idle time</span> <span>15 minutes ➝</span>
        </div>

        <h3>How can we help?</h3>
        <div className="sidebar-item">
          <span>Help centre</span> <span>↗</span>
        </div>
        <div className="sidebar-item">
          <span>Live chat</span> <span>↗</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
