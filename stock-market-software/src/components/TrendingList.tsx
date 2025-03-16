import React from "react";
import {
  AiOutlineArrowUp,
  AiOutlineLineChart,
  AiOutlineRocket,
  AiOutlineFall,
  AiFillMerge,
  AiFillProfile,
  AiFillFire,
  AiTwotoneExperiment,
  AiFillClockCircle,
  AiFillApi,
  AiTwotoneHourglass,
} from "react-icons/ai";

const TrendingList = () => {
  type Category = {
    Title: string;
    Description: string;
    Icon: React.ReactNode;
  };

  const trendingCategories: { [key: number]: Category } = {
    0: {
      Title: "100 Most Popular",
      Description:
        "Discover the most commonly held stocks and ETFs among users.",
      Icon: <AiOutlineArrowUp />,
    },
    1: {
      Title: "Top Gainers",
      Description: "Explore stocks with the biggest gains today.",
      Icon: <AiOutlineLineChart />,
    },
    2: {
      Title: "IPO Access",
      Description: "Get access to upcoming IPOs and new opportunities.",
      Icon: <AiOutlineRocket />,
    },
    3: {
      Title: "Top Losers",
      Description: "Explore stocks with the biggest losses today.",
      Icon: <AiOutlineFall />,
    },
    4: {
      Title: "Technology",
      Description: "Top-performing tech stocks.",
      Icon: <AiFillMerge />,
    },
    5: {
      Title: "ETFs",
      Description: "Explore top-performing ETFs.",
      Icon: <AiFillProfile />,
    },
    6: {
      Title: "Cannabis",
      Description: "Discover trending stocks in the cannabis sector.",
      Icon: <AiFillFire />,
    },
    7: {
      Title: "Pharma",
      Description: "Explore the pharmaceutical industry’s top stocks.",
      Icon: <AiTwotoneExperiment />,
    },
    8: {
      Title: "Upcoming Earnings",
      Description: "Companies reporting earnings in the next 2 weeks.",
      Icon: <AiFillClockCircle />,
    },
    9: {
      Title: "Energy",
      Description: "Trending energy sector stocks.",
      Icon: <AiFillApi />,
    },
    10: {
      Title: "Daily Movers",
      Description: "Discover stocks with significant price changes today.",
      Icon: <AiTwotoneHourglass />,
    },
  };

  return (
    <div>
      <h2 className="trending-list-title">Trending Lists</h2>
      <ul className="trending-categories">
        {Object.values(trendingCategories).map((category, index) => (
          <li key={index}>
            <a href="#" className="trending-category-link">
              {category.Icon}
              <span>{category.Title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingList;
