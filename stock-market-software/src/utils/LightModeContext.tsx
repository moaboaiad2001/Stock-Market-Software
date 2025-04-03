import { createContext, useState, ReactNode } from "react";

// Define the context type
interface LightModeContextType {
  lightMode: any;
  setLightMode: React.Dispatch<React.SetStateAction<any>>;
  toggleLightMode: () => void;
}

// Create the context with a default value (which matches the type)
const LightModeContext = createContext<LightModeContextType | undefined>(
  undefined
);

function LightModeProvider({ children }: { children: ReactNode }) {
  const [lightMode, setLightMode] = useState<"dark" | "light">("dark");

  const toggleLightMode = () => {
    setLightMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <LightModeContext.Provider
      value={{ lightMode, setLightMode, toggleLightMode }}
    >
      {children}
    </LightModeContext.Provider>
  );
}

export { LightModeContext, LightModeProvider };
