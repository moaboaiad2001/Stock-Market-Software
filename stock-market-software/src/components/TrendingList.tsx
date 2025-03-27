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
import { useTranslation } from "react-i18next";

const TrendingList = () => {
  const { t } = useTranslation();

  type Category = {
    Title: string;
    Description: string;
    Icon: React.ReactNode;
  };

  const trendingCategories: { [key: number]: Category } = {
    0: {
      Title: t("popularStocks"),
      Description: t("popularDescription"),
      Icon: <AiOutlineArrowUp />,
    },
    1: {
      Title: t("topGainers"),
      Description: t("topGainersDescription"),
      Icon: <AiOutlineLineChart />,
    },
    2: {
      Title: t("ipoAccess"),
      Description: t("ipoDescription"),
      Icon: <AiOutlineRocket />,
    },
    3: {
      Title: t("topLosers"),
      Description: t("topLosersDescription"),
      Icon: <AiOutlineFall />,
    },
    4: {
      Title: t("technology"),
      Description: t("techDescription"),
      Icon: <AiFillMerge />,
    },
    5: {
      Title: t("etfs"),
      Description: t("etfDescription"),
      Icon: <AiFillProfile />,
    },
    6: {
      Title: t("cannabis"),
      Description: t("cannabisDescription"),
      Icon: <AiFillFire />,
    },
    7: {
      Title: t("pharma"),
      Description: t("pharmaDescription"),
      Icon: <AiTwotoneExperiment />,
    },
    8: {
      Title: t("upcomingEarnings"),
      Description: t("earningsDescription"),
      Icon: <AiFillClockCircle />,
    },
    9: {
      Title: t("energy"),
      Description: t("energyDescription"),
      Icon: <AiFillApi />,
    },
    10: {
      Title: t("dailyMovers"),
      Description: t("dailyMoversDescription"),
      Icon: <AiTwotoneHourglass />,
    },
  };

  return (
    <div>
      <h2 className="trending-list-title">{t("trendingLists")}</h2>
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
