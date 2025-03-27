import React from "react";
import "../../styling/Profile.css";
import { useTranslation } from "react-i18next";

const PersonalInformation = () => {
  const { t } = useTranslation();

  const personalInformation = {
    name: "Mohamed Abo Aiad",
    email: "mostet2001@gmail.com",
    phone: "+1 (416)-700-2962",
    address: "2505, 360 Square One Drive",
  };

  return (
    <div className="personal-info-page">
      <h1 className="personal-info-title">{t("personalInformation")}</h1>

      <div className="info-section">
        <label>{t("fullName")}</label>
        <div className="info-content">
          <h3>{personalInformation.name}</h3>
        </div>
      </div>

      <div className="info-section">
        <label>{t("emailAddress")}</label>
        <div className="info-content">
          <h3>{personalInformation.email}</h3>
          <button className="edit-button">{t("edit")}</button>
        </div>
      </div>

      <div className="info-section">
        <label>{t("phoneNumber")}</label>
        <div className="info-content">
          <h3>{personalInformation.phone}</h3>
          <button className="edit-button">{t("edit")}</button>
        </div>
      </div>

      <div className="info-section">
        <label>{t("address")}</label>
        <div className="info-content">
          <h3>{personalInformation.address}</h3>
          <button className="edit-button">{t("edit")}</button>
        </div>
      </div>

      <button className="save-button">{t("saveChanges")}</button>
    </div>
  );
};

export default PersonalInformation;
