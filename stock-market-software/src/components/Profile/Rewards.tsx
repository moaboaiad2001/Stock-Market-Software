import React from "react";
import { AiFillGift } from "react-icons/ai";
import { FaStar, FaUserFriends } from "react-icons/fa";
import "../../styling/Rewards.css";

const Rewards = () => {
  return (
    <div className="rewards-page">
      <h1 className="rewards-title">Rewards</h1>
      <div className="rewards-icon">
        <AiFillGift className="gift-icon" />
      </div>
      <p className="rewards-description">
        Earn rewards by inviting friends to join our platform! For every friend
        who signs up and makes their first trade, you'll unlock exciting
        bonuses.
      </p>

      <div className="invite-progress">
        <h3>Invite Progress</h3>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: "40%" }}></div>
        </div>
        <p className="progress-text">Next Reward: $50 Bonus at 5 Invites!</p>
      </div>

      <button className="share-invite-button">Share Invite Link</button>

      <h3 className="rewards-section-title">Your Rewards</h3>
      <div className="reward-container">
        <div className="reward-item">
          <FaStar className="reward-icon" />
          <span>Sign-Up Bonus</span>
          <span className="reward-amount">$10</span>
        </div>
        <div className="reward-item">
          <FaUserFriends className="reward-icon" />
          <span>First Invite Reward</span>
          <span className="reward-amount">$5</span>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
