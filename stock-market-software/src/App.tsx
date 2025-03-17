import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profile from "./components/Profile/Profile";
import { StockOption } from "./types"; // Import StockOption

const App: React.FC = () => {
  const [watchlist, setWatchlist] = useState<StockOption[]>([]);

  const toggleWatchlist = (stock: StockOption) => {
    setWatchlist((prev) => {
      const isAlreadyInWatchlist = prev.some((s) => s.value === stock.value);
      return isAlreadyInWatchlist
        ? prev.filter((s) => s.value !== stock.value)
        : [...prev, stock];
    });
  };

  return (
    <Router>
      <Navbar watchlist={watchlist} toggleWatchlist={toggleWatchlist} />
      <Routes>
        {/* Set Home as the default page using index */}
        <Route
          path="/"
          element={
            <Home watchlist={watchlist} toggleWatchlist={toggleWatchlist} />
          }
        />
        <Route path="/profile" element={<Profile />} />
        {/*<Route path="/portfolio" element={<Portfolio />} />*/}
      </Routes>
    </Router>
  );
};

export default App;
