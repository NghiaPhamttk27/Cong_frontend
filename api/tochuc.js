import axios from "axios";
import handleError from "./handleError";
import Cookies from "js-cookie";

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
  const url = `${NEXT_PUBLIC_API_URL}/api/phongban/list-by-sbn`;
  console.log("Call API:", url);

  try {
    const res = await axios.get(url, {
      params: { Id_so_ban_nganh: Id_so_ban_nganh },
    });
    console.log("Lấy danh sách phòng ban thành công", res.data);

    return res.data;
  } catch (error) {
    console.log("Lấy danh sách phòng ban thất bại");
    handleError(error);
  }
}

export async function getDetailTochuc(id_so_ban_nganh) {
  const url = `${NEXT_PUBLIC_API_URL}/api/sobannganh/get`;
  console.log("Call API:", url);

  try {
    const res = await axios.get(url, {
      params: { id_so_ban_nganh },
    });

    console.log("Lấy chi tiết tổ chức thành công", res.data);
    return res.data;
  } catch (error) {
    console.log("Lấy chi tiết tổ chức thất bại");
    handleError(error);
  }
}

export async function createTochuc(data) {
  const url = `${NEXT_PUBLIC_API_URL}/api/sobannganh/create`;
  console.log("Call API:", url);
  const token = Cookies.get("token");

  try {
    const res = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Tạo tổ chức thành công", res.data);

    return res.data;
  } catch (error) {
    console.log("Tạo tổ chức thất bại");
    handleError(error);
  }
}

export async function updateTochuc(id_so_ban_nganh, data) {
  const url = `${NEXT_PUBLIC_API_URL}/api/sobannganh/update`;
  console.log("Call API:", url, "with id:", id_so_ban_nganh);
  const token = Cookies.get("token");

  try {
    const res = await axios.put(url, data, {
      params: { id_so_ban_nganh },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Cập nhật tổ chức thành công", res.data);

    return res.data;
  } catch (error) {
    console.log("Cập nhật tổ chức thất bại");
    handleError(error);
  }
}

export async function deleteTochuc(id_so_ban_nganh) {
  const url = `${NEXT_PUBLIC_API_URL}/api/sobannganh/delete`;
  console.log("Call API:", url, "with id:", id_so_ban_nganh);
  const token = Cookies.get("token");

  try {
    const res = await axios.delete(url, {
      params: { id_so_ban_nganh },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Xóa tổ chức thành công", res.data);

    return res.data;
  } catch (error) {
    console.log("Xóa tổ chức thất bại");
    handleError(error);
  }
}

export async function createPhongban(id_so_ban_nganh, data) {
  const url = `${NEXT_PUBLIC_API_URL}/api/phongban/create`;
  console.log("Call API:", url, "with id_so_ban_nganh:", id_so_ban_nganh);
  const token = Cookies.get("token");

  try {
    const res = await axios.post(url, data, {
      params: { id_so_ban_nganh },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Tạo phòng ban thành công", res.data);

    return res.data;
  } catch (error) {
    console.log("Tạo phòng ban thất bại");
    handleError(error);
  }
}

export async function updatePhongban(id_phong_ban, data) {
  const url = `${NEXT_PUBLIC_API_URL}/api/phongban/update`;
  console.log("Call API:", url, "with id_phong_ban:", id_phong_ban);
  const token = Cookies.get("token");

  try {
    const res = await axios.put(url, data, {
      params: { id_phong_ban },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Cập nhật phòng ban thành công", res.data);

    return res.data;
  } catch (error) {
    console.log("Cập nhật phòng ban thất bại");
    handleError(error);
  }
}

export async function deletePhongban(id_phong_ban) {
  const url = `${NEXT_PUBLIC_API_URL}/api/phongban/delete`;
  console.log("Call API:", url, "with id_phong_ban:", id_phong_ban);
  const token = Cookies.get("token");

  try {
    const res = await axios.delete(url, {
      params: { id_phong_ban },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Xóa phòng ban thành công", res.data);

    return res.data;
  } catch (error) {
    console.log("Xóa phòng ban thất bại");
    handleError(error);
  }
}

export async function getDetailPhongban(id_phong_ban) {
  const url = `${NEXT_PUBLIC_API_URL}/api/phongban/get`;
  console.log("Call API:", url);

  try {
    const res = await axios.get(url, {
      params: { id_phong_ban: id_phong_ban },
    });

    console.log("Lấy chi tiết phòng ban thành công", res.data);
    return res.data;
  } catch (error) {
    console.log("Lấy chi tiết phòng ban thất bại");
    handleError(error);
  }
}
