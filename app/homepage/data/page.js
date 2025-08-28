"use client"; // <-- Thêm dòng này vào đầu file
import React, { useEffect, useState } from "react";
import { getLatesFile, getMostViewFile } from "@/api/data";
import { getFileType, formatDate } from "@/utils/utils";
import { Link } from "@mui/material";
import { formatColorsFileType } from "@/utils/utils";

// Định nghĩa các đối tượng style
const mainContainerStyle = {
  display: "flex",
  gap: "40px",
  justifyContent: "center",
  //   padding: "40px 20px",
  width: "100%",
};

const sectionContainerStyle = {
  width: "50%",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  border: "1px solid #e0e0e0",
};

const sectionHeaderStyle = {
  background: "linear-gradient(to right, #d4fce0, #c8f0db)",
  color: "#fff",
  padding: "15px 25px",
  fontSize: "1.25rem",
  fontWeight: "600",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
};

const sectionTitleStyle = {
  margin: 0,
  fontSize: "22px",
  color: "#056d4f",
  padding: "17px 0",
};

const dataListStyle = {
  padding: "20px",
};

const dataItemStyle = {
  marginBottom: "20px",
  paddingBottom: "20px",
  borderBottom: "1px solid #e9e9e9",
};

const lastChildStyle = {
  borderBottom: "none",
  marginBottom: 0,
  paddingBottom: 0,
};

const itemCategoryStyle = {
  color: "#007bff",
  fontSize: "0.9rem",
  fontWeight: "500",
  margin: 0,
};

const itemTitleStyle = {
  color: "#333",
  fontSize: "16px",
  fontWeight: "600",
  margin: "5px 0",
};

const itemMetaStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color: "#777",
  fontSize: "0.85rem",
};

const itemFormatBaseStyle = {
  display: "inline-block",
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "0.75rem",
  fontWeight: "bold",
  color: "#fff",
};

const itemDateStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
};

const calendarIconStyle = {
  fontSize: "1rem",
};

const DataSection = ({ title, data }) => (
  <div style={sectionContainerStyle}>
    <div style={sectionHeaderStyle}>
      <h3 style={sectionTitleStyle}>{title}</h3>
    </div>
    <div style={dataListStyle}>
      {data.map((item, index) => {
        const itemSpecificStyle =
          index === data.length - 1 ? lastChildStyle : {};
        const formatStyle = {
          ...itemFormatBaseStyle,
          backgroundColor: formatColorsFileType(getFileType(item.FileUrl)),
        };

        return (
          <div key={index} style={{ ...dataItemStyle, ...itemSpecificStyle }}>
            {/* Chủ đề → search theo topic id */}
            <Link
              href={`/homepage/search?topic=${item.ChuDe.Id_chu_de}`}
              style={{ textDecoration: "none" }}
            >
              <p style={{ ...itemCategoryStyle, cursor: "pointer" }}>
                {item.ChuDe.TenChuDe}
              </p>
            </Link>

            {/* Tiêu đề → search theo keyword */}
            <Link
              href={`/homepage/search?keyword=${encodeURIComponent(
                item.TieuDe
              )}`}
              style={{ textDecoration: "none", color: "#2b2b2bff" }}
            >
              <h4
                style={{
                  ...itemTitleStyle,
                  cursor: "pointer",
                }}
              >
                {item.TieuDe}
              </h4>
            </Link>

            <div style={itemMetaStyle}>
              <span style={formatStyle}>{getFileType(item.FileUrl)}</span>
              <span style={itemDateStyle}>
                <span style={calendarIconStyle}>🗓️</span>
                {formatDate(item.NgayTao)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default function DataList() {
  const [latestData, setLatestData] = useState([]);
  const [mostViewData, setMostViewData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchLatestFile() {
      try {
        const data = await getLatesFile();
        setLatestData(data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    fetchLatestFile();
  }, []);

  useEffect(() => {
    setLoading(true);
    async function fetchMostViewFile() {
      try {
        const data = await getLatesFile();
        setMostViewData(data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    fetchMostViewFile();
  }, []);

  useEffect(() => {
    setLoading(true);
    async function fetchLatestTopics() {
      try {
        const data = await getLatesFile();
        setLatestData(data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    fetchLatestTopics();
  }, []);

  return (
    <div style={mainContainerStyle}>
      <DataSection title="Dữ liệu mới nhất" data={latestData} />
      <DataSection title="Dữ liệu xem nhiều nhất" data={mostViewData} />
    </div>
  );
}
