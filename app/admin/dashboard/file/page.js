"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Checkbox,
  Box,
  Snackbar,
  Alert,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Link,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate } from "@/utils/utils";
import { uploadFile, deleteFile, replaceFile } from "@/api/data";
import { search } from "@/api/search";
import { getListTochuc, getListPhongBan } from "@/api/tochuc";
import { getListTopics } from "@/api/topic";
import CustomModal from "@/components/customModal";
import { formatLink } from "@/utils/utils";

export default function FilesPage() {
  const [dataFiles, setDataFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);

  // --- UI state ---
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalReplace, setOpenModalReplace] = useState(false);
  const [idFileReplace, setIdFileReplace] = useState(null);

  const [idFile, setIdFile] = useState("");
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [message, setMessage] = useState("");

  // --- Dropdown data ---
  const [dataTochuc, setDataTochuc] = useState([]);
  const [dataPhongban, setDataPhongban] = useState([]);
  const [dataTopics, setDataTopics] = useState([]);

  const openReplaceModal = (id_file) => {
    setIdFileReplace(id_file);
    setOpenModalReplace(true);
  };

  const handleReplaceFile = async (newFile) => {
    try {
      await replaceFile(idFileReplace, newFile);
      setAlertType("success");
      setMessage("Thay thế file thành công!");
      setOpen(true);
      setOpenModalReplace(false);
      fetchFiles();
    } catch (error) {
      setAlertType("error");
      setMessage(error.message || "Thay thế file thất bại!");
      setOpen(true);
    }
  };

  const fetchFiles = async () => {
    try {
      const data = await search({
        Keyword: "",
        ChuDeIds: [],
        SoBanNganhIds: [],
        PhongBanIds: [],
        Mode: "and",
      });
      setDataFiles(data);
    } catch (err) {
      console.error("Lỗi khi lấy files:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTochucs = async () => {
    try {
      const data = await getListTochuc();
      setDataTochuc(data);
    } catch (err) {
      console.error("Lỗi khi lấy tochucs:", err);
    }
  };

  const fetchPhongbans = async (Id_so_ban_nganh) => {
    try {
      if (!Id_so_ban_nganh) {
        setDataPhongban([]);
        return;
      }
      const data = await getListPhongBan(Id_so_ban_nganh);
      setDataPhongban(data);
    } catch (err) {
      console.error("Lỗi khi lấy phongbans:", err);
    }
  };

  const fetchTopics = async () => {
    try {
      const data = await getListTopics();
      setDataTopics(data);
    } catch (err) {
      console.error("Lỗi khi lấy topics:", err);
    }
  };

  useEffect(() => {
    fetchFiles();
    fetchTochucs();
    fetchTopics();
  }, []);

  // --- CRUD ---
  const handleDeleteFile = async () => {
    try {
      await deleteFile(idFile);
      setAlertType("success");
      setMessage("Xóa file thành công!");
      setOpen(true);
      setOpenModalDelete(false);
      fetchFiles();
    } catch (error) {
      setAlertType("error");
      setMessage(error.message || "Xóa file thất bại!");
      setOpen(true);
    }
  };

  const handleUploadFile = async (
    file,
    tieuDe,
    moTa,
    id_tochuc,
    id_phongban,
    id_chude
  ) => {
    try {
      await uploadFile({
        file,
        tieuDe,
        moTa,
        id_so_ban_nganh: id_tochuc,
        id_phong_ban: id_phongban,
        id_chu_de: id_chude,
      });
      setAlertType("success");
      setMessage("Upload file thành công!");
      setOpen(true);
      setOpenModalCreate(false);
      fetchFiles();
    } catch (error) {
      setAlertType("error");
      setMessage(error.message || "Upload file thất bại!");
      setOpen(true);
    }
  };

  const openDeleteModal = (id_file) => {
    setIdFile(id_file);
    setOpenModalDelete(true);
  };

  const toggleRow = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isSelected = (id) => selected.includes(id);

  if (loading) return <p>Đang tải...</p>;

  return (
    <Paper sx={{ padding: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenModalCreate(true)}
        sx={{ marginBottom: 2 }}
      >
        Tải File
      </Button>

      {/* {selected.length > 0 && (
        <Box mb={2}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              selected.forEach((id) => deleteFile(id));
              setSelected([]);
              fetchFiles();
            }}
          >
            Xóa {selected.length} file
          </Button>
        </Box>
      )} */}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={alertType} onClose={() => setOpen(false)}>
          {message}
        </Alert>
      </Snackbar>

      {/* Modal upload */}
      <UploadFileForm
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        handleUploadFile={handleUploadFile}
        dataTochuc={dataTochuc}
        dataPhongban={dataPhongban}
        dataTopics={dataTopics}
        fetchPhongbans={fetchPhongbans}
      />

      {/* Modal xóa */}
      <DeleteFileForm
        openModalDelete={openModalDelete}
        setOpenModalDelete={setOpenModalDelete}
        handleDeleteFile={handleDeleteFile}
      />

      <ReplaceFileForm
        openModalReplace={openModalReplace}
        setOpenModalReplace={setOpenModalReplace}
        handleReplaceFile={handleReplaceFile}
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>STT</TableCell>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Tổ chức</TableCell>
              <TableCell>Phòng ban</TableCell>
              <TableCell>Chủ đề</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataFiles.map((file, index) => (
              <TableRow
                key={file.Id_file || index}
                hover
                onClick={() => toggleRow(file.Id_file)}
                selected={isSelected(file.Id_file)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={isSelected(file.Id_file)} />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{file.TieuDe}</TableCell>
                <TableCell>{file.MoTa}</TableCell>
                <TableCell>{file.SoBanNganh?.TenSoBanNganh}</TableCell>
                <TableCell>{file.PhongBan?.TenPhongBan}</TableCell>
                <TableCell>{file.ChuDe?.TenChuDe}</TableCell>
                <TableCell>{formatDate(file.NgayTao)}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  {/* Xem trước */}
                  <Link
                    href={formatLink(file.FileUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconButton color="info" size="small">
                      <VisibilityIcon />
                    </IconButton>
                  </Link>

                  {/* Tải xuống */}
                  <Link href={file.FileUrl} target="" rel="noopener noreferrer">
                    <IconButton color="success" size="small">
                      <DownloadIcon />
                    </IconButton>
                  </Link>

                  {/* Thay thế */}
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => openReplaceModal(file.Id_file)}
                  >
                    <EditIcon />
                  </IconButton>

                  {/* Xoá */}
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => openDeleteModal(file.Id_file)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

const UploadFileForm = ({
  openModalCreate,
  setOpenModalCreate,
  handleUploadFile,
  dataTochuc,
  dataPhongban,
  dataTopics,
  fetchPhongbans,
}) => {
  const [tieuDe, setTieuDe] = useState("");
  const [moTa, setMoTa] = useState("");
  const [file, setFile] = useState(null);
  const [selectedTochuc, setSelectedTochuc] = useState("");
  const [selectedPhongban, setSelectedPhongban] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  // Khi chọn tổ chức -> gọi API load phòng ban
  const handleChangeTochuc = (id) => {
    setSelectedTochuc(id);
    setSelectedPhongban(""); // reset phòng ban
    fetchPhongbans(id); // gọi API với tổ chức đã chọn
  };

  return (
    <CustomModal
      open={openModalCreate}
      onClose={() => setOpenModalCreate(false)}
      type="form"
      title="Upload file"
      content={
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Tiêu đề"
            value={tieuDe}
            onChange={(e) => setTieuDe(e.target.value)}
            fullWidth
          />
          <TextField
            label="Mô tả"
            value={moTa}
            onChange={(e) => setMoTa(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />

          {/* Dropdown chọn tổ chức */}
          <TextField
            select
            label="Tổ chức"
            value={selectedTochuc}
            onChange={(e) => handleChangeTochuc(e.target.value)}
            fullWidth
          >
            {dataTochuc.map((tc) => (
              <MenuItem key={tc.Id_so_ban_nganh} value={tc.Id_so_ban_nganh}>
                {tc.TenSoBanNganh}
              </MenuItem>
            ))}
          </TextField>

          {/* Dropdown chọn phòng ban */}
          <TextField
            select
            label="Phòng ban"
            value={selectedPhongban}
            onChange={(e) => setSelectedPhongban(e.target.value)}
            fullWidth
            disabled={!selectedTochuc} // chỉ enable khi chọn tổ chức
          >
            {dataPhongban.map((pb) => (
              <MenuItem key={pb.Id_phong_ban} value={pb.Id_phong_ban}>
                {pb.TenPhongBan}
              </MenuItem>
            ))}
          </TextField>

          {/* Dropdown chọn chủ đề */}
          <TextField
            select
            label="Chủ đề"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            fullWidth
          >
            {dataTopics.map((tp) => (
              <MenuItem key={tp.Id_chu_de} value={tp.Id_chu_de}>
                {tp.TenChuDe}
              </MenuItem>
            ))}
          </TextField>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ marginTop: "10px" }}
          />
        </Box>
      }
      footer={
        <Button
          variant="contained"
          color="warning"
          onClick={() =>
            handleUploadFile(
              file,
              tieuDe,
              moTa,
              selectedTochuc,
              selectedPhongban,
              selectedTopic
            )
          }
        >
          Upload
        </Button>
      }
    />
  );
};

const DeleteFileForm = ({
  handleDeleteFile,
  openModalDelete,
  setOpenModalDelete,
}) => {
  return (
    <CustomModal
      open={openModalDelete}
      onClose={() => setOpenModalDelete(false)}
      type="error"
      title="Xóa file"
      content={
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography>Bạn có chắc chắn muốn xóa file này không?</Typography>
        </Box>
      }
      footer={
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDeleteFile()}
        >
          Xóa
        </Button>
      }
    />
  );
};

const ReplaceFileForm = ({
  openModalReplace,
  setOpenModalReplace,
  handleReplaceFile,
}) => {
  const [file, setFile] = useState(null);

  return (
    <CustomModal
      open={openModalReplace}
      onClose={() => setOpenModalReplace(false)}
      type="form"
      title="Thay thế file"
      content={
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography>Chọn file mới để thay thế:</Typography>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </Box>
      }
      footer={
        <Button
          variant="contained"
          color="warning"
          onClick={() => handleReplaceFile(file)}
          disabled={!file}
        >
          Thay thế
        </Button>
      }
    />
  );
};
