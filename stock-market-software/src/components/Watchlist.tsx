import React from "react";
import { StockOption } from "../types"; // Import StockOption

interface WatchlistProps {
  watchlist: StockOption[];
}

const Watchlist: React.FC<WatchlistProps> = ({ watchlist = [] }) => {
  return (
    <div>
      <ul id="stockList">
        {watchlist.length > 0 ? (
          watchlist.map((stock) => (
            <li key={stock.value}>
              {stock.label} - ${stock.price.toFixed(2)} (
              {stock.change.toFixed(2)}%)
            </li>
          ))
        ) : (
          <p>No stocks in your watchlist</p>
        )}
      </ul>
    </div>
  );
};

export default Watchlist;
