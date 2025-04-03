import React from "react";

interface ThemeToggleProps {
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ toggleTheme }) => {
  return <button onClick={toggleTheme}>Toggle Theme</button>;
};

export default ThemeToggle;
