import React, { useState, useEffect, useContext } from "react";
import Select, { components } from "react-select";
import { NetworkManagerTrial } from "../NetworkManagerTrial";
import "../styling/Home.css";
import { Link } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { FaCheck, FaPlus } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { LightModeContext } from "../utils/LightModeContext";
import LightSwitch from "../utils/LightSwitch";
import { NetworkManager } from "./NetworkManager";

interface StockOption {
  value: string;
  label: string;
  price: number;
  change: number;
  logo_url?: string;
}

interface NavbarProps {
  watchlist: StockOption[];
  toggleWatchlist: (stock: StockOption) => void;
}

const Navbar: React.FC<NavbarProps> = ({ watchlist, toggleWatchlist }) => {
  const { t } = useTranslation();
  const [stockOptions, setStockOptions] = useState<StockOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const networkManager = new NetworkManager();
  const lightModeContext = useContext(LightModeContext);
  const lightMode = lightModeContext?.lightMode || "light"; // Ensures no undefined values
  useEffect(() => {
    const fetchStocks = async () => {
      setIsLoading(true);
      try {
        const symbols = ["AMZN"];
        const stocksWithDetails = await Promise.all(
          symbols.map(async (ticker) => {
            const stocks = await networkManager.fetchStockSymbols(ticker); // returns an array
            return stocks.map((stock) => ({
              value: stock.symbol,
              label: stock.name,
              price: stock.price,
              change: stock.percentChange,
              logo_url: stock.logo_url,
            }));
          })
        );

        // Flatten the array of arrays and filter out nulls
        const flattened = stocksWithDetails
          .flat()
          .filter(Boolean) as StockOption[];
        setStockOptions(flattened);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setStockOptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const CustomOption = (props: any) => {
    const { data, innerRef, innerProps } = props;
    const isWatched = watchlist.some((s) => s.value === data.value);

    return (
      <div ref={innerRef} {...innerProps} className="stock-option">
        <div className="stock-info">
          {data.logo_url ? (
            <img
              src={data.logo_url}
              alt={`${data.label} logo`}
              className="stock-logo"
            />
          ) : (
            <div className="stock-placeholder-logo">N/A</div>
          )}
          <div className="stock-symbol">{data.value}</div>
          <div className="stock-ticker">
            <span className="company-name">{data.label}</span>
          </div>
        </div>
        <div className="stock-price">
          <span className="price">${data.price.toFixed(2)}</span>
          <span
            className={`percent-change ${
              data.change >= 0 ? "positive" : "negative"
            }`}
          >
            {data.change.toFixed(2)}%
          </span>
        </div>
        <button
          className="add-to-watchlist-button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWatchlist(data);
          }}
        >
          {isWatched ? <FaCheck /> : <FaPlus />}
        </button>
      </div>
    );
  };

  return (
    <nav
      className={
        lightMode === "dark" ? "navbar navbar-dark" : "navbar navbar-light"
      }
    >
      <Link to="/login" className="navbar-logo">
        {t("forsa")}
      </Link>
      <div className="navbar-actions">
        <Select
          className="navbar-search search-dropdown"
          styles={{ control: (provided) => ({ ...provided, width: "600px" }) }}
          options={stockOptions}
          isLoading={isLoading}
          isClearable
          components={{ Option: CustomOption }}
        />
      </div>
      <div className="navbar-links">
        <Link to="/">{t("home")}</Link>
        <Link to="/portfolio">{t("portfolio")}</Link>
        <Link to="/markets">{t("markets")}</Link>
        <Link to="/news">{t("news")}</Link>
        <LightSwitch />
        <Link to="/profile" className="navbar-profile">
          <IoPerson />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
