import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profile from "./components/Profile/Profile";
import PersonalInformation from "./components/Profile/PersonalInformation";
import Tranfsers from "./components/Profile/Tranfsers";
import Rewards from "./components/Profile/Rewards";
import NewsPage from "./components/NewsPage/NewsPage";
import { StockOption } from "./types";
import ReportsandStatements from "./components/Profile/ReportsandStatements";
import SecurityandPrivacy from "./components/Profile/SecurityandPrivacy";
import { I18nextProvider } from "react-i18next";
import i18n from "./utils/i18n";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { LightModeProvider, LightModeContext } from "./utils/LightModeContext";
import "./styling/App.css";

// Separate component to consume context
const AppContent: React.FC = () => {
  const { lightMode } = useContext(LightModeContext)!;
  const [watchlist, setWatchlist] = useState<StockOption[]>([]);

  const toggleWatchlist = (stock: StockOption) => {
    const isAlreadyInWatchlist = watchlist.some((s) => s.value === stock.value);
    setWatchlist((prev) =>
      isAlreadyInWatchlist
        ? prev.filter((s) => s.value !== stock.value)
        : [...prev, stock]
    );
  };

  return (
    <div className={`app-container ${lightMode}`}>
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
    </div>
  );
};

const App: React.FC = () => (
  <I18nextProvider i18n={i18n}>
    <LightModeProvider>
      <AppContent />
    </LightModeProvider>
  </I18nextProvider>
);

export default App;
