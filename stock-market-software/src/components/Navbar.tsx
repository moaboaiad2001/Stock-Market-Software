import React, { useState, useEffect } from "react";
import Select from "react-select";
import { NetworkManager } from "./NetworkManager";

interface StockOption {
  value: string;
  label: string;
  price: number;
  change: number;
}

const Navbar: React.FC = () => {
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
            label: `${stock.symbol} - ${stock.name}`,
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

    const timeoutId = setTimeout(fetchStocks, 500); // Add a delay to prevent excessive API calls
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleInputChange = (inputValue: string) => {
    setSearchTerm(inputValue);
  };

  const formatOptionLabel = (stock: StockOption) => (
    <div className="stock-option">
      <div className="stock-details">
        <span>{stock.label}</span>
        <span className={stock.change >= 0 ? "positive" : "negative"}>
          ${stock.price.toFixed(2)} ({stock.change.toFixed(2)}%)
        </span>
      </div>
    </div>
  );

  return (
    <nav className="navbar">
      <div className="navbar-logo">Forsa</div>
      <div className="navbar-actions">
        <Select
          className="navbar-search search-dropdown"
          styles={{ control: (provided) => ({ ...provided, width: "600px" }) }}
          options={stockOptions}
          onInputChange={handleInputChange}
          formatOptionLabel={formatOptionLabel}
          placeholder="Search Stocks"
          isLoading={isLoading}
          isClearable
        />
      </div>
      <div className="navbar-links">
        <a href="#">Home</a>
        <a href="#">Portfolio</a>
        <a href="#">Markets</a>
        <a href="#">News</a>
        <a href="#" className="navbar-profile">
          👤
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
