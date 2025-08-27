import axios from "axios";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

// Hàm gọi API
export async function search({
  Keyword = "",
  ChuDeIds = [],
  SoBanNganhIds = [],
  PhongBanIds = [],
  Mode = "and",
}) {
  const url = `${NEXT_PUBLIC_API_URL}/api/file/search`;

  try {
    const res = await axios.post(url, {
      Keyword,
      ChuDeIds,
      SoBanNganhIds,
      PhongBanIds,
      Mode,
    });

    return res.data;
  } catch (error) {
    console.error(
      "Lỗi khi gọi search API:",
      error.response?.data || error.message
    );
    throw error;
  }
}
