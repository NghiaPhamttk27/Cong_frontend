"use client";
import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    // ❌ Xóa cookie
    Cookies.remove("access_token");
    Cookies.remove("roles");

    // 👉 Chuyển hướng về trang login
    router.push("/login");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: "#ebfaf5",
        padding: "15px 10vw",
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
          fontSize: "28px",
          fontWeight: "600",
          color: "#166534",
          textDecoration: "none",
        }}
      >
        Hướng dẫn sử dụng
      </Link>

      <Button variant="contained" color="error" onClick={handleLogout}>
        Đăng xuất
      </Button>
    </div>
  );
};

export default Header;
