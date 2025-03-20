import React from "react";
import "../../styling/Profile.css";
import { useNavigate } from "react-router-dom";

const Tranfsers = () => {
  const navigate = useNavigate();
  return (
    <div className="transfers-page">
      <h1 className="personal-info-title">Transfers</h1>
      <div className="transfer-option">
        <label>Deposit</label>
        <button onClick={() => navigate("/send-wire")}>{">"}</button>
      </div>
      <div className="transfer-option">
        <label>Withdraw</label>
        <button onClick={() => navigate("/send-wire")}>{">"}</button>
      </div>
      <div className="transfer-option">
        <label>Recurring Deposit</label>
        <button onClick={() => navigate("/send-wire")}>{">"}</button>
      </div>
      <div className="transfer-option">
        <label>Direct Deposit</label>
        <button onClick={() => navigate("/send-wire")}>{">"}</button>
      </div>
      <div className="transfer-option">
        <label>Recieve Wire Transfer</label>
        <button onClick={() => navigate("/send-wire")}>{">"}</button>
      </div>
      <div className="transfer-option">
        <label>Send Wire Transfer</label>
        <button onClick={() => navigate("/send-wire")}>{">"}</button>
      </div>
      <div className="withdraw-amount">
        <label>Available to Withdraw: $1500.25</label>
      </div>
      <div className="linked-account-title">
        <label>Linked Accounts</label>
      </div>
      <div className="linked-account-option">
        <label>Bank Account: BMO</label>
      </div>
      <div className="linked-account-option">
        <label>Debit Card: Visa ****1234</label>
      </div>
      <div className="linked-account-option">
        <label>Bank Account: Wells Fargo Savings</label>
      </div>
      <div className="linked-account-add">
        <label>Add Acount</label>
        <button onClick={() => navigate("/send-wire")}>{"+"}</button>
      </div>
      <div className="transaction-history-title">
        <label>Transaction History</label>
      </div>
      <div className="transaction-history-option">
        <label>Deposit</label>
        <div className="deposit-amount">
          <label>$500</label>
          <label>03/16/2025</label>
        </div>
      </div>
      <div className="transaction-history-option">
        <label>Withdraw</label>
        <div>
          <label>$200</label>
          <label>03/15/2025</label>
        </div>
      </div>
      <div className="transaction-history-option">
        <label>Deposit</label>
        <div className="deposit-amount">
          <label>$500</label>
          <label>03/14/2025</label>
        </div>
      </div>
    </div>
  );
};

export default Tranfsers;
