import React, { useContext } from "react";
import { LightModeContext } from "./LightModeContext";

const LightSwitch = () => {
  const context = useContext(LightModeContext);
  if (!context) {
    throw new Error("LightSwitch must be used within a LightModeProvider");
  }

  const { lightMode, toggleLightMode } = context;

  const handleClick = () => {
    toggleLightMode();
  };

  return (
    <div className="lightswitch">
      <img
        src={
          lightMode === "light"
            ? "/img/lightswitch-on.png"
            : "/img/lightswitch-off.png"
        }
        alt={`Lightswitch ${lightMode}`}
        onClick={handleClick}
      />
    </div>
  );
};

export default LightSwitch;
