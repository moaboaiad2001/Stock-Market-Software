import React, { useState, useEffect } from "react";
import Select from "react-select";
import { NetworkManager } from "./NetworkManager";
import "../styling/Home.css";
import { Link } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

interface StockOption {
  value: string;
  label: string;
  price: number;
  change: number;
}

interface NavbarProps {
  watchlist: StockOption[]; // Add watchlist as a prop
  toggleWatchlist: (stock: StockOption) => void; // Add toggleWatchlist as a prop
}

const Navbar: React.FC<NavbarProps> = ({ watchlist, toggleWatchlist }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stockOptions, setStockOptions] = useState<StockOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const networkManager = new NetworkManager();

  useEffect(() => {
    if (!searchTerm) {
      setStockOptions([]);
      return;
    }

    const fetchStocks = async () => {
      setIsLoading(true);
      try {
        const stocks = await networkManager.fetchStockSymbols(searchTerm);
        setStockOptions(
          stocks.map((stock) => ({
            value: stock.symbol,
            label: `${stock.name} (${stock.symbol})`,
            price: stock.price,
            change: stock.percentChange,
          }))
        );
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchStocks, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const CustomOption = (props: any) => {
    const { data, innerRef, innerProps } = props;
    const isWatched = watchlist.some((s) => s.value === data.value); // Using the passed watchlist prop

    return (
      <div ref={innerRef} {...innerProps} className="stock-option">
        <div className="stock-details">
          <span>
            <strong>{data.label}</strong> - ${data.price.toFixed(2)}
          </span>
          <span className={data.change >= 0 ? "positive" : "negative"}>
            ({data.change.toFixed(2)}%)
          </span>
        </div>
        <button
          className="add-to-watchlist-button"
          onClick={(e) => {
            e.stopPropagation(); // Prevent stock selection when clicking button
            toggleWatchlist(data); // Call toggleWatchlist here
          }}
        >
          {isWatched ? <FaCheck /> : <FaPlus />}
        </button>
      </div>
    );
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Forsa</div>
      <div className="navbar-actions">
        <Select
          className="navbar-search search-dropdown"
          styles={{ control: (provided) => ({ ...provided, width: "600px" }) }}
          options={stockOptions}
          onInputChange={(inputValue) => setSearchTerm(inputValue)}
          placeholder="Search Stocks"
          isLoading={isLoading}
          isClearable
          components={{ Option: CustomOption }}
        />
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/portfolio">Portfolio</Link>{" "}
        {/* ✅ Corrected Portfolio Link */}
        <Link to="/markets">Markets</Link>
        <Link to="/news">News</Link>
        <Link to="/profile" className="navbar-profile">
          <IoPerson />
        </Link>{" "}
        {/* ✅ Corrected Profile Link */}
      </div>
    </nav>
  );
};

export default Navbar;
