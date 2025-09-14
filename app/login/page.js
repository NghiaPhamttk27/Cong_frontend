"use client"; // bắt buộc khi dùng hooks ở App Router

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { login, getSsoLoginUrl } from "@/api/auth"; // đường dẫn chỉnh lại theo cấu trúc dự án
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const res = await login(username, password);
    setLoading(false);
    if (res) {
      Cookies.set("token", res.access_token, { expires: 1, secure: true });
      Cookies.set("role", res.roles, { expires: 1, secure: true });
      router.push("/homepage"); // App Router vẫn dùng push được
    }
  };

  const handleSsoLogin = async () => {
    const res = await getSsoLoginUrl();
    if (res?.url) {
      window.location.href = res.url;
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h5" gutterBottom>
          Đăng nhập
        </Typography>

        <TextField
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>

        <Divider sx={{ my: 3, width: "100%" }}>hoặc</Divider>

        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={handleSsoLogin}
        >
          Đăng nhập SSO
        </Button>
      </Box>
    </Container>
  );
}
