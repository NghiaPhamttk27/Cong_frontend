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
  Link,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate, formatLink } from "@/utils/utils";
import { uploadFile, deleteFile, replaceFileV2 } from "@/api/data";
import { search } from "@/api/search";
import { getListTochuc, getListPhongBan } from "@/api/tochuc";
import { getListTopics } from "@/api/topic";
import { getFolderByPhongban } from "@/api/folder";
import CustomModal from "@/components/customModal";
import Cookies from "js-cookie";

export default function FilesPage() {
  const id_so_ban_nganh = Cookies.get("id_so_ban_nganh");
  const [dataFiles, setDataFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);

  // --- UI state ---
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalReplace, setOpenModalReplace] = useState(false);

  const [idFile, setIdFile] = useState("");

  // --- Alert ---
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [message, setMessage] = useState("");

  // --- Dropdown data ---
  const [dataTochuc, setDataTochuc] = useState([]);
  const [dataTopics, setDataTopics] = useState([]);

  const fetchFiles = async () => {
    try {
      const data = await search({
        Keyword: "",
        ChuDeIds: [],
        SoBanNganhIds: [id_so_ban_nganh],
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
    tuKhoa,
    id_tochuc,
    id_phongban,
    id_chude,
    id_folder
  ) => {
    try {
      await uploadFile({
        file,
        tieuDe,
        moTa,
        tuKhoa,
        id_so_ban_nganh: id_tochuc,
        id_phong_ban: id_phongban,
        id_chu_de: id_chude,
        id_folder: id_folder,
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

      {/* Thông báo */}
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
        open={openModalCreate}
        onClose={() => setOpenModalCreate(false)}
        handleUploadFile={handleUploadFile}
        dataTochuc={dataTochuc}
        dataTopics={dataTopics}
      />

      {/* Modal xóa */}
      <DeleteFileForm
        open={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
        handleDeleteFile={handleDeleteFile}
      />

      {/* Modal thay thế */}
      <ReplaceFileForm
        open={openModalReplace}
        onClose={() => setOpenModalReplace(false)}
        dataTochuc={dataTochuc}
        dataTopics={dataTopics}
        currentFile={selected} // <--- CHÚ Ý: selected (object) không phải selected[0]
        handleReplaceFile={async (payload) => {
          try {
            await replaceFileV2(selected.Id_file, payload);

            setAlertType("success");
            setMessage("Thay thế file thành công!");
            setOpen(true);
            setOpenModalReplace(false);
            fetchFiles();
          } catch (error) {
            console.error("Lỗi replace:", error);
            setAlertType("error");
            setMessage(error?.message || "Thay thế file thất bại!");
            setOpen(true);
          }
        }}
      />

      {/* Table danh sách */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>STT</TableCell>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Từ khóa</TableCell>
              <TableCell>Tổ chức</TableCell>
              <TableCell>Phòng ban</TableCell>
              <TableCell>Thư mục</TableCell>
              <TableCell>Lĩnh vực</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataFiles.map((file, index) => (
              <TableRow key={file.Id_file || index} hover>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{file.TieuDe}</TableCell>
                <TableCell>{file.Tu_Khoa}</TableCell>
                <TableCell>{file.SoBanNganh?.TenSoBanNganh}</TableCell>
                <TableCell>{file.PhongBan?.TenPhongBan}</TableCell>
                <TableCell>{file.Folder?.TenFolder}</TableCell>
                <TableCell>{file.ChuDe?.TenChuDe}</TableCell>
                <TableCell>{formatDate(file.NgayTao)}</TableCell>
                <TableCell>
                  <Link
                    href={
                      file.FileUrl.endsWith(".pdf")
                        ? file.FileUrl
                        : formatLink(file.FileUrl)
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconButton color="info" size="small">
                      <VisibilityIcon />
                    </IconButton>
                  </Link>
                  <Link
                    href={file.FileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconButton color="success" size="small">
                      <DownloadIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => {
                      setSelected(file);
                      setOpenModalReplace(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => {
                      setIdFile(file.Id_file);
                      setOpenModalDelete(true);
                    }}
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

/* ------------------- Upload Form ------------------- */
const UploadFileForm = ({
  open,
  onClose,
  handleUploadFile,
  dataTochuc,
  dataTopics,
}) => {
  const [tieuDe, setTieuDe] = useState("");
  const [moTa, setMoTa] = useState("");
  const [tuKhoa, setTuKhoa] = useState("");
  const [file, setFile] = useState(null);

  const [selectedTochuc, setSelectedTochuc] = useState("");
  const [selectedPhongban, setSelectedPhongban] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  const [dataPhongban, setDataPhongban] = useState([]);
  const [dataFolders, setDataFolders] = useState([]);

  const loadPhongbans = async (idTochuc) => {
    const data = await getListPhongBan(idTochuc);
    setDataPhongban(data);
  };

  const loadFolders = async (idPhongban) => {
    const data = await getFolderByPhongban(idPhongban);
    setDataFolders(data);
  };

  return (
    <CustomModal
      open={open}
      onClose={onClose}
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
          <TextField
            label="Từ khóa"
            value={tuKhoa}
            onChange={(e) => setTuKhoa(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />

          {/* Tổ chức */}
          <TextField
            select
            label="Tổ chức"
            value={selectedTochuc}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedTochuc(val);
              setSelectedPhongban("");
              setSelectedFolder("");
              loadPhongbans(val);
            }}
            fullWidth
          >
            {dataTochuc.map((tc) => (
              <MenuItem key={tc.Id_so_ban_nganh} value={tc.Id_so_ban_nganh}>
                {tc.TenSoBanNganh}
              </MenuItem>
            ))}
          </TextField>

          {/* Phòng ban */}
          <TextField
            select
            label="Phòng ban"
            value={selectedPhongban}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedPhongban(val);
              setSelectedFolder("");
              loadFolders(val);
            }}
            fullWidth
            disabled={!selectedTochuc}
          >
            {dataPhongban.map((pb) => (
              <MenuItem key={pb.Id_phong_ban} value={pb.Id_phong_ban}>
                {pb.TenPhongBan}
              </MenuItem>
            ))}
          </TextField>

          {/* Thư mục */}
          <TextField
            select
            label="Thư mục"
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            fullWidth
            disabled={!selectedPhongban}
          >
            {dataFolders.map((fd) => (
              <MenuItem key={fd.Id_folder} value={fd.Id_folder}>
                {fd.TenFolder}
              </MenuItem>
            ))}
          </TextField>

          {/* Lĩnh vực */}
          <TextField
            select
            label="Lĩnh vực"
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
              tuKhoa,
              selectedTochuc,
              selectedPhongban,
              selectedTopic,
              selectedFolder
            )
          }
        >
          Upload
        </Button>
      }
    />
  );
};

/* ------------------- Delete Form ------------------- */
const DeleteFileForm = ({ open, onClose, handleDeleteFile }) => (
  <CustomModal
    open={open}
    onClose={onClose}
    type="error"
    title="Xóa file"
    content={<Typography>Bạn có chắc chắn muốn xóa file này không?</Typography>}
    footer={
      <Button variant="contained" color="error" onClick={handleDeleteFile}>
        Xóa
      </Button>
    }
  />
);

/* ------------------- Replace Form ------------------- */
const ReplaceFileForm = ({
  open,
  onClose,
  handleReplaceFile,
  dataTochuc,
  dataTopics,
  currentFile,
}) => {
  const [file, setFile] = useState();
  const [tieuDe, setTieuDe] = useState("");
  const [moTa, setMoTa] = useState("");
  const [tuKhoa, setTuKhoa] = useState("");

  const [selectedTochuc, setSelectedTochuc] = useState("");
  const [selectedPhongban, setSelectedPhongban] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");

  const [dataPhongban, setDataPhongban] = useState([]);
  const [dataFolders, setDataFolders] = useState([]);

  const loadPhongbans = async (idTochuc) => {
    const data = await getListPhongBan(idTochuc);
    setDataPhongban(data);
  };

  const loadFolders = async (idPhongban) => {
    const data = await getFolderByPhongban(idPhongban);
    setDataFolders(data);
  };

  // khi currentFile thay đổi → fill dữ liệu vào form
  useEffect(() => {
    if (currentFile) {
      setTieuDe(currentFile.TieuDe || "");
      setMoTa(currentFile.MoTa || "");
      setTuKhoa(currentFile.Tu_Khoa);
      setSelectedTochuc(currentFile.SoBanNganh?.Id_so_ban_nganh || "");
      setSelectedPhongban(currentFile.PhongBan?.Id_phong_ban || "");
      setSelectedFolder(currentFile.Folder?.Id_folder || "");
      setSelectedTopic(currentFile.ChuDe?.Id_chu_de || "");

      // load lại danh sách dependent
      if (currentFile.SoBanNganh?.Id_so_ban_nganh) {
        loadPhongbans(currentFile.SoBanNganh.Id_so_ban_nganh);
      }
      if (currentFile.PhongBan?.Id_phong_ban) {
        loadFolders(currentFile.PhongBan.Id_phong_ban);
      }

      setFile(null); // reset file, chỉ chọn nếu người dùng muốn thay thế
    }
  }, [currentFile]);

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      type="form"
      title="Thay thế file"
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

          <TextField
            label="Từ khóa"
            value={tuKhoa}
            onChange={(e) => setTuKhoa(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />

          {/* Tổ chức */}
          <TextField
            select
            label="Tổ chức"
            value={selectedTochuc}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedTochuc(val);
              setSelectedPhongban("");
              setSelectedFolder("");
              loadPhongbans(val);
            }}
            fullWidth
          >
            {dataTochuc.map((tc) => (
              <MenuItem key={tc.Id_so_ban_nganh} value={tc.Id_so_ban_nganh}>
                {tc.TenSoBanNganh}
              </MenuItem>
            ))}
          </TextField>

          {/* Phòng ban */}
          <TextField
            select
            label="Phòng ban"
            value={selectedPhongban}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedPhongban(val);
              setSelectedFolder("");
              loadFolders(val);
            }}
            fullWidth
            disabled={!selectedTochuc}
          >
            {dataPhongban.map((pb) => (
              <MenuItem key={pb.Id_phong_ban} value={pb.Id_phong_ban}>
                {pb.TenPhongBan}
              </MenuItem>
            ))}
          </TextField>

          {/* Thư mục */}
          <TextField
            select
            label="Thư mục"
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            fullWidth
            disabled={!selectedPhongban}
          >
            {dataFolders.map((fd) => (
              <MenuItem key={fd.Id_folder} value={fd.Id_folder}>
                {fd.TenFolder}
              </MenuItem>
            ))}
          </TextField>

          {/* Lĩnh vực */}
          <TextField
            select
            label="Lĩnh vực"
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

          <Typography>Chọn file mới (nếu muốn thay thế):</Typography>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </Box>
      }
      footer={
        <Button
          variant="contained"
          color="warning"
          onClick={() =>
            handleReplaceFile({
              tieuDe,
              moTa,
              tuKhoa,
              id_so_ban_nganh: selectedTochuc,
              id_phong_ban: selectedPhongban,
              id_chu_de: selectedTopic,
              id_folder: selectedFolder,
              file,
            })
          }
        >
          Lưu thay đổi
        </Button>
      }
    />
  );
};
