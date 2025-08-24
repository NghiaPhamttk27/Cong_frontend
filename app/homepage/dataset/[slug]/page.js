"use client";
// components/DatasetDetail.js
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, colors } from "@mui/material";
import { use } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DownloadIcon from "@mui/icons-material/Download";

// Dữ liệu giả định được lấy từ API
const fakeDatasetData = {
  title: "Cơ sở dữ liệu về trạm thu phát sóng",
  metadata: {
    subject: "Công nghệ thông tin - Truyền thông",
    organization: "Sở Khoa học và Công nghệ",
    updatedDate: "07/03/2025",
  },
  description: {
    description: "Trạm thu phát sóng trên địa bàn Tỉnh",
    releaseDate: "07/03/2025",
    updatedDate: "07/03/2025",
    identifier: "fdcad64d-5505-48f0-a20d-1a74f39fe40f",
    updateFrequency: "Không thường xuyên",
    accessLevel: "Công khai",
    contactInfo: "Ngô Ngọc Duy (skhcn@yenbai.gov.vn)",
    url: "https://data.yenbai.gov.vn/dataset/Co-so-du-lieu-ve-tram-thu-phat-song",
    views: 31,
    downloads: 3,
  },
  distributions: [
    {
      fileId: "file_json_12345",
      title: "API phân phối trạm BTS",
      releaseDate: "09/03/2025",
      format: "JSON",
      size: "1,2 MB",
    },
    {
      fileId: "file_xlsx_67890",
      title: "Cơ sở dữ liệu thống kê",
      releaseDate: "09/03/2025",
      format: "XLSX",
      size: "2,5 MB",
    },
  ],
};

const docs = [
  {
    uri: "https://localhost:44348/uploads/63e0826c-366e-45cb-a625-10bcb5664441.docx",
  },
];

// Định nghĩa các đối tượng style inline
const styles = {
  container: {
    padding: "50px 300px",
    fontFamily: "sans-serif",
  },
  header: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  metadataContainer: {
    display: "flex",
    gap: "20px",
    color: "#555",
    fontSize: "0.9rem",
    marginBottom: "30px",
    flexWrap: "wrap",
  },
  metadataItem: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  metadataIcon: {
    color: "#007bff",
    fontSize: "1.2rem",
  },
  metadataLink: {
    color: "#007bff",
    fontWeight: "600",
  },
  tabsContainer: {
    display: "flex",
    borderBottom: "1px solid #ddd",
    marginBottom: "20px",
  },
  tab: {
    padding: "10px 20px",
    cursor: "pointer",
    border: "1px solid transparent",
    borderBottom: "none",
    color: "#666",
    fontWeight: "600",
  },
  activeTab: {
    border: "1px solid #ddd",
    borderBottom: "none",
    backgroundColor: "#fff",
    color: "#007bff",
  },
  contentBox: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "20px",
    backgroundColor: "#fff",
    lineHeight: 1.5,
  },
  contentTitle: {
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
  },
  descriptionRow: {
    display: "flex",
    marginBottom: "10px",
    alignItems: "flex-start",
  },
  descriptionLabel: {
    fontWeight: "bold",
    color: "#555",
    minWidth: "150px",
  },
  descriptionValue: {
    color: "#333",
    flex: 1,
  },
  descriptionLink: {
    color: "#007bff",
    textDecoration: "none",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "600",
    color: "#555",
    padding: "12px 15px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
  tableRow: {
    borderBottom: "1px solid #eee",
  },
  tableCell: {
    padding: "12px 15px",
    color: "#333",
    textAlign: "left",
  },
  formatPill: {
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "0.8rem",
    fontWeight: "bold",
    color: "#fff",
  },
};

