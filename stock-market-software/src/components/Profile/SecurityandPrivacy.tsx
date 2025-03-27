import React from "react";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";

const SecurityandPrivacy = () => {
  const label = { inputProps: { "aria-label": "Size switch demo" } };

  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "#65C466",
          opacity: 1,
          border: 0,
          ...theme.applyStyles("dark", {
            backgroundColor: "#2ECA45",
          }),
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.grey[100],
        ...theme.applyStyles("dark", {
          color: theme.palette.grey[600],
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.7,
        ...theme.applyStyles("dark", {
          opacity: 0.3,
        }),
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: "#B0B0B0", // Darker grey when switch is off
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
      ...theme.applyStyles("dark", {
        backgroundColor: "#2C2C2E", // Darker grey in dark mode
      }),
    },
  }));

  return (
    <div className="personal-info-page">
      <h1 className="personal-info-title">Security and Privacy</h1>

      <div className="info-section">
        <label>Password</label>
        <div className="info-content">
          <h3>Change Password</h3>
          <button className="edit-button">{">"}</button>
        </div>
      </div>

      <div className="info-section">
        <label>Permissions</label>
        <div className="info-content">
          <h3>Allow Location Sharing</h3>
          <IOSSwitch />
        </div>
      </div>

      <div className="info-section">
        <label>Authentication</label>
        <div className="info-content">
          <h3>Enable Two-Factor Authentication</h3>
          <IOSSwitch />
        </div>
      </div>

      <div className="info-section">
        <label>Data Privacy</label>
        <div className="info-content">
          <h3>Allow Data Sharing</h3>
          <IOSSwitch />
        </div>
      </div>

      <button className="save-button">Save Changes</button>
    </div>
  );
};

export default SecurityandPrivacy;
