import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profile from "./components/Profile/Profile";
import PersonalInformation from "./components/Profile/PersonalInformation";
import Tranfsers from "./components/Profile/Tranfsers";
import Rewards from "./components/Profile/Rewards";
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
        <Route
          path="/"
          element={
            <Home watchlist={watchlist} toggleWatchlist={toggleWatchlist} />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/personal-information" element={<PersonalInformation />} />
        <Route path="/transfers" element={<Tranfsers />} />
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
    </Router>
  );
};

export default App;
