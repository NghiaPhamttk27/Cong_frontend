"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress, Box, Typography, Paper } from "@mui/material";
import { postSsoCallback } from "@/api/auth"; // import hàm đã tách
import Cookies from "js-cookie";

export default function SsoCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Đang xử lý đăng nhập SSO...");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) {
      setStatus("Không tìm thấy code trong URL. Vui lòng thử lại.");
      return;
    }

    async function handleSso() {
      const result = await postSsoCallback(code);

      if (result) {
        // ✅ Lưu vào cookie thay vì localStorage
        Cookies.set("token", result.accessToken, { expires: 1, secure: true });
        Cookies.set("role", result.user.Roles, { expires: 1, secure: true });
        // Phải stringify object user

        setStatus("Đăng nhập thành công! Đang chuyển hướng...");
        router.push("/homepage");
      } else {
        setStatus("Đăng nhập thất bại. Vui lòng thử lại.");
      }
    }

    handleSso();
  }, [router]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography variant="h6" align="center">
          {status}
        </Typography>
      </Paper>
    </Box>
  );
}
