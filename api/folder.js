import axios from "axios";
import Cookies from "js-cookie";
import handleError from "./handleError";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function createFolder(id_phong_ban, data) {
  const url = `${API_URL}/api/fodler/create`;
  console.log("Call API:", url, "with id_phong_ban:", id_phong_ban);
  const token = Cookies.get("token");

  try {
    const res = await axios.post(url, data, {
      params: { id_phong_ban },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Tạo folder thành công", res.data);

    return res.data;
  } catch (error) {
    console.log("Tạo folder thất bại");
    handleError(error);
  }
}

export async function updateFolder(id_folder, data) {
  const url = `${API_URL}/api/fodler/update`;
  console.log("Call API:", url, "with id_folder:", id_folder);
  const token = Cookies.get("token");

  try {
    const res = await axios.put(url, data, {
      params: { id_folder },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Cập nhật folder thành công", res.data);

    return res.data;
  } catch (error) {
    console.log("Cập nhật folder thất bại");
    handleError(error);
  }
}

export async function deleteFolder(id_folder, data) {
  const url = `${API_URL}/api/fodler/delete`;
  console.log("Call API:", url, "with id_folder:", id_folder);
  const token = Cookies.get("token");

  try {
    const res = await axios.delete(url, {
      params: { id_folder },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data, // API delete có yêu cầu body
    });
    console.log("Xóa folder thành công", res.data);

    return res.data;
  } catch (error) {
    console.log("Xóa folder thất bại");
    handleError(error);
  }
}

export async function getFolderByPhongban(id_phong_ban) {
  const url = `${API_URL}/api/fodler/list-by-phongban`;
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

export async function getDetailFolder(id_folder) {
  const url = `${API_URL}/api/fodler/detail-folder`;
  console.log("Call API:", url);
  const token = Cookies.get("token");

  try {
    const res = await axios.get(url, {
      params: { id_folder: id_folder },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Lấy chi tiết folder thành công", res.data);
    return res.data;
  } catch (error) {
    console.log("Lấy chi tiết folder thất bại");
    handleError(error);
  }
}
