import React, { useEffect, useState } from "react";
import { NetworkManager } from "./NetworkManager";
import { useTranslation } from "react-i18next";

const BiggestMovers = () => {
  const { t } = useTranslation();

  const [gainers, setGainers] = useState<
    { symbol: string; name: string; price: number; percentChange: number }[]
  >([]);
  const [losers, setLosers] = useState<
    { symbol: string; name: string; price: number; percentChange: number }[]
  >([]);

  const fetchMovers = async () => {
    const networkManager = new NetworkManager();
    const { gainers, losers } = await networkManager.fetchGainersAndLosers();
    setGainers(
      gainers.map((stock) => ({
        symbol: stock.symbol,
        name: stock.name, // ✅ Now includes stock name
        price: stock.price,
        percentChange: stock.percentChange,
      }))
    );
    setLosers(
      losers.map((stock) => ({
        symbol: stock.symbol,
        name: stock.name, // ✅ Now includes stock name
        price: stock.price,
        percentChange: stock.percentChange,
      }))
    );
  };

  useEffect(() => {
    fetchMovers();
  }, []);

  return (
    <div>
      <div className="movers-section">
        <div className="movers-container left">
          <h3 className="gainers-title">{t("topGainers")}</h3>
          {gainers.map((stock) => (
            <div className="movers-stock-container" key={stock.symbol}>
              <h3>
                {stock.name} ({stock.symbol})
              </h3>
              <h3 className="winners-change">
                ${stock.price.toFixed(2)} ({stock.percentChange.toFixed(2)}% ▲)
              </h3>
            </div>
          ))}
        </div>
        <div className="movers-container right">
          <h3 className="losers-title">{t("topLosers")}</h3>
          {losers.map((stock) => (
            <div className="movers-stock-container-losers" key={stock.symbol}>
              <h3>
                {stock.name} ({stock.symbol})
              </h3>
              <h3 className="losers-change">
                ${stock.price.toFixed(2)} ({stock.percentChange.toFixed(2)}% ▼)
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BiggestMovers;
