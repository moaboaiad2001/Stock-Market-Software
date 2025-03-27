import React, { useState } from "react";
import Select from "react-select";
import "../../styling/ReportsandStatements.css";
import { useTranslation } from "react-i18next";

const ReportsandStatements = () => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState({
    label: t("lastMonth"),
    value: t("lastMonth"),
  });
  const [generatedReports, setGeneratedReports] = useState<
    { id: number; period: string; details: string }[]
  >([]);

  const [expandedStatement, setExpandedStatement] = useState<number | null>(
    null
  );
  const [expandedReport, setExpandedReport] = useState<number | null>(null);

  const generateReportOptions = [
    { label: t("lastMonth"), value: t("lastMonth") },
    { label: t("last3Months"), value: t("last3Months") },
    { label: t("lastYear"), value: t("lastYear") },
  ];

  const accountStatements = [
    {
      id: 1,
      date: "February 2025",
      details: "Statement details for February 2025",
    },
    {
      id: 2,
      date: "January 2025",
      details: "Statement details for January 2025",
    },
  ];

  const generateReport = () => {
    const newReport = {
      id: generatedReports.length + 1,
      period: selectedOption.value,
      details: `Generated report for ${selectedOption.value}`,
    };
    setGeneratedReports([...generatedReports, newReport]);
  };

  return (
    <div className="personal-info-page">
      <h1 className="personal-info-title">{t("reportsAndStatements")}</h1>
      <h3 className="generate-report-title">{t("generateReportTitle")}</h3>
      <Select
        className="generate-report-selector"
        options={generateReportOptions}
        defaultValue={generateReportOptions[0]} // Default to "Last Month"
        onChange={(selected) => selected && setSelectedOption(selected)} // ✅ Update state
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "black",
            border: "none",
          }),
          singleValue: (base) => ({
            ...base,
            color: "#007aff", // Blue text
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "black",
          }),
          option: (base, { isFocused }) => ({
            ...base,
            backgroundColor: isFocused ? "#222" : "black",
            color: "#007aff", // Blue text for options
          }),
        }}
      />
      <button className="generate-button" onClick={generateReport}>
        {t("generateButton")}
      </button>
      <div className="info-section">
        <label>{t("accountStatements")}</label>
        {accountStatements.map((statement) => (
          <div key={statement.id} className="info-content">
            <h3
              onClick={() =>
                setExpandedStatement(
                  expandedStatement === statement.id ? null : statement.id
                )
              }
            >
              {statement.date}
            </h3>
            {expandedStatement === statement.id && <p>{statement.details}</p>}
          </div>
        ))}
      </div>
      <div className="info-section">
        <label>{t("generatedReports")}</label>
        {generatedReports.map((report) => (
          <div key={report.id} className="info-content">
            <h3
              onClick={() =>
                setExpandedReport(
                  expandedReport === report.id ? null : report.id
                )
              }
            >
              {report.period}
            </h3>
            {expandedReport === report.id && <p>{report.details}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsandStatements;
