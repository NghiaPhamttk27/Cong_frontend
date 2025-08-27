const handleError = (error) => {
  // Ưu tiên lấy message từ response nếu có
  const serverMessage =
    error?.response?.data?.Message ||
    error?.response?.data?.message ||
    error?.Message ||
    error?.message;

  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;

    console.log("⚠️ Lỗi từ server:", data);

    // Nếu có message cụ thể thì trả về
    throw new Error(serverMessage || `Lỗi từ server: ${status}`);
  } else if (error.request) {
    console.log("⚠️ Không có phản hồi từ server:", error.request);
    throw new Error(
      serverMessage || "Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng."
    );
  } else {
    console.log("⚠️ Lỗi không xác định:", error.message);
    throw new Error(serverMessage || "Đã xảy ra lỗi không xác định.");
  }
};

export default handleError;
