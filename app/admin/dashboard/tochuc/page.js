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
  getListTochuc,
  createTochuc,
  updateTochuc,
  deleteTochuc,
} from "@/api/tochuc";
import { getListTochucByRole } from "@/api/role-list";
import Cookies from "js-cookie";

import Link from "next/link";
import CustomModal from "@/components/customModal";

export default function Tochuc() {
  const role = Cookies.get("role");
  const [dataTochuc, setDataTochuc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);

  // Modal state
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [tenTochuc, setTenTochuc] = useState("");
  const [moTa, setMoTa] = useState("");
  const [idTochuc, setIdTochuc] = useState("");

  // Alert state
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [message, setMessage] = useState("");

  // --- Fetch danh sách ---
  const fetchTochucs = async () => {
    setLoading(true);
    try {
      const data =
        role == "Admin" ? await getListTochuc() : await getListTochucByRole();
      setDataTochuc(data);
    } catch (err) {
      console.error("Lỗi khi lấy tochucs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTochucs();
  }, []);

  // --- CRUD API ---
  const handleAddTochuc = async (ten, moTa) => {
    try {
      await createTochuc({ TenSoBanNganh: ten, MoTa: moTa });
      setAlertType("success");
      setMessage("Tạo tổ chức thành công!");
      setOpen(true);
      setOpenModalCreate(false);
      fetchTochucs();
    } catch (error) {
      setAlertType("error");
      setMessage(error.message || "Tạo tổ chức thất bại!");
      setOpen(true);
    }
  };

  const handleUpdateTochuc = async (ten, moTa) => {
    try {
      await updateTochuc(idTochuc, { TenSoBanNganh: ten, MoTa: moTa });
      setAlertType("success");
      setMessage("Cập nhật tổ chức thành công!");
      setOpen(true);
      setOpenModalUpdate(false);
      fetchTochucs();
    } catch (error) {
      setAlertType("error");
      setMessage(error.message || "Cập nhật tổ chức thất bại!");
      setOpen(true);
    }
  };

  const handleDeleteTochuc = async () => {
    try {
      await deleteTochuc(idTochuc);
      setAlertType("success");
      setMessage("Xóa tổ chức thành công!");
      setOpen(true);
      setOpenModalDelete(false);
      fetchTochucs();
    } catch (error) {
      setAlertType("error");
      setMessage(error.message || "Xóa tổ chức thất bại!");
      setOpen(true);
    }
  };

  // --- Modal open functions ---
  const openCreateModal = () => {
    setOpenModalCreate(true);
    setTenTochuc("");
    setMoTa("");
    setIdTochuc("");
  };

  const openUpdateModal = (tochuc) => {
    setIdTochuc(tochuc.Id_so_ban_nganh);
    setTenTochuc(tochuc.TenSoBanNganh);
    setMoTa(tochuc.MoTa);
    setOpenModalUpdate(true);
  };

  const openDeleteModal = (id) => {
    setIdTochuc(id);
    setOpenModalDelete(true);
  };

  // --- Checkbox ---
  const toggleRow = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const isSelected = (id) => selected.includes(id);

  const handleBulkDelete = async () => {
    try {
      await Promise.all(selected.map((id) => deleteTochuc(id)));
      setAlertType("success");
      setMessage("Xóa thành công!");
      setOpen(true);
      setSelected([]);
      fetchTochucs();
    } catch (error) {
      setAlertType("error");
      setMessage("Xóa thất bại!");
      setOpen(true);
    }
  };

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
          Thêm Tổ Chức
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
              <TableCell>Tên Tổ chức</TableCell>
              <TableCell>Mô Tả</TableCell>
              <TableCell>Ngày Tạo</TableCell>
              <TableCell>Phòng ban</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTochuc.map((tochuc, index) => (
              <TableRow
                key={tochuc.Id_so_ban_nganh || index}
                hover
                onClick={() => toggleRow(tochuc.Id_so_ban_nganh)}
                selected={isSelected(tochuc.Id_so_ban_nganh)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={isSelected(tochuc.Id_so_ban_nganh)} />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{tochuc.TenSoBanNganh}</TableCell>
                <TableCell>{tochuc.MoTa}</TableCell>
                <TableCell>{formatDate(tochuc.NgayTao)}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Button
                    component={Link}
                    href={`/admin/dashboard/tochuc/${tochuc.Id_so_ban_nganh}/phong-ban/`}
                    variant="contained"
                    color="success"
                  >
                    Xem
                  </Button>
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => openUpdateModal(tochuc)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => openDeleteModal(tochuc.Id_so_ban_nganh)}
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
        title="Thêm tổ chức"
        content={
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Tên Tổ Chức"
              value={tenTochuc}
              onChange={(e) => setTenTochuc(e.target.value)}
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
            onClick={() => handleAddTochuc(tenTochuc, moTa)}
          >
            Đồng ý
          </Button>
        }
      />

      <CustomModal
        open={openModalUpdate}
        onClose={() => setOpenModalUpdate(false)}
        type="form"
        title="Sửa tổ chức"
        content={
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Tên Tổ Chức"
              value={tenTochuc}
              onChange={(e) => setTenTochuc(e.target.value)}
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
            onClick={() => handleUpdateTochuc(tenTochuc, moTa)}
          >
            Đồng ý
          </Button>
        }
      />

      <CustomModal
        open={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
        type="error"
        title="Xóa tổ chức"
        content={
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography>
              Bạn có chắc chắn muốn xóa tổ chức này không?
            </Typography>
          </Box>
        }
        footer={
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteTochuc}
          >
            Xóa
          </Button>
        }
      />
    </Paper>
  );
}
