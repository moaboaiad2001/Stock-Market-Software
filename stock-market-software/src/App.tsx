import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { StockOption } from "./types"; // Import StockOption
import "./styling/Home.css";

const App: React.FC = () => {
  const [watchlist, setWatchlist] = useState<StockOption[]>([]);

  const toggleWatchlist = (stock: StockOption) => {
    setWatchlist((prev) => {
      const isAlreadyInWatchlist = prev.some((s) => s.value === stock.value);
      if (isAlreadyInWatchlist) {
        return prev.filter((s) => s.value !== stock.value);
      } else {
        return [...prev, stock];
      }
    });
  };

  return (
    <>
      <Navbar watchlist={watchlist} toggleWatchlist={toggleWatchlist} />
      <Home watchlist={watchlist} toggleWatchlist={toggleWatchlist} />
    </>
  );
};

export default App;
