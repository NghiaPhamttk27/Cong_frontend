import React from "react";
import { Button } from "@mui/material";

const Header = () => {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        width: "100%",
        backgroundColor: "#ebfaf5", // Màu nền để dễ nhìn
        padding: "10px 300px",
        zIndex: 1000, // Đảm bảo header nằm trên các element khác
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Hiệu ứng đổ bóng
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>Header</div>
      <Button variant="contained">Đăng nhập</Button>
    </div>
  );
};

export default Header;
