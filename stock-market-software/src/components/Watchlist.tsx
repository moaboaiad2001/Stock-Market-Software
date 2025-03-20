import React, { useState, useRef, useEffect } from "react";
import { StockOption } from "../types";
import { LuListFilter } from "react-icons/lu";
import "../styling/Home.css";

interface WatchlistProps {
  watchlist: StockOption[];
}

const Watchlist: React.FC<WatchlistProps> = ({ watchlist = [] }) => {
  const watchlistFilter = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="stocklist-container">
      <div className="watchlist-dropdown" ref={dropdownRef}>
        <button className="watchlist-icon" onClick={toggleDropdown}>
          <LuListFilter />
        </button>
        {isDropdownOpen && (
          <ul className="dropdown-menu show">
            {watchlistFilter.map((option, index) => (
              <li key={index} className="dropdown-item">
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
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
