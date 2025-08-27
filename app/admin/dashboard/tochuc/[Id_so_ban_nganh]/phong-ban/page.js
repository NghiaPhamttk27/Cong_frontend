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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate } from "@/utils/utils";
import {
  getListPhongBan,
  createPhongban,
  updatePhongban,
  deletePhongban,
} from "@/api/tochuc";
import CustomModal from "@/components/customModal";

export default function Phongban({ params }) {
  const Id_so_ban_nganh = React.use(params).Id_so_ban_nganh; // unwrap params
  const [dataPhongban, setDataPhongban] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);

  // Modal state
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [tenPhongban, setTenPhongban] = useState("");
  const [moTa, setMoTa] = useState("");
  const [idPhongban, setIdPhongban] = useState("");

  // Alert state
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [message, setMessage] = useState("");

  // --- Fetch danh sách ---
  const fetchPhongbans = async () => {
    setLoading(true);
    try {
      const data = await getListPhongBan(Id_so_ban_nganh);
      setDataPhongban(data);
    } catch (err) {
      console.error("Lỗi khi lấy phòng ban:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhongbans();
  }, [Id_so_ban_nganh]);

  // --- CRUD API ---
  const handleAddPhongban = async (ten, moTa) => {
    try {
      await createPhongban(Id_so_ban_nganh, { TenPhongBan: ten, MoTa: moTa });
      setAlertType("success");
      setMessage("Tạo phòng ban thành công!");
      setOpen(true);
      setOpenModalCreate(false);
      fetchPhongbans();
    } catch (error) {
      setAlertType("error");
      setMessage(error.message || "Tạo phòng ban thất bại!");
      setOpen(true);
    }
  };

  const handleUpdatePhongban = async (ten, moTa) => {
    try {
      await updatePhongban(idPhongban, { TenPhongBan: ten, MoTa: moTa });
      setAlertType("success");
      setMessage("Cập nhật phòng ban thành công!");
      setOpen(true);
      setOpenModalUpdate(false);
      fetchPhongbans();
    } catch (error) {
      setAlertType("error");
      setMessage(error.message || "Cập nhật phòng ban thất bại!");
      setOpen(true);
    }
  };

  const handleDeletePhongban = async () => {
    try {
      await deletePhongban(idPhongban);
      setAlertType("success");
      setMessage("Xóa phòng ban thành công!");
      setOpen(true);
      setOpenModalDelete(false);
      fetchPhongbans();
    } catch (error) {
      setAlertType("error");
      setMessage(error.message || "Xóa phòng ban thất bại!");
      setOpen(true);
    }
  };

  // --- Modal open functions ---
  const openCreateModal = () => {
    setOpenModalCreate(true);
    setTenPhongban("");
    setMoTa("");
    setIdPhongban("");
  };

  const openUpdateModal = (phongban) => {
    setIdPhongban(phongban.Id_phong_ban);
    setTenPhongban(phongban.TenPhongBan);
    setMoTa(phongban.MoTa);
    setOpenModalUpdate(true);
  };

  const openDeleteModal = (id) => {
    setIdPhongban(id);
    setOpenModalDelete(true);
  };

  // --- Checkbox ---
  const toggleRow = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const isSelected = (id) => selected.includes(id);

  // const handleBulkDelete = async () => {
  //   try {
  //     await Promise.all(selected.map((id) => deletePhongban(id)));
  //     setAlertType("success");
  //     setMessage("Xóa thành công!");
  //     setOpen(true);
  //     setSelected([]);
  //     fetchPhongbans();
  //   } catch (error) {
  //     setAlertType("error");
  //     setMessage("Xóa thất bại!");
  //     setOpen(true);
  //   }
  // };

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
          Thêm Phòng Ban
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

        {/* {selected.length > 0 && (
          <Box mb={2}>
            <Button
              variant="contained"
              color="error"
              onClick={handleBulkDelete}
            >
              Xóa {selected.length} hàng
            </Button>
          </Box>
        )} */}
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>STT</TableCell>
              <TableCell>Tên Phòng Ban</TableCell>
              <TableCell>Mô Tả</TableCell>
              <TableCell>Ngày Tạo</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataPhongban.map((phongban, index) => (
              <TableRow
                key={phongban.Id_phong_ban || index}
                hover
                onClick={() => toggleRow(phongban.Id_phong_ban)}
                selected={isSelected(phongban.Id_phong_ban)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={isSelected(phongban.Id_phong_ban)} />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{phongban.TenPhongBan}</TableCell>
                <TableCell>{phongban.MoTa}</TableCell>
                <TableCell>{formatDate(phongban.NgayTao)}</TableCell>

                <TableCell onClick={(e) => e.stopPropagation()}>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => openUpdateModal(phongban)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => openDeleteModal(phongban.Id_phong_ban)}
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
        title="Thêm Phòng Ban"
        content={
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Tên Phòng Ban"
              value={tenPhongban}
              onChange={(e) => setTenPhongban(e.target.value)}
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
            onClick={() => handleAddPhongban(tenPhongban, moTa)}
          >
            Đồng ý
          </Button>
        }
      />

      <CustomModal
        open={openModalUpdate}
        onClose={() => setOpenModalUpdate(false)}
        type="form"
        title="Sửa Phòng Ban"
        content={
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Tên Phòng"
              value={tenPhongban}
              onChange={(e) => setTenPhongban(e.target.value)}
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
            onClick={() => handleUpdatePhongban(tenPhongban, moTa)}
          >
            Đồng ý
          </Button>
        }
      />

      <CustomModal
        open={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
        type="error"
        title="Xóa Phòng Ban"
        content={
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography>
              Bạn có chắc chắn muốn xóa phòng ban này không?
            </Typography>
          </Box>
        }
        footer={
          <Button
            variant="contained"
            color="error"
            onClick={handleDeletePhongban}
          >
            Xóa
          </Button>
        }
      />
    </Paper>
  );
}
