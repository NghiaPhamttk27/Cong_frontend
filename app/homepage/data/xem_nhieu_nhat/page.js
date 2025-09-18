"use client";

import React, { useEffect, useState } from "react";
import { getMostViewFileFull } from "@/api/data";
import { getFileType, formatDate, formatColorsFileType } from "@/utils/utils";
import { Link } from "@mui/material";

// --- Style tái sử dụng ---
const pageContainerStyle = {
  //   maxWidth: "1200px",
  marginLeft: " 10vw",
  marginRight: " 10vw",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  border: "1px solid #e0e0e0",
  padding: "20px",
  marginTop: 120,
};

const headerStyle = {
  background: "linear-gradient(to right, #d4fce0, #c8f0db)",
  padding: "20px",
  borderRadius: "8px",
  marginBottom: "20px",
};

const headerTitleStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#056d4f",
  margin: 0,
};

const dataItemStyle = {
  marginBottom: "20px",
  paddingBottom: "20px",
  borderBottom: "1px solid #e9e9e9",
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

const lastChildStyle = {
  borderBottom: "none",
  marginBottom: 0,
  paddingBottom: 0,
};

// --- Component ---
export default function MostViewFullPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await getMostViewFileFull();
        setData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={pageContainerStyle}>
      <div style={headerStyle}>
        <h2 style={headerTitleStyle}>Danh sách file xem nhiều nhất</h2>
      </div>

      {loading && <p>Đang tải dữ liệu...</p>}
      {!loading && data.length === 0 && <p>Không có dữ liệu</p>}

      {data.map((item, index) => {
        const itemSpecificStyle =
          index === data.length - 1 ? lastChildStyle : {};
        const formatStyle = {
          ...itemFormatBaseStyle,
          backgroundColor: formatColorsFileType(getFileType(item.FileUrl)),
        };

        return (
          <div key={index} style={{ ...dataItemStyle, ...itemSpecificStyle }}>
            {/* Lĩnh vực */}
            <Link
              href={`/homepage/search?topic=${item.ChuDe?.Id_chu_de}`}
              style={{ textDecoration: "none" }}
            >
              <p style={{ ...itemCategoryStyle, cursor: "pointer" }}>
                {item.ChuDe?.TenChuDe}
              </p>
            </Link>

            {/* Tiêu đề */}
            <Link
              href={`/homepage/search?keyword=${encodeURIComponent(
                item.TieuDe
              )}`}
              style={{ textDecoration: "none", color: "#2b2b2bff" }}
            >
              <h4 style={{ ...itemTitleStyle, cursor: "pointer" }}>
                {item.TieuDe}
              </h4>
            </Link>

            <div style={itemMetaStyle}>
              <span style={formatStyle}>{getFileType(item.FileUrl)}</span>
              <span style={itemDateStyle}>
                <span>🗓️</span>
                {formatDate(item.NgayTao)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
