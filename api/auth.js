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
