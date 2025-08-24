// utils/fileUtils.js

export const getFileType = (fileName) => {
  if (!fileName) return null;

  const ext = fileName.split(".").pop().toLowerCase();

  switch (ext) {
    case "doc":
    case "docx":
      return "DOC";
    case "xls":
    case "xlsx":
      return "XLS";
    case "ppt":
    case "pptx":
      return "PPT";
    case "pdf":
      return "PDF";
    default:
      return "UNKNOWN";
  }
};

export const formatDate = (dateString) => {
  if (!dateString) return null;

  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // tháng bắt đầu từ 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
