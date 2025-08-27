"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // <-- import js-cookie
import { login } from "@/api/auth";
import { Box, Button, Typography, Paper } from "@mui/material";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import images from "@/asset/images";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(username, password);

      // Lưu cookie phía client với js-cookie
      Cookies.set("token", data.access_token, { expires: 14, path: "/" });
      Cookies.set("role", data.roles, { expires: 14, path: "/" });

      // Điều hướng
      if (data.roles === "Admin") {
        alert("Đăng nhập thành công");
        router.push("/admin");
      } else {
        alert("Bạn phải đăng nhập bằng tài khoản admin");
      }
    } catch (err) {
      alert("Sai tài khoản hoặc mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${images.bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, mt: 8 }}
        style={{ border: "1px solid #000", width: "500px" }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Đăng nhập
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Tên đăng nhập"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            style={{ height: "50px" }}
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
