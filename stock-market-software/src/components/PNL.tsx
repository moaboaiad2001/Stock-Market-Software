import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Investment from "./Investment";

interface PNLChartProps {
  investment: Investment;
  selectedPeriod: "1D" | "1W" | "1M" | "3M" | "1Y" | "YTD";
  onHover: (value: number | null) => void; // Add onHover prop
}

const PNLChart: React.FC<PNLChartProps> = ({
  investment,
  selectedPeriod,
  onHover,
}) => {
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
    <div className="chart-wrapper">
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={getChartData()}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip
              content={({ payload }) => {
                if (payload && payload.length > 0) {
                  // Safely access the value from payload
                  const hoveredValue = payload[0]?.value;
                  // Check if hoveredValue is a number and not NaN
                  if (
                    typeof hoveredValue === "number" &&
                    !isNaN(hoveredValue)
                  ) {
                    onHover(hoveredValue); // Pass the valid number to onHover
                  } else {
                    onHover(null); // If not a valid number, pass null
                  }
                  return <div>{payload[0]?.payload?.time}</div>; // Only show time in tooltip
                }
                onHover(null); // If payload is empty or invalid, set value to null
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={
                investment.getIncrease(selectedPeriod) >= 0 ? "green" : "red"
              }
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PNLChart;
