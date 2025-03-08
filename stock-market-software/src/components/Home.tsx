import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styling/Home.css";
import Investment from "./Investment";
import Watchlist from "./Watchlist";

const Home: React.FC = () => {
  const investment = new Investment(
    1000, // Initial amount (YTD)
    1100, // 1-day ago amount
    1050, // 1-week ago amount
    950, // 1-month ago amount
    900, // 3-month ago amount
    800, // 1-year ago amount
    1150 // Current amount
  );

  // Available time periods
  const timePeriods = [
    { label: "1 Day", key: "1D" },
    { label: "1 Week", key: "1W" },
    { label: "1 Month", key: "1M" },
    { label: "3 Months", key: "3M" },
    { label: "1 Year", key: "1Y" },
    { label: "Year to Date", key: "YTD" },
  ];

  // State to track selected timeframe
  const [selectedPeriod, setSelectedPeriod] = useState<
    "1D" | "1W" | "1M" | "3M" | "1Y" | "YTD"
  >("1D");

  // State to toggle between percent and amount increase
  const [showPercent, setShowPercent] = useState(true);

  // Generate dynamic X-axis data based on selected period
  const getChartData = () => {
    switch (selectedPeriod) {
      case "1D":
        return [
          { time: "9:30 AM", value: investment.getIncrease("1D") * 0.2 },
          { time: "11:00 AM", value: investment.getIncrease("1D") * 0.4 },
          { time: "1:00 PM", value: investment.getIncrease("1D") * 0.6 },
          { time: "3:00 PM", value: investment.getIncrease("1D") * 0.8 },
          { time: "4:00 PM", value: investment.getIncrease("1D") },
        ];
      case "1W":
        return [
          { time: "Mon", value: investment.getIncrease("1W") * 0.2 },
          { time: "Tue", value: investment.getIncrease("1W") * 0.4 },
          { time: "Wed", value: investment.getIncrease("1W") * 0.6 },
          { time: "Thu", value: investment.getIncrease("1W") * 0.8 },
          { time: "Fri", value: investment.getIncrease("1W") },
        ];
      case "1M":
        return [
          { time: "Week 1", value: investment.getIncrease("1M") * 0.25 },
          { time: "Week 2", value: investment.getIncrease("1M") * 0.5 },
          { time: "Week 3", value: investment.getIncrease("1M") * 0.75 },
          { time: "Week 4", value: investment.getIncrease("1M") },
        ];
      case "3M":
        return [
          { time: "Month 1", value: investment.getIncrease("3M") * 0.33 },
          { time: "Month 2", value: investment.getIncrease("3M") * 0.66 },
          { time: "Month 3", value: investment.getIncrease("3M") },
        ];
      case "1Y":
        return [
          { time: "Q1", value: investment.getIncrease("1Y") * 0.25 },
          { time: "Q2", value: investment.getIncrease("1Y") * 0.5 },
          { time: "Q3", value: investment.getIncrease("1Y") * 0.75 },
          { time: "Q4", value: investment.getIncrease("1Y") },
        ];
      case "YTD":
        return [
          { time: "Jan", value: investment.getIncrease("YTD") * 0.1 },
          { time: "Apr", value: investment.getIncrease("YTD") * 0.3 },
          { time: "Jul", value: investment.getIncrease("YTD") * 0.6 },
          { time: "Oct", value: investment.getIncrease("YTD") },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="home-page">
      <h1>Portfolio</h1>
      <h2>${investment.getCurrentAmount().toFixed(2)}</h2>

      {/* Display either percent increase or amount increase based on state */}
      <h3 className={investment.getClassName(selectedPeriod)}>
        ( {investment.getSymbol(selectedPeriod)}{" "}
        {`${investment.getPercentIncrease(selectedPeriod).toFixed(2)}% `}){" "}
        {`$${investment.getIncrease(selectedPeriod).toFixed(2)}`}
      </h3>

      <div className="pnl-and-watchlist">
        {/* PNL Chart */}
        <div className="pnl-section">
          <div className="chart-wrapper">
            {" "}
            {/* New wrapper */}
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getChartData()}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={
                      investment.getIncrease(selectedPeriod) >= 0
                        ? "green"
                        : "red"
                    }
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="watchlist-container">
          <h1 className="watchlist-title">Watchlist</h1>
          <ul id="stockList">
            <li>AAPL - Apple Inc. - $180.00</li>
            <li>MSFT - Microsoft Corp. - $320.50</li>
            <li>AMZN - Amazon.com Inc. - $115.25</li>
          </ul>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="buttons-container">
        {/* Timeframe Selection */}
        <div className="timeframe-buttons">
          {timePeriods.map(({ label, key }) => (
            <button
              key={key}
              className={selectedPeriod === key ? "active" : ""}
              onClick={() =>
                setSelectedPeriod(
                  key as "1D" | "1W" | "1M" | "3M" | "1Y" | "YTD"
                )
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
