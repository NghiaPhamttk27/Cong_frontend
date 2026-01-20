import axios from "axios";
import handleError from "./handleError";
import Cookies from "js-cookie";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeader = () => {
  const token = Cookies.get("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Lấy thông tin user theo id
export async function getUserById(id_user) {
  const url = `${NEXT_PUBLIC_API_URL}/api/Account/get-user?id_user=${id_user}`;
  console.log("Call API:", url);

  try {
    const res = await axios.get(url, {
      headers: getAuthHeader(),
    });
    console.log("Lấy thông tin user thành công", res.data);
    return res.data;
  } catch (error) {
    console.log("Lấy thông tin user thất bại");
    handleError(error);
  }
}

// Lấy danh sách users
export async function getListUsers() {
  const url = `${NEXT_PUBLIC_API_URL}/api/Account/list-users`;
  console.log("Call API:", url);

  try {
    const res = await axios.get(url, {
      headers: getAuthHeader(),
    });
    console.log("Lấy danh sách users thành công", res.data);
    return res.data;
  } catch (error) {
    console.log("Lấy danh sách users thất bại");
    handleError(error);
  }
}

// Cập nhật user
export async function updateUser(id_user, data) {
  const url = `${NEXT_PUBLIC_API_URL}/api/Account/update?id_user=${id_user}`;
  console.log("Call API:", url);

  try {
    const res = await axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
    });
    console.log("Cập nhật user thành công", res.data);
    return res.data;
  } catch (error) {
    console.log("Cập nhật user thất bại");
    handleError(error);
  }
}

// Xóa user
export async function deleteUser(id_user) {
  const url = `${NEXT_PUBLIC_API_URL}/api/Account/delete?id_user=${id_user}`;
  console.log("Call API:", url);

  try {
    const res = await axios.delete(url, {
      headers: getAuthHeader(),
    });
    console.log("Xóa user thành công", res.data);
    return res.data;
  } catch (error) {
    console.log("Xóa user thất bại");
    handleError(error);
  }
}

// Reset mật khẩu user
export async function resetPassword(id_user) {
  const url = `${NEXT_PUBLIC_API_URL}/api/Account/reset-password?id_user=${id_user}`;
  console.log("Call API:", url);

  try {
    const res = await axios.put(
      url,
      {},
      {
        headers: getAuthHeader(),
      },
    );
    console.log("Reset mật khẩu thành công", res.data);
    return res.data;
  } catch (error) {
    console.log("Reset mật khẩu thất bại");
    handleError(error);
  }
}

// Đăng ký user
export async function registerUser(data) {
  const url = `${NEXT_PUBLIC_API_URL}/api/Account/Register`;
  console.log("Call API:", url);

  try {
    const res = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Đăng ký user thành công", res.data);
    return res.data;
  } catch (error) {
    console.log("Đăng ký user thất bại");
    handleError(error);
  }
}
