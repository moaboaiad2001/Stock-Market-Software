import React, { useEffect, useState } from "react";
import NetworkManager from "./NetworkManager";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

interface StockItem {
  symbol: string;
}

const StockList: React.FC<{ stocks: StockItem[] }> = ({ stocks }) => {
  const [stockData, setStockData] = useState<
    {
      symbol: string;
      name: string;
      logo: string;
      price: number;
      percentChange: number;
      history: number[];
    }[]
  >([]);

  useEffect(() => {
    const fetchStockData = async () => {
      const updatedStockData = await Promise.all(
        stocks.map(async (stock) => {
          try {
            const [stockInfo, history, companyInfo] = await Promise.all([
              NetworkManager.getStockData(stock.symbol),
              NetworkManager.getStockHistory(stock.symbol),
              NetworkManager.getCompanyInfo(stock.symbol),
            ]);

            return {
              symbol: stock.symbol,
              name: companyInfo.name,
              logo: companyInfo.logo,
              price: stockInfo.price,
              percentChange: stockInfo.percentChange,
              history: history.close,
            };
          } catch (error) {
            console.error(`Error fetching data for ${stock.symbol}`, error);
            return null;
          }
        })
      );

      setStockData(updatedStockData.filter((data) => data !== null) as any);
    };

    fetchStockData();
  }, [stocks]);

  return (
    <div className="stock-list">
      {stockData.map((stock) => (
        <div key={stock.symbol} className="stock-item">
          <img src={stock.logo} alt={stock.name} className="stock-logo" />
          <div className="stock-info">
            <h3>
              {stock.name} ({stock.symbol})
            </h3>
            <p>${stock.price.toFixed(2)}</p>
            <p className={stock.percentChange >= 0 ? "green" : "red"}>
              {stock.percentChange.toFixed(2)}%
            </p>
          </div>
          <div className="mini-graph">
            <Line
              data={{
                labels: stock.history.map((_, index) => index + 1),
                datasets: [
                  {
                    data: stock.history,
                    borderColor: stock.percentChange >= 0 ? "green" : "red",
                    fill: false,
                    tension: 0.3,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { x: { display: false }, y: { display: false } },
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StockList;
