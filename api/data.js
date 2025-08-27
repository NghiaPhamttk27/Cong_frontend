import axios from "axios";
import handleError from "./handleError";
import Cookies from "js-cookie";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getLatesFile() {
  const url = `${NEXT_PUBLIC_API_URL}/api/file/latest`;
  console.log("Call API:", url);

  try {
    const res = await axios.get(url);
    console.log("Lấy danh sách file mới nhất thành công", res.data);
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log("Lấy danh sách file mới nhất thất bại");
    handleError(error);
  }
}

export async function getMostViewFile() {
  const url = `${NEXT_PUBLIC_API_URL}/api/file/top-view`;
  console.log("Call API:", url);

  try {
    const res = await axios.get(url);
    console.log("Lấy danh sách file xem nhiều nhất thành công", res.data);
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log("Lấy danh sách file mới nhất thất bại");
    handleError(error);
  }
}

export async function getDataToChuc() {
  const url = `${NEXT_PUBLIC_API_URL}/api/file/top-sobannganh`;
  console.log("Call API:", url);

  try {
    const res = await axios.get(url);
    console.log("Lấy danh sách Data theo tổ chức thành công", res.data);
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log("Lấy danh sách Data theo tổ chức thất bại");
    handleError(error);
  }
}

export async function getDataTopic() {
  const url = `${NEXT_PUBLIC_API_URL}/api/file/top-chude`;
  console.log("Call API:", url);

  try {
    const res = await axios.get(url);
    console.log("Lấy danh sách Data theo chủ đề thành công", res.data);
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log("Lấy danh sách Data theo chủ đề thất bại");
    handleError(error);
  }
}

export async function uploadFile(data) {
  const url = `${NEXT_PUBLIC_API_URL}/api/file/upload`;
  console.log("Call API:", url);
  const token = Cookies.get("token");

  try {
    const formData = new FormData();
    formData.append("tieuDe", data.tieuDe);
    formData.append("moTa", data.moTa);
    formData.append("id_so_ban_nganh", data.id_so_ban_nganh);
    formData.append("id_phong_ban", data.id_phong_ban);
    formData.append("id_chu_de", data.id_chu_de);
    formData.append("file", data.file); // file phải là File object (trong browser) hoặc fs.ReadStream (Node.js)

    const res = await axios.post(url, formData, {
      params: { tieuDe: data.tieuDe }, // query param
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Upload file thành công", res.data);
    return res.data;
  } catch (error) {
    console.log("Upload file thất bại");
    handleError(error);
  }
}

export async function deleteFile(id_file) {
  const url = `${NEXT_PUBLIC_API_URL}/api/file/delete`;
  console.log("Call API:", url, "with id_file:", id_file);
  const token = Cookies.get("token");

  try {
    const res = await axios.delete(url, {
      params: { id_file },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Xóa file thành công", res.data);

    return res.data;
  } catch (error) {
    console.log("Xóa file thất bại");
    handleError(error);
  }
}

export async function getFileDetail(id_file) {
  const url = `${NEXT_PUBLIC_API_URL}/api/file/get`;
  console.log("Call API:", url);

  try {
    const res = await axios.get(url, {
      params: { id_file },
    });

    console.log("Lấy chi tiết file thành công", res.data);
    return res.data;
  } catch (error) {
    console.log("Lấy chi tiết file thất bại");
    handleError(error);
  }
}

export async function downloadFile(id_file) {
  const url = `${NEXT_PUBLIC_API_URL}/api/file/download`;
  console.log("Call API:", url);

  try {
    const res = await axios.get(url, {
      params: { id_file },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Download file thành công", res.data);
    return res.data;
  } catch (error) {
    console.log("Download file thất bại");
    handleError(error);
  }
}

export async function replaceFile(id_file, file) {
  const url = `${NEXT_PUBLIC_API_URL}/api/file/replace`;
  console.log("Call API:", url, "with id_file:", id_file);
  const token = Cookies.get("token");

  try {
    const formData = new FormData();
    formData.append("file", file); // truyền file

    const res = await axios.post(url, formData, {
      params: { id_file: id_file },
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Thay thế file thành công", res.data);
    return res.data;
  } catch (error) {
    console.log("Thay thế file thất bại");
    handleError(error);
  }
}
