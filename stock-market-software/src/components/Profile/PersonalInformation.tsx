import React from "react";
import "../../styling/Profile.css";

const PersonalInformation = () => {
  const personalInformantion = {
    name: "Mohamed Abo Aiad",
    email: "mostet2001@gmail.com",
    phone: "+1 (416)-700-2962",
    address: "2505, 360 Square One Drive",
  };

  return (
    <div className="personal-info-page">
      <h1 className="personal-info-title">Personal Information</h1>

      <div className="info-section">
        <label>Full Name</label>
        <div className="info-content">
          <h3>{personalInformantion.name}</h3>
        </div>
      </div>

      <div className="info-section">
        <label>Email Address</label>
        <div className="info-content">
          <h3>{personalInformantion.email}</h3>
          <button className="edit-button">Edit</button>
        </div>
      </div>

      <div className="info-section">
        <label>Phone Number</label>
        <div className="info-content">
          <h3>{personalInformantion.phone}</h3>
          <button className="edit-button">Edit</button>
        </div>
      </div>

      <div className="info-section">
        <label>Address</label>
        <div className="info-content">
          <h3>{personalInformantion.address}</h3>
          <button className="edit-button">Edit</button>
        </div>
      </div>

      <button className="save-button">Save Changes</button>
    </div>
  );
};

export default PersonalInformation;
