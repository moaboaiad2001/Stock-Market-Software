import React, { useEffect } from "react";
import "../../styling/Profile.css";
import { Link } from "react-router-dom";
import {
  IoPerson,
  IoSettings,
  IoLogOut,
  IoDocumentText,
} from "react-icons/io5";
import { BiTransfer } from "react-icons/bi";
import { FaChartPie } from "react-icons/fa";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { LuChartLine } from "react-icons/lu";
import { AiFillGift } from "react-icons/ai";
import { SiSpringsecurity } from "react-icons/si";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

const Profile = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLang);
  }, [i18n]);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <div className="profile-page">
      <h1 className="profile-title">{t("account")}</h1>
      <div className="profile-sections">
        <Link to="/personal-information" className="profile-link">
          <div className="profile-card">
            <span className="icon">
              <IoPerson />
            </span>
            <h2>{t("personalInformation")}</h2>
          </div>
        </Link>
        <Link to="/transfers" className="profile-link">
          <div className="profile-card">
            <span className="icon">
              <BiTransfer />
            </span>
            <h2>{t("transfers")}</h2>
          </div>
        </Link>
        <Link to="/portfolio-overview" className="profile-link">
          <div className="profile-card">
            <span className="icon">
              <FaChartPie />
            </span>
            <h2>{t("portfolioOverview")}</h2>
          </div>
        </Link>
        <Link to="/transaction-history" className="profile-link">
          <div className="profile-card">
            <span className="icon">
              <HiOutlineArrowsUpDown />
            </span>
            <h2>{t("transactionHistory")}</h2>
          </div>
        </Link>
        <Link to="/option-trading" className="profile-link">
          <div className="profile-card">
            <span className="icon">
              <LuChartLine />
            </span>
            <h2>{t("applyForOptionTrading")}</h2>
          </div>
        </Link>
        <Link to="/rewards" className="profile-link">
          <div className="profile-card">
            <span className="icon">
              <AiFillGift />
            </span>
            <h2>{t("rewards")}</h2>
          </div>
        </Link>
        <Link to="/reports" className="profile-link">
          <div className="profile-card">
            <span className="icon">
              <IoDocumentText />
            </span>
            <h2>{t("reportsAndStatements")}</h2>
          </div>
        </Link>
        <Link to="/security" className="profile-link">
          <div className="profile-card">
            <span className="icon">
              <SiSpringsecurity />
            </span>
            <h2>{t("securityAndPrivacy")}</h2>
          </div>
        </Link>
        <Link to="/settings" className="profile-link">
          <div className="profile-card">
            <span className="icon">
              <IoSettings />
            </span>
            <h2>{t("settings")}</h2>
          </div>
        </Link>
        <Link to="/logout" className="profile-link">
          <div className="profile-card">
            <span className="icon">
              <IoLogOut />
            </span>
            <h2>{t("logout")}</h2>
          </div>
        </Link>
      </div>

      <div className="profile-sidebar">
        <h3>{t("generalPreferences")}</h3>
        <div
          className="sidebar-item"
          onClick={toggleLanguage}
          style={{ cursor: "pointer" }}
        >
          <span>{t("changeLanguage")}</span>{" "}
          <span>{i18n.language === "en" ? t("english") : t("arabic")} ➝</span>
        </div>
        <div className="sidebar-item">
          <span>{t("maxIdleTime")}</span> <span>{t("minutes")} ➝</span>
        </div>

        <h3>{t("help")}</h3>
        <div className="sidebar-item">
          <span>{t("helpCentre")}</span> <span>↗</span>
        </div>
        <div className="sidebar-item">
          <span>{t("liveChat")}</span> <span>↗</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
