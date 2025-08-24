import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const data = [
  {
    title: "Cơ sở dữ liệu về trạm thu phát sóng",
    description: "Thông tin về các trạm BTS trên địa bàn tỉnh",
    format: "JSON",
    organization: "so-khcn",
    topic: "cntt",
  },
  {
    title: "Danh mục nhiệm vụ KH&CN",
    description: "Danh sách các nhiệm vụ KH&CN năm 2024",
    format: "PDF",
    organization: "so-khcn",
    topic: "khoahoc",
  },
];

// Hàm gọi API
export async function search(query, organization, topic) {
  try {
    // const res = await axios.get(API_URL, {
    //   params: { query, organization, topic },
    // });
    return data;
  } catch (error) {
    console.error("Lỗi khi gọi search API:", error);
    throw error;
  }
}
