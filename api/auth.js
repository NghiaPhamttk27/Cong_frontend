import axios from "axios";
import handleError from "./handleError";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(username, password) {
  const url = `${NEXT_PUBLIC_API_URL}/Token`; // giả sử backend có baseURL đã set ở axios

  console.log("Call API:", url);
  console.log(username, password);

  try {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    params.append("grant_type", "password");

    const res = await axios.post(url, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    console.log("Đăng nhập thành công", res.data);
    return res.data;
  } catch (error) {
    console.log("Đăng nhập thất bại");
    handleError(error);
    return null;
  }
}

export async function getSsoLoginUrl() {
  const url = `${NEXT_PUBLIC_API_URL}/api/auth/sso-login-url`;

  console.log("Call API:", url);

  try {
    const res = await axios.get(url);

    console.log("Lấy SSO login URL thành công:", res.data);
    return res.data;
  } catch (error) {
    console.log("Lấy SSO login URL thất bại");
    handleError(error);
    return null;
  }
}

export async function postSsoCallback(code) {
  // Lấy base URL từ env
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await axios.post(
      `${apiUrl}/api/auth/sso-callback`,
      { code }, // payload chỉ gồm code
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("✅ SSO Callback thành công:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ SSO Callback thất bại");
    handleError(error);
    return null;
  }
}
