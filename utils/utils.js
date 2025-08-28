// utils/fileUtils.js

export const formatColorsFileType = (fileType) => {
  if (!fileType) return "#9e9e9e"; // default grey

  switch (fileType.toUpperCase()) {
    case "DOC":
      return "#112d89ff"; // xanh dương (Word)
    case "XLS":
      return "#228225ff"; // xanh lá (Excel)
    case "PPT":
      return "#a6690dff"; // cam (PowerPoint)
    case "PDF":
      return "#9b1d14ff"; // đỏ (PDF)
    default:
      return "#9e9e9e"; // xám (UNKNOWN)
  }
};

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

export const formatLink = (link) => {
  return `https://view.officeapps.live.com/op/view.aspx?src=${link}`;
};
