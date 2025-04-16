import React, { useContext } from "react";
import "../../styling/Profile.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LightModeContext } from "../../utils/LightModeContext";

const Tranfsers = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const lightModeContext = useContext(LightModeContext);
  const lightMode = lightModeContext?.lightMode || "light";

  return (
    <div
      className={
        lightMode === "dark"
          ? "transfers-page transfers-page-dark"
          : "transfers-page transfers-page-light"
      }
    >
      <h1 className="personal-info-title">{t("transfers")}</h1>
      <div className="transfer-option">
        <label>{t("deposit")}</label>
        <button onClick={() => navigate("/send-wire")}>{">"}</button>
      </div>
      <div className="transfer-option">
        <label>{t("withdraw")}</label>
        <button onClick={() => navigate("/send-wire")}>{">"}</button>
      </div>
      <div className="transfer-option">
        <label>{t("recurringDeposit")}</label>
        <button onClick={() => navigate("/send-wire")}>{">"}</button>
      </div>
      <div className="transfer-option">
        <label>{t("directDeposit")}</label>
        <button onClick={() => navigate("/send-wire")}>{">"}</button>
      </div>
      <div className="transfer-option">
        <label>{t("receiveWireTransfer")}</label>
        <button onClick={() => navigate("/send-wire")}>{">"}</button>
      </div>
      <div className="transfer-option">
        <label>{t("sendWireTransfer")}</label>
        <button onClick={() => navigate("/send-wire")}>{">"}</button>
      </div>
      <div className="withdraw-amount">
        <label>{t("availableToWithdraw")}</label>
      </div>
      <div className="linked-account-title">
        <label>{t("linkedAccounts")}</label>
      </div>
      <div className="linked-account-option">
        <label>{t("bankAccount")}: BMO</label>
      </div>
      <div className="linked-account-option">
        <label>{t("debitCard")}: Visa ****1234</label>
      </div>
      <div className="linked-account-option">
        <label>{t("bankAccount")}: Wells Fargo Savings</label>
      </div>
      <div className="linked-account-add">
        <label>{t("addAccount")}</label>
        <button onClick={() => navigate("/send-wire")}>{"+"}</button>
      </div>
      <div className="transaction-history-title">
        <label>{t("transactionHistory")}</label>
      </div>
      <div className="transaction-history-option">
        <label>{t("depositTransaction")}</label>
        <div className="deposit-amount">
          <label>$500</label>
          <label>03/16/2025</label>
        </div>
      </div>
      <div className="transaction-history-option">
        <label>{t("withdrawTransaction")}</label>
        <div>
          <label>$200</label>
          <label>03/15/2025</label>
        </div>
      </div>
      <div className="transaction-history-option">
        <label>{t("depositTransaction")}</label>
        <div className="deposit-amount">
          <label>$500</label>
          <label>03/14/2025</label>
        </div>
      </div>
    </div>
  );
};

export default Tranfsers;
