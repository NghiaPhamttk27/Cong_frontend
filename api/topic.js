import axios from "axios";
import handleError from "./handleError";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getListTopics() {
  const url = `${NEXT_PUBLIC_API_URL}/api/chude/list`;
  console.log("Call API:", url);

  try {
    const res = await axios.get(url);
    console.log("Lấy danh sách chủ đề thành công", res.data);

    return res.data;
  } catch (error) {
    console.log("Lấy danh sách chủ đề thất bại");
    handleError(error);
  }
}
