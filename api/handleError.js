const handleError = (error) => {
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;

    console.log("⚠️ Lỗi từ server:", data);
    throw new Error(`${JSON.stringify(data)}`);
  } else if (error.request) {
    console.log("⚠️ Không có phản hồi từ server:", error.request);
    throw new Error("Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng.");
  } else {
    console.log("⚠️ Lỗi không xác định:", error.message);
    throw new Error("Đã xảy ra lỗi không xác định: " + error.message);
  }
};

export default handleError;
