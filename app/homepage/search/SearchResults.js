import * as React from "react";
import Link from "next/link";

// Dữ liệu giả định
const fakeResults = [
  {
    title: "Cơ sở dữ liệu về trạm thu phát sóng",
    description: "Trạm thu phát sóng trên địa bàn Tỉnh",
    date: "07/03/2025",
    organization: "Sở Khoa học và Công nghệ",
    views: 23,
    downloads: 3,
    format: "JSON",
    fileId: 10,
  },
  {
    title:
      "Danh mục các nhiệm vụ khoa học công nghệ trên địa bàn tỉnh Yên Bái năm 2024",
    description:
      "Danh mục các nhiệm vụ khoa học công nghệ trên địa bàn tỉnh Yên Bái năm 2024",
    date: "29/07/2024",
    organization: "Sở Khoa học và Công nghệ",
    views: 19,
    downloads: 4,
    format: "PDF",
    fileId: 11,
  },
];

export default function SearchResults() {
  const results = fakeResults;

  if (!results.length) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem", color: "#6b7280" }}>
        Không có dữ liệu
      </p>
    );
  }

  return (
    <div>
      {/* Search Input Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            alignItems: "center",
            gap: 10,
          }}
        >
          <input
            type="text"
            placeholder="Nhập dữ liệu bạn muốn tìm..."
            style={{
              width: "90%",
              padding: "0.5rem 3rem 0.5rem 1rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              outline: "none",
              height: 50,
              fontSize: 14,
            }}
          />
          <button
            style={{
              padding: "0.5rem",
              backgroundColor: "#166534",
              color: "white",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              width: "8%",
              height: 50,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: "1.25rem", width: "1.25rem" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Selected Filters */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#e5e7eb",
            borderRadius: "9999px",
            padding: "0.25rem 0.75rem",
            fontSize: "0.875rem",
            fontWeight: "500",
          }}
        >
          Tổ chức: Sở Khoa học và Công nghệ
          <button
            style={{
              marginLeft: "0.5rem",
              border: "none",
              background: "none",
              cursor: "pointer",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: "1rem", width: "1rem" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Results Header with Sorting */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
          2 bộ dữ liệu
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
            Sắp xếp theo:
          </span>
          <select
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              padding: "0.25rem 0.5rem",
              fontSize: "0.875rem",
              outline: "none",
            }}
          >
            <option>Mới nhất</option>
            <option>Lượt xem</option>
            <option>Lượt tải</option>
          </select>
        </div>
      </div>

      {/* Search Results List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {results.map((item, idx) => (
          <div
            key={idx}
            style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "1rem" }}
          >
            <Link
              style={{
                fontSize: "1.125rem",
                fontWeight: "bold",
                color: "#1d4ed8",
              }}
              href={`/dataset/${item.fileId}`}
            >
              {item.title}
            </Link>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#4b5563",
                marginTop: "0.25rem",
              }}
            >
              {item.description}
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                fontSize: "0.875rem",
                color: "#6b7280",
                marginTop: "0.5rem",
              }}
            >
              <span style={{ marginRight: "1rem" }}>
                Ngày phát hành:{" "}
                <span style={{ color: "#000" }}>{item.date}</span>
              </span>
              <span style={{ marginRight: "1rem" }}>
                Tổ chức:{" "}
                <span style={{ color: "#000" }}>{item.organization}</span>
              </span>
              <span style={{ marginRight: "1rem" }}>
                Lượt xem:{" "}
                <span style={{ color: "#000", fontWeight: "bold" }}>
                  {item.views}
                </span>
              </span>
              <span>
                Lượt tải về:{" "}
                <span style={{ color: "#000", fontWeight: "bold" }}>
                  {item.downloads}
                </span>
              </span>
            </div>
            <span
              style={{
                display: "inline-block",
                marginTop: "0.5rem",
                backgroundColor: "#fde047",
                color: "#1f2937",
                fontSize: "0.75rem",
                fontWeight: "600",
                padding: "0.25rem 0.625rem",
                borderRadius: "9999px",
              }}
            >
              {item.format}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
