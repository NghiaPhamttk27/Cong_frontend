import axios from "axios";
import handleError from "./handleError";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

// Hàm gọi API
export async function search({
  Keyword = "",
  ChuDeIds = [],
  SoBanNganhIds = [],
  PhongBanIds = [],
  FolderIds = [], // 👈 thêm tham số folder
  Mode = "and",
}) {
  const url = `${NEXT_PUBLIC_API_URL}/api/file/search`;

  try {
    const res = await axios.post(url, {
      Keyword,
      ChuDeIds,
      SoBanNganhIds,
      PhongBanIds,
      FolderIds, // 👈 truyền lên API
      Mode,
    });

    return res.data;
  } catch (error) {
    console.log("Lỗi khi gọi search API:");
    handleError(error);
  }
}
