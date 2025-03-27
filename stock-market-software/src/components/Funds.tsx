import React from "react";
import { useTranslation } from "react-i18next";
import convertToArabicNumerals from "../utils/convertToArabicNumerals";

const Funds = () => {
  const { t, i18n } = useTranslation();
  const availableCash = 0;
  const availableFunds = 0;

  // Conditionally format the number based on the language
  const formattedCash =
    i18n.language === "ar"
      ? convertToArabicNumerals(availableCash)
      : `$${availableCash.toFixed(2)}`; // Use $ when in English
  const formattedFunds =
    i18n.language === "ar"
      ? convertToArabicNumerals(availableFunds)
      : `$${availableFunds.toFixed(2)}`; // Use $ when in English

  return (
    <div>
      <div className="cash-container">
        <div className="funds-card">
          <h3>{t("cashAvailable")}:</h3>
          <h3>{formattedCash}</h3>
        </div>
        <div className="funds-card">
          <h3>{t("fundsAvailable")}:</h3>
          <h3>{formattedFunds}</h3>
        </div>
      </div>
    </div>
  );
};

export default Funds;
