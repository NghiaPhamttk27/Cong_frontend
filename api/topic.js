import axios from "axios";
import handleError from "./handleError";
import Cookies from "js-cookie";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getListTopics() {
  const url = `${NEXT_PUBLIC_API_URL}/api/chude/list`;
  console.log("Call API:", url);

  try {
    const res = await axios.get(url);
    console.log("Lấy danh sách lĩnh vực thành công", res.data);

    return res.data;
  } catch (error) {
    console.log("Lấy danh sách lĩnh vực thất bại");
    handleError(error);
  }
}

export async function getDetailTopic(id_chu_de) {
  const url = `${NEXT_PUBLIC_API_URL}/api/chude/get`;
  console.log("Call API:", url);

  try {
    const res = await axios.get(url, {
      params: { id_chu_de },
    });
    console.log("Lấy lĩnh vực thành công", res.data);
    return res.data;
  } catch (error) {
    console.error("Lấy lĩnh vực thất bại:", error);
    return null; // hoặc throw error nếu muốn bắt ở ngoài
  }
}

export async function createTopic(data) {
  const url = `${NEXT_PUBLIC_API_URL}/api/chude/create`;
  console.log("Call API:", url);
  const token = Cookies.get("token");

  try {
    const res = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Tạo lĩnh vực thành công", res.data);

    return res.data;
  } catch (error) {
    console.log("Tạo lĩnh vực thất bại");
    handleError(error);
  }
}

export async function updateTopic(id_chu_de, data) {
  const url = `${NEXT_PUBLIC_API_URL}/api/chude/update`;
  console.log("Call API:", url, "with id:", id_chu_de);
  const token = Cookies.get("token");

  try {
    const res = await axios.put(url, data, {
      params: { id_chu_de },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Cập nhật lĩnh vực thành công", res.data);

    return res.data;
  } catch (error) {
    console.log("Cập nhật lĩnh vực thất bại");
    handleError(error);
  }
}

export async function deleteTopic(id_chu_de) {
  const url = `${NEXT_PUBLIC_API_URL}/api/chude/delete`;
  console.log("Call API:", url, "with id:", id_chu_de);
  const token = Cookies.get("token");

  try {
    const res = await axios.delete(url, {
      params: { id_chu_de },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Xóa lĩnh vực thành công", res.data);

    return res.data;
  } catch (error) {
    console.log("Xóa lĩnh vực thất bại");
    handleError(error);
  }
}

export async function replaceFile(id_file, file) {
  const url = `${NEXT_PUBLIC_API_URL}/api/file/replace`;
  console.log("Call API:", url, "with id_file:", id_file);
  const token = Cookies.get("token");

  try {
    const formData = new FormData();
    formData.append("id_file", id_file); // truyền id_file
    formData.append("file", file); // truyền file

    const res = await axios.post(url, formData, {
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
