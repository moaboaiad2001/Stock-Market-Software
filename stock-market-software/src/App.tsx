import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profile from "./components/Profile/Profile";
import PersonalInformation from "./components/Profile/PersonalInformation";
import Tranfsers from "./components/Profile/Tranfsers";
import Rewards from "./components/Profile/Rewards";
import NewsPage from "./components/NewsPage/NewsPage";
import { StockOption } from "./types"; // Import StockOption
import ReportsandStatements from "./components/Profile/ReportsandStatements";
import SecurityandPrivacy from "./components/Profile/SecurityandPrivacy";
import { I18nextProvider } from "react-i18next";
import i18n from "./utils/i18n";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

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
    <I18nextProvider i18n={i18n}>
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
          <Route
            path="/personal-information"
            element={<PersonalInformation />}
          />
          <Route
            path="/reports-and-statements"
            element={<ReportsandStatements />}
          />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/transfers" element={<Tranfsers />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route
            path="/security-and-privacy"
            element={<SecurityandPrivacy />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
    </I18nextProvider>
  );
};

export default App;
