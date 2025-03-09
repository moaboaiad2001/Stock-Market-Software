import React, { useState, useEffect } from "react";
import { NetworkManager } from "./NetworkManager";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  percentChange: number;
}

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState<Stock[]>([]);
  const networkManager = new NetworkManager();

  // Add a specific stock to the watchlist (APPLE in this case)
  const addStockToWatchlist = async (symbol: string) => {
    const updatedWatchlist = await networkManager.fetchStockSymbols(symbol); // Fetch only Apple
    setWatchlist(updatedWatchlist); // Update the state with the fetched stock data
  };

  useEffect(() => {
    addStockToWatchlist("AAPL"); // Only fetch Apple stock data
  }, []); // Empty dependency array ensures this runs once after the component mounts

  return (
    <div className="watchlist-container">
      <h1 className="watchlist-title">Watchlist</h1>
      <ul id="stockList">
        {watchlist.map((stock) => (
          <li key={stock.symbol}>
            {stock.symbol} - {stock.name} - ${stock.price} (
            {stock.percentChange}%)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
