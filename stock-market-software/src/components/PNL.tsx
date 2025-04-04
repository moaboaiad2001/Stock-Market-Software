import React, { useContext } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Investment from "./Investment";
import "../styling/Home.css";
import { LightModeContext } from "../utils/LightModeContext";

interface PNLChartProps {
  investment: Investment;
  selectedPeriod: "Live" | "1D" | "1W" | "1M" | "3M" | "1Y" | "YTD"; // Include "Live"
  onHover: (value: number | null) => void;
}

const PNLChart: React.FC<PNLChartProps> = ({
  investment,
  selectedPeriod,
  onHover,
}) => {
  const getChartData = () => {
    switch (selectedPeriod) {
      case "Live":
        return [
          { time: "9:30 AM", value: investment.getIncrease("1D") * 0.2 },
          { time: "11:00 AM", value: investment.getIncrease("1D") * 0.4 },
          { time: "1:00 PM", value: investment.getIncrease("1D") * 0.6 },
          { time: "3:00 PM", value: investment.getIncrease("1D") * 0.8 },
          { time: "4:00 PM", value: investment.getIncrease("1D") },
        ];
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

  const getIncreaseForPeriod = (period: PNLChartProps["selectedPeriod"]) => {
    if (period === "Live") {
      return investment.getCurrentAmount(); // Or another fallback value
    }
    return investment.getIncrease(
      period as "1D" | "1W" | "1M" | "3M" | "1Y" | "YTD"
    );
  };

  // Define gradient based on whether the value is positive or negative
  const getGradientId = (value: number) => {
    return value >= 0 ? "greenGradient" : "redGradient";
  };

  const lightModeContext = useContext(LightModeContext);
  const lightMode = lightModeContext?.lightMode || "light";

  return (
    <div className="chart-wrapper">
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={getChartData()}>
            {/* Define both green and red vertical gradients */}
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="green" />
                <stop
                  offset="95%"
                  stopColor={lightMode === "light" ? "white" : "black"}
                />
              </linearGradient>
              <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="red" />
                <stop
                  offset="100%"
                  stopColor={lightMode === "dark" ? "white" : "black"}
                />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length > 0) {
                  const hoveredValue = payload[0]?.value;
                  if (
                    typeof hoveredValue === "number" &&
                    !isNaN(hoveredValue)
                  ) {
                    onHover(hoveredValue);
                  } else {
                    onHover(null);
                  }
                  return <div>{payload[0]?.payload?.time}</div>;
                }
                onHover(null);
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={
                getIncreaseForPeriod(selectedPeriod) >= 0
                  ? lightMode
                    ? "#00c853"
                    : "green" // Bright green for light mode
                  : lightMode
                  ? "#d50000"
                  : "red" // Bright red for light mode
              }
              fill={
                getIncreaseForPeriod(selectedPeriod) >= 0
                  ? "url(#greenGradient)"
                  : "url(#redGradient)"
              } // Conditional gradient based on value
              strokeWidth={2} // Increased stroke width for better visibility
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PNLChart;