export default function DatasetDetail({ params }) {
  const resolvedParams = use(params); // unwrap Promise
  const { slug } = resolvedParams;
  const [datasetData, setDatasetData] = useState(null);

  useEffect(() => {
    if (slug) {
      // Giả lập việc gọi API
      // Thay thế bằng fetch(`/api/dataset/${slug}`).then(...)
      setDatasetData(fakeDatasetData);
    }
  }, [slug]);

  if (!datasetData) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* HEADER SECTION */}
      <h1 style={styles.header}>{datasetData.title}</h1>

      <div style={styles.metadataContainer}>
        <div style={styles.metadataItem}>
          <span style={styles.metadataIcon}>
            <i className="fas fa-folder"></i>
          </span>
          Chủ đề:
          <span style={styles.metadataLink}>
            {datasetData.metadata.subject}
          </span>
        </div>
        <div style={styles.metadataItem}>
          <span style={styles.metadataIcon}>
            <i className="fas fa-sitemap"></i>
          </span>
          Tổ chức:
          <span style={styles.metadataLink}>
            {datasetData.metadata.organization}
          </span>
        </div>
        <div style={styles.metadataItem}>
          <span style={styles.metadataIcon}>
            <i className="fas fa-calendar-alt"></i>
          </span>
          Ngày cập nhật: {datasetData.metadata.updatedDate}
        </div>
      </div>

      {/* TABS */}
      {/* <div style={styles.tabsContainer}>
        <div style={{ ...styles.tab, ...styles.activeTab }}>Dữ liệu</div>
        <div style={styles.tab}>Mô tả dữ liệu</div>
        <div style={styles.tab}>Dữ liệu liên quan</div>
      </div> */}

      {/* CONTENT BOX */}
      <div style={styles.contentBox}>
        <div style={styles.descriptionRow}>
          <span style={styles.descriptionLabel}>Mô tả:</span>
          <span style={styles.descriptionValue}>
            {datasetData.description.description}
          </span>
        </div>
        <div style={styles.descriptionRow}>
          <span style={styles.descriptionLabel}>Ngày phát hành:</span>
          <span style={styles.descriptionValue}>
            {datasetData.description.releaseDate}
          </span>
        </div>
        <div style={styles.descriptionRow}>
          <span style={styles.descriptionLabel}>Ngày cập nhật:</span>
          <span style={styles.descriptionValue}>
            {datasetData.description.updatedDate}
          </span>
        </div>
        <div style={styles.descriptionRow}>
          <span style={styles.descriptionLabel}>Mã định danh:</span>
          <span style={styles.descriptionValue}>
            {datasetData.description.identifier}
          </span>
        </div>
        <div style={styles.descriptionRow}>
          <span style={styles.descriptionLabel}>Tần suất cập nhật:</span>
          <span style={styles.descriptionValue}>
            {datasetData.description.updateFrequency}
          </span>
        </div>
        <div style={styles.descriptionRow}>
          <span style={styles.descriptionLabel}>Mức độ truy cập:</span>
          <span style={styles.descriptionValue}>
            {datasetData.description.accessLevel}
          </span>
        </div>
        <div style={styles.descriptionRow}>
          <span style={styles.descriptionLabel}>Thông tin liên hệ:</span>
          <span style={styles.descriptionValue}>
            {datasetData.description.contactInfo}
          </span>
        </div>
        <div style={styles.descriptionRow}>
          <span style={styles.descriptionLabel}>URL:</span>
          <span style={styles.descriptionValue}>
            <Link
              href={datasetData.description.url}
              style={styles.descriptionLink}
            >
              {datasetData.description.url}
            </Link>
          </span>
        </div>
        <div style={styles.descriptionRow}>
          <span style={styles.descriptionLabel}>Lượt xem:</span>
          <span style={styles.descriptionValue}>
            {datasetData.description.views} lượt xem
          </span>
        </div>
        <div style={styles.descriptionRow}>
          <span style={styles.descriptionLabel}>Lượt tải:</span>
          <span style={styles.descriptionValue}>
            {datasetData.description.downloads} lượt tải
          </span>
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          <Link
            href="https://view.officeapps.live.com/op/view.aspx?src=http://elearning.laocai.gov.vn/Uploads/BaiHocFiles/Excel/0b681cf4-6fc5-4a9e-ad9c-d9efd78a8e56.xlsx"
            // href="https://view.officeapps.live.com/op/view.aspx?src=http://elearning.laocai.gov.vn/Uploads/BaiHocFiles/Words/188dc4e9-eb5b-47e8-9f7d-9657f1572412.docx"
            // href="https://view.officeapps.live.com/op/view.aspx?src=http://elearning.laocai.gov.vn/Uploads/BaiHocFiles/Presentations/1e54ad9d-224a-4557-99dd-20596acfcf6d.pptx"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="contained"
              startIcon={<RemoveRedEyeIcon />}
              sx={{
                backgroundColor: "#ff9800", // màu cam
                "&:hover": {
                  backgroundColor: "#fb8c00", // màu cam đậm khi hover
                },
              }}
            >
              Xem trước
            </Button>
          </Link>
          <Button variant="contained" endIcon={<DownloadIcon />}>
            Tải về
          </Button>
        </div>
      </div>
    </div>
  );
}
