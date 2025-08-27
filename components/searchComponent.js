"use client";
import React, { useState } from "react";
import { InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

const SearchComponent = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const keyword = value.trim();
    if (keyword) {
      router.push(`/homepage/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        background: "linear-gradient(to right, #d4fce0, #c8f0db)",
        borderRadius: 10,
        padding: "80px 0", // khoảng cách trên dưới
        display: "flex",
        justifyContent: "center",
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 1000 }}>
        <Paper
          component="div"
          sx={{
            p: "20px 18px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            borderRadius: "9999px",
            backgroundColor: "#fff", // ô tìm kiếm màu trắng
            boxShadow: "0 2px 6px rgba(32,33,36,.28)",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(32,33,36,.4)",
            },
          }}
        >
          <IconButton sx={{ p: "10px" }} disabled>
            <SearchIcon style={{ color: "#5f6368", fontSize: 28 }} />
          </IconButton>
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              fontSize: 20, // chữ to
              color: "#000",
              "::placeholder": { color: "#888", opacity: 1 },
            }}
            placeholder="Tìm kiếm dữ liệu..."
            inputProps={{ "aria-label": "search" }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Paper>
      </form>
    </div>
  );
};

export default SearchComponent;
