import React, { useState, useEffect } from "react";
import Select from "react-select";
import { NetworkManager } from "./NetworkManager";
import "../styling/Home.css";
import { Link } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { FaCheck, FaPlus } from "react-icons/fa";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();
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

    const toggleLanguage = () => {
      const newLang = i18n.language === "en" ? "ar" : "en";
      console.log(`Switching language to ${newLang}`); // Debugging line
      i18n.changeLanguage(newLang);
      localStorage.setItem("language", newLang); // Save to localStorage
    };

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
      <div className="navbar-logo">{t("forsa")}</div>
      <div className="navbar-actions">
        <Select
          className="navbar-search search-dropdown"
          styles={{ control: (provided) => ({ ...provided, width: "600px" }) }}
          options={stockOptions}
          onInputChange={(inputValue) => setSearchTerm(inputValue)}
          placeholder={t("searchStocks")}
          isLoading={isLoading}
          isClearable
          components={{ Option: CustomOption }}
        />
      </div>
      <div className="navbar-links">
        <Link to="/">{t("home")}</Link>
        <Link to="/portfolio">{t("portfolio")}</Link>{" "}
        <Link to="/markets">{t("markets")}</Link>
        <Link to="/news">{t("news")}</Link>
        <Link to="/profile" className="navbar-profile">
          <IoPerson />
        </Link>{" "}
      </div>
    </nav>
  );
};

export default Navbar;
