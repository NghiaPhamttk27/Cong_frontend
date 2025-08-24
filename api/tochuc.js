import axios from "axios";
import handleError from "./handleError";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getListTochuc() {
  const url = `${NEXT_PUBLIC_API_URL}/api/sobannganh/list`;
  console.log("Call API:", url);

  try {
    const res = await axios.get(url);
    console.log("Lấy danh sách tổ chức thành công", res.data);

    return res.data;
  } catch (error) {
    console.log("Lấy danh sách tổ chức thất bại");
    handleError(error);
  }
}

export async function getListPhongBan(Id_so_ban_nganh) {
  const url = `${NEXT_PUBLIC_API_URL}/api/phongban/list-by-sbn/${Id_so_ban_nganh}`;
  console.log("Call API:", url);

  try {
    const res = await axios.get(url);
    console.log("Lấy danh sách phòng ban thành công", res.data);

    return res.data;
  } catch (error) {
    console.log("Lấy danh sách phòng ban thất bại");
    handleError(error);
  }
}
