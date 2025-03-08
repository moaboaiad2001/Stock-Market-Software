import React, { useState } from "react";
import Select from "react-select";
import { NetworkManager } from "./NetworkManager";

interface StockOption {
  value: string;
  label: string;
  name: string;
  price: number;
  percentChange: number;
}

const Navbar: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<StockOption | null>(
    null
  );
  const [stockOptions, setStockOptions] = useState<StockOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const networkManager = new NetworkManager();

  const handleInputChange = async (inputValue: string) => {
    if (!inputValue) {
      setStockOptions([]);
      return;
    }
    setIsLoading(true);
    try {
      const results = await networkManager.fetchStockSymbols(inputValue);
      const formattedOptions = results.map((stock) => ({
        value: stock.symbol,
        label: `${stock.symbol} - ${stock.name} ($${stock.price.toFixed(2)})`,
        name: stock.name,
        price: stock.price,
        percentChange: stock.percentChange,
      }));
      setStockOptions(formattedOptions);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
    setIsLoading(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Forsa</div>
      <div className="navbar-actions">
        <Select
          className="navbar-search search-dropdown"
          styles={{ control: (provided) => ({ ...provided, width: "600px" }) }}
          value={selectedOption}
          onChange={setSelectedOption}
          onInputChange={handleInputChange}
          options={stockOptions}
          placeholder="Search Stocks"
          isLoading={isLoading}
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
