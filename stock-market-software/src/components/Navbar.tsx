import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { NetworkManager } from "./NetworkManager";
import "../styling/Home.css";
import { Link } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { FaCheck, FaPlus } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { LightModeContext } from "../utils/LightModeContext";
import LightSwitch from "../utils/LightSwitch";

interface StockOption {
  value: string;
  label: string;
  price: number;
  change: number;
  logoUrl?: string;
}

interface NavbarProps {
  watchlist: StockOption[];
  toggleWatchlist: (stock: StockOption) => void;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  watchlist,
  toggleWatchlist,
  toggleTheme,
}) => {
  const { t, i18n } = useTranslation();
  const [stockOptions, setStockOptions] = useState<StockOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const networkManager = new NetworkManager();
  const { lightMode } = useContext(LightModeContext) ?? {};

  useEffect(() => {
    const fetchStocks = async () => {
      setIsLoading(true);
      try {
        // Explicitly define only the stocks you want
        const symbols = ["AMZN", "MSFT", "GOOGL", "AAPL"]; // Amazon, Microsoft, Google
        const stocksWithDetails = await Promise.all(
          symbols.map(async (ticker) => {
            // Fetch data for each stock directly
            const stock = await networkManager.fetchStockSymbols(ticker);
            if (stock.length > 0) {
              const logo = stock[0]?.logo_url ?? ""; // Assuming the first element is the correct one
              return {
                value: stock[0]?.symbol || ticker,
                label: stock[0]?.name ?? ticker,
                price: stock[0]?.price ?? 0,
                change: stock[0]?.percentChange || 0,
                logoUrl: logo,
              };
            }
            return null; // If no stock data, return null
          })
        );

        // Filter out any null results (in case no data was returned for a ticker)
        setStockOptions(stocksWithDetails.filter((stock) => stock !== null));
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setStockOptions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStocks();
  }, []); // No need to re-fetch unless dependencies change

  const CustomOption = (props: any) => {
    const { data, innerRef, innerProps } = props;
    const isWatched = watchlist.some((s) => s.value === data.value);

    return (
      <div ref={innerRef} {...innerProps} className="stock-option">
        <div className="stock-info">
          {data.logoUrl ? (
            <img
              src={data.logoUrl}
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
      <LightSwitch />
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
        <Link to="/profile" className="navbar-profile">
          <IoPerson />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
