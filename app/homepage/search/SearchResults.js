import React, { useState } from "react";
import Link from "@mui/material/Link";
import { getFileType, formatDate, formatColorsFileType } from "@/utils/utils";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchResults({
  results,
  tags,
  onRemoveTag,
  filters,
  setFilters,
}) {
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      {/* Search Input Bar */}
      <TextField
        fullWidth
        placeholder="Nhập dữ liệu bạn muốn tìm..."
        size="small"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setFilters((prev) => ({ ...prev, Keyword: searchText }));
          }
        }}
        sx={{ marginBottom: 5 }}
        InputProps={{
          style: { height: 50 },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  setFilters((prev) => ({ ...prev, Keyword: searchText }))
                }
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Selected Filters */}
      <Stack
        direction="row"
        gap={1}
        spacing={1}
        mb={2}
        sx={{ flexWrap: "wrap" }}
      >
        {tags.map((tag) => (
          <Chip
            key={tag.key}
            label={`${tag.key}: ${tag.value}`}
            onDelete={() => onRemoveTag(tag.key)}
            sx={{
              fontSize: 14,
              fontWeight: "600", // đậm chữ
              color: "#272727ff",
            }}
          />
        ))}
      </Stack>

      {!results.length ? (
        <p style={{ textAlign: "center", marginTop: "2rem", color: "#6b7280" }}>
          Không có dữ liệu
        </p>
      ) : (
        <>
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
              {results.length} bộ dữ liệu
            </h2>
            {/* <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
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
        </div> */}
          </div>

          {/* Search Results List */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {results.map((item, idx) => (
              <div
                key={idx}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  paddingBottom: "1rem",
                }}
              >
                <Link
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "bold",
                    color: "#1d4ed8",
                  }}
                  href={`/homepage/dataset/${item.Id_file}`}
                >
                  {item.TieuDe}
                </Link>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#4b5563",
                    marginTop: "0.25rem",
                  }}
                >
                  {item.MoTa}
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
                    <span style={{ color: "#000" }}>
                      {formatDate(item.NgayTao)}
                    </span>
                  </span>
                  <span style={{ marginRight: "1rem" }}>
                    Tổ chức:{" "}
                    <span style={{ color: "#000" }}>
                      {item.SoBanNganh.TenSoBanNganh}
                    </span>
                  </span>
                  <span style={{ marginRight: "1rem" }}>
                    Lượt xem:{" "}
                    <span style={{ color: "#000", fontWeight: "bold" }}>
                      {item.So_lươt_xem}
                    </span>
                  </span>
                  <span>
                    Lượt tải về:{" "}
                    <span style={{ color: "#000", fontWeight: "bold" }}>
                      {item.So_lươt_tai}
                    </span>
                  </span>
                </div>
                <span
                  style={{
                    display: "inline-block",
                    marginTop: "0.5rem",
                    backgroundColor: formatColorsFileType(
                      getFileType(item.FileUrl)
                    ),
                    color: "#fff",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    padding: "0.25rem 0.625rem",
                    borderRadius: "5px",
                  }}
                >
                  {getFileType(item.FileUrl)}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
