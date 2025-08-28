import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";

const Header = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: "#ebfaf5",
        padding: "20px 10vw",
        zIndex: 1000,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo / Title */}
      <Link
        href="/homepage"
        style={{
          fontSize: "30px",
          fontWeight: "600",
          color: "#166534",
          textDecoration: "none",
        }}
      >
        Cổng dữ liệu
      </Link>

      {/* Button */}
      {/* <Button variant="contained" color="primary">
        Đăng nhập
      </Button> */}
    </div>
  );
};

export default Header;
