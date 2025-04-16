import React, { useContext } from "react";
import { AiFillGift } from "react-icons/ai";
import { FaStar, FaUserFriends } from "react-icons/fa";
import "../../styling/Rewards.css";
import { useTranslation } from "react-i18next";
import { LightModeContext } from "../../utils/LightModeContext";

const Rewards = () => {
  const { t } = useTranslation();
  const lightModeContext = useContext(LightModeContext);
  const lightMode = lightModeContext?.lightMode || "light";

  return (
    <div
      className={`rewards-page ${
        lightMode === "dark"
          ? "rewards-page rewards-page-dark"
          : "rewards-page rewards-page-light"
      }`}
    >
      <h1 className="rewards-title">{t("rewards")}</h1>
      <div className="rewards-icon">
        <AiFillGift className="gift-icon" />
      </div>
      <p className="rewards-description">{t("rewardsDescription")}</p>

      <div className="invite-progress">
        <h3>{t("inviteProgress")}</h3>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: "40%" }}></div>
        </div>
        <p className="progress-text">{t("progressText")}</p>
      </div>

      <button className="share-invite-button">{t("shareInviteLink")}</button>

      <h3 className="rewards-section-title">{t("rewardsSectionTitle")}</h3>
      <div className="reward-container">
        <div className="reward-item">
          <FaStar className="reward-icon" />
          <span>{t("signUpBonus")} </span>
          <span className="reward-amount">$10</span>
        </div>
        <div className="reward-item">
          <FaUserFriends className="reward-icon" />
          <span>{t("firstInviteReward")}</span>
          <span className="reward-amount">$5</span>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
