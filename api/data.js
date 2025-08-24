import axios from "axios";
import handleError from "./handleError";

export async function getLatesFile() {
  const url = `/api/file/latest`;
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
  const url = `/api/file/top-view`;
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
  const url = `/api/file/top-sobannganh`;
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
  const url = `/api/file/top-chude`;
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
