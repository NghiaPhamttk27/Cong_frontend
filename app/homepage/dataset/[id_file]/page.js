"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Button } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DownloadIcon from "@mui/icons-material/Download";
import { getFileDetail, downloadFile } from "@/api/data"; // bạn import từ chỗ bạn đã viết
import { formatLink, formatDate } from "@/utils/utils"; // utils của bạn

const styles = {
  container: {
    padding: "100px 10vw",
    fontFamily: "sans-serif",
  },
  header: {
    fontSize: "35px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  descriptionRow: {
    display: "flex",
    marginBottom: "15px",
    alignItems: "flex-start",
  },
  descriptionLabel: {
    fontWeight: "bold",
    color: "#555",
    minWidth: "170px",
    fontWeight: "bold",
  },
  descriptionValue: {
    color: "#3f3f3fff",
    flex: 1,
    fontWeight: 550,
  },
  descriptionLink: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default function DatasetDetail({ params }) {
  const { id_file } = use(params); // unwrap Promise
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    if (id_file) {
      const fetchData = async () => {
        try {
          const data = await getFileDetail(id_file);
          setFileData(data);
        } catch (error) {
          console.error("Lỗi khi lấy chi tiết file", error);
        }
      };
      fetchData();
    }
  }, [id_file]);

  const handleDownloadFile = async () => {
    try {
      await downloadFile(id_file);
    } catch (error) {}
  };

  if (!fileData) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <h1 style={styles.header}>{fileData.TieuDe}</h1>
      {/* META INFO */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          marginBottom: "20px",
          flexWrap: "wrap",
          fontSize: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span role="img" aria-label="topic">
            🗄️
          </span>
          <span style={{ fontWeight: "bold" }}>Chủ đề:</span>
          <Link
            href={`/homepage/search?topic=${fileData.ChuDe.Id_chu_de}`}
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            {fileData.ChuDe?.TenChuDe}
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span role="img" aria-label="organization">
            🏢
          </span>
          <span style={{ fontWeight: "bold" }}>Tổ chức:</span>
          <Link
            href={`/homepage/search?tochuc=${fileData.SoBanNganh.Id_so_ban_nganh}`}
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            {fileData.SoBanNganh?.TenSoBanNganh}
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span role="img" aria-label="updated">
            📅
          </span>
          <span style={{ fontWeight: "bold" }}>Ngày cập nhật:</span>
          <span>
            {fileData.NgayCapNhat
              ? formatDate(fileData.NgayCapNhat)
              : "Chưa có"}
          </span>
        </div>
      </div>

      <div
        style={{
          padding: 20,
          background: "#ebf5ffff",
          borderRadius: 10,
          border: "solid 1px #f6f6f6ff",
        }}
      >
        {/* THÔNG TIN FILE */}
        <div style={styles.descriptionRow}>
          <span style={styles.descriptionLabel}>Tiêu đề:</span>
          <span style={styles.descriptionValue}>{fileData.TieuDe}</span>
        </div>
        <div style={styles.descriptionRow}>
          <span style={styles.descriptionLabel}>Mô tả:</span>
          <span style={styles.descriptionValue}>{fileData.MoTa}</span>
        </div>
        <div style={styles.descriptionRow}>
          <span style={styles.descriptionLabel}>Tổ chức:</span>
          <span style={styles.descriptionValue}>
            {fileData.SoBanNganh?.TenSoBanNganh}
          </span>
        </div>
        <div style={styles.descriptionRow}>
          <span style={styles.descriptionLabel}>Phòng ban:</span>
          <span style={styles.descriptionValue}>
            {fileData.PhongBan?.TenPhongBan}
          </span>
        </div>
        <div style={styles.descriptionRow}>
          <span style={styles.descriptionLabel}>Chủ đề:</span>
          <span style={styles.descriptionValue}>
            {fileData.ChuDe?.TenChuDe}
          </span>
        </div>
        <div style={styles.descriptionRow}>
          <span style={styles.descriptionLabel}>Mức độ truy cập:</span>
          <span style={{ ...styles.descriptionValue, color: "#5bb683ff" }}>
            Công Khai
          </span>
        </div>
        <div style={styles.descriptionRow}>
          <span style={styles.descriptionLabel}>Ngày tạo:</span>
          <span style={styles.descriptionValue}>
            {formatDate(fileData.NgayTao)}
          </span>
        </div>
        <div style={styles.descriptionRow}>
          <span style={styles.descriptionLabel}>Ngày cập nhật:</span>
          <span style={styles.descriptionValue}>
            {fileData.NgayCapNhat
              ? formatDate(fileData.NgayCapNhat)
              : "Chưa có "}
          </span>
        </div>
        <div style={styles.descriptionRow}>
          <span style={styles.descriptionLabel}>Đường dẫn file:</span>
          <span style={styles.descriptionValue}>
            <Link href={fileData.FileUrl} style={styles.descriptionLink}>
              {fileData.FileUrl}
            </Link>
          </span>
        </div>
        <div style={styles.descriptionRow}>
          <span style={styles.descriptionLabel}>Lượt xem:</span>
          <span style={styles.descriptionValue}>{fileData.So_lươt_xem}</span>
        </div>
        <div style={styles.descriptionRow}>
          <span style={styles.descriptionLabel}>Lượt tải:</span>
          <span style={styles.descriptionValue}>{fileData.So_lươt_tai}</span>
        </div>

        {/* ACTIONS */}
        <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
          <Link
            href={formatLink(fileData.FileUrl)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="contained"
              startIcon={<RemoveRedEyeIcon />}
              sx={{
                backgroundColor: "#ff9800",
                "&:hover": { backgroundColor: "#fb8c00" },
              }}
            >
              Xem trước
            </Button>
          </Link>
          <Link href={fileData.FileUrl} target="" rel="noopener noreferrer">
            <Button
              variant="contained"
              endIcon={<DownloadIcon />}
              onClick={handleDownloadFile}
            >
              Tải về
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
