import axios from "axios";
import handleError from "./handleError";
import Cookies from "js-cookie";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getListTochucByRole() {
  const url = `${NEXT_PUBLIC_API_URL}/api/sobannganh/list-by-role`;
  console.log("Call API:", url);
  const token = Cookies.get("token");

  try {
    const res = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Lấy danh sách tổ chức thành công", res.data);

    return res.data;
  } catch (error) {
    console.log("Lấy danh sách tổ chức thất bại");
    handleError(error);
  }
}

export async function getListPhongBanByRole(Id_so_ban_nganh) {
  const url = `${NEXT_PUBLIC_API_URL}/api/phongban/list-by-sbn-role`;
  console.log("Call API:", url);
  const token = Cookies.get("token");

  try {
    const res = await axios.get(url, {
      params: { Id_so_ban_nganh: Id_so_ban_nganh },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Lấy danh sách phòng ban thành công", res.data);

    return res.data;
  } catch (error) {
    console.log("Lấy danh sách phòng ban thất bại");
    handleError(error);
  }
}

export async function getFolderByPhongbanByRole(id_phong_ban) {
  const url = `${API_URL}/api/fodler/list-by-phongban-role`;
  console.log("Call API:", url, "with id_phong_ban:", id_phong_ban);
  const token = Cookies.get("token");

  try {
    const res = await axios.get(url, {
      params: { id_phongban: id_phong_ban },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Lấy danh sách folder theo phòng ban thành công", res.data);
    return res.data;
  } catch (error) {
    console.log("Lấy danh sách folder theo phòng ban thất bại");
    handleError(error);
  }
}

export async function getListFileByRole() {
  const url = `${API_URL}/api/file/list`;
  console.log("Call API:", url);
  const token = Cookies.get("token");

  try {
    const res = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Lấy danh sách file", res.data);
    return res.data;
  } catch (error) {
    console.log("Lấy danh sách file");
    handleError(error);
  }
}
