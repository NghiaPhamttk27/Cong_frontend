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
  Typography,
  TextField,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate } from "@/utils/utils";
import {
  createFolder,
  updateFolder,
  deleteFolder,
  getFolderByPhongban,
} from "@/api/folder";
import CustomModal from "@/components/customModal";

export default function Folder({ params }) {
  const unwrapped = React.use(params);
  const Id_so_ban_nganh = unwrapped.Id_so_ban_nganh;
  const Id_phong_ban = unwrapped.Id_phong_ban;

  const [dataFolder, setDataFolder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);

  // Modal state
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [tenFolder, setTenFolder] = useState("");
  const [moTa, setMoTa] = useState("");
  const [idFolder, setIdFolder] = useState("");

  // Alert state
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [message, setMessage] = useState("");

  // --- Fetch danh sách ---
  const fetchFolders = async () => {
    setLoading(true);
    try {
      const data = await getFolderByPhongban(Id_phong_ban);
      setDataFolder(data);
    } catch (err) {
      console.error("Lỗi khi lấy folder:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, [Id_phong_ban]);

  // --- CRUD API ---
  const handleAddFolder = async (ten, moTa) => {
    try {
      await createFolder(Id_phong_ban, { TenFolder: ten, MoTa: moTa });
      setAlertType("success");
      setMessage("Tạo folder thành công!");
      setOpen(true);
      setOpenModalCreate(false);
      fetchFolders();
    } catch (error) {
      setAlertType("error");
      setMessage(error.message || "Tạo folder thất bại!");
      setOpen(true);
    }
  };

  const handleUpdateFolder = async (ten, moTa) => {
    try {
      await updateFolder(idFolder, { TenFolder: ten, MoTa: moTa });
      setAlertType("success");
      setMessage("Cập nhật folder thành công!");
      setOpen(true);
      setOpenModalUpdate(false);
      fetchFolders();
    } catch (error) {
      setAlertType("error");
      setMessage(error.message || "Cập nhật folder thất bại!");
      setOpen(true);
    }
  };

  const handleDeleteFolder = async () => {
    try {
      await deleteFolder(idFolder, { TenFolder: tenFolder, MoTa: moTa });
      setAlertType("success");
      setMessage("Xóa folder thành công!");
      setOpen(true);
      setOpenModalDelete(false);
      fetchFolders();
    } catch (error) {
      setAlertType("error");
      setMessage(error.message || "Xóa folder thất bại!");
      setOpen(true);
    }
  };

  // --- Modal open functions ---
  const openCreateModal = () => {
    setOpenModalCreate(true);
    setTenFolder("");
    setMoTa("");
    setIdFolder("");
  };

  const openUpdateModal = (folder) => {
    setIdFolder(folder.Id_folder);
    setTenFolder(folder.TenFolder);
    setMoTa(folder.MoTa);
    setOpenModalUpdate(true);
  };

  const openDeleteModal = (folder) => {
    setIdFolder(folder.Id_folder);
    setTenFolder(folder.TenFolder);
    setMoTa(folder.MoTa);
    setOpenModalDelete(true);
  };

  // --- Checkbox ---
  const toggleRow = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const isSelected = (id) => selected.includes(id);

  if (loading) return <p>Đang tải...</p>;

  return (
    <Paper sx={{ padding: 2 }}>
      <div style={{ display: "flex", gap: 20 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={openCreateModal}
          sx={{ marginBottom: 2 }}
        >
          Thêm Thư mục
        </Button>

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
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>STT</TableCell>
              <TableCell>Tên Folder</TableCell>
              <TableCell>Mô Tả</TableCell>
              <TableCell>Ngày Tạo</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataFolder.map((folder, index) => (
              <TableRow
                key={folder.Id_folder || index}
                hover
                onClick={() => toggleRow(folder.Id_folder)}
                selected={isSelected(folder.Id_folder)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={isSelected(folder.Id_folder)} />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{folder.TenFolder}</TableCell>
                <TableCell>{folder.MoTa}</TableCell>
                <TableCell>{formatDate(folder.NgayTao)}</TableCell>

                <TableCell onClick={(e) => e.stopPropagation()}>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => openUpdateModal(folder)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => openDeleteModal(folder)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* --- Modals --- */}
      <CustomModal
        open={openModalCreate}
        onClose={() => setOpenModalCreate(false)}
        type="form"
        title="Thêm Thư mục"
        content={
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Tên Folder"
              value={tenFolder}
              onChange={(e) => setTenFolder(e.target.value)}
              fullWidth
            />
            <TextField
              label="Mô Tả"
              value={moTa}
              onChange={(e) => setMoTa(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />
          </Box>
        }
        footer={
          <Button
            variant="contained"
            color="warning"
            onClick={() => handleAddFolder(tenFolder, moTa)}
          >
            Đồng ý
          </Button>
        }
      />

      <CustomModal
        open={openModalUpdate}
        onClose={() => setOpenModalUpdate(false)}
        type="form"
        title="Sửa Thư mục"
        content={
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Tên Folder"
              value={tenFolder}
              onChange={(e) => setTenFolder(e.target.value)}
              fullWidth
            />
            <TextField
              label="Mô Tả"
              value={moTa}
              onChange={(e) => setMoTa(e.target.value)}
              fullWidth
              multiline
              rows={3}
            />
          </Box>
        }
        footer={
          <Button
            variant="contained"
            color="warning"
            onClick={() => handleUpdateFolder(tenFolder, moTa)}
          >
            Đồng ý
          </Button>
        }
      />

      <CustomModal
        open={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
        type="error"
        title="Xóa Thư mục"
        content={
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography>Bạn có chắc chắn muốn xóa folder này không?</Typography>
          </Box>
        }
        footer={
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteFolder}
          >
            Xóa
          </Button>
        }
      />
    </Paper>
  );
}
