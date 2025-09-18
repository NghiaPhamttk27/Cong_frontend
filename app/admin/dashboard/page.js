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
  getListTopics,
  createTopic,
  updateTopic,
  deleteTopic,
} from "@/api/topic";
import CustomModal from "@/components/customModal";

export default function Topic() {
  const [dataTopics, setDataTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);

  // Modal state
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [tenChuDe, setTenChuDe] = useState("");
  const [moTa, setMoTa] = useState("");
  const [idTopic, setIdTopic] = useState("");

  // Alert state
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [message, setMessage] = useState("");

  // --- Fetch danh sách ---
  const fetchTopics = async () => {
    setLoading(true);
    try {
      const data = await getListTopics();
      setDataTopics(data);
    } catch (err) {
      console.error("Lỗi khi lấy topics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  // --- CRUD API ---
  const handleAddTopic = async (ten, moTa) => {
    try {
      await createTopic({ TenChuDe: ten, MoTa: moTa });
      setAlertType("success");
      setMessage("Tạo lĩnh vực thành công!");
      setOpen(true);
      setOpenModalCreate(false);
      fetchTopics();
    } catch (error) {
      setAlertType("error");
      setMessage(error.message || "Tạo lĩnh vực thất bại!");
      setOpen(true);
    }
  };

  const handleUpdateTopic = async (ten, moTa) => {
    try {
      await updateTopic(idTopic, { TenChuDe: ten, MoTa: moTa });
      setAlertType("success");
      setMessage("Cập nhật lĩnh vực thành công!");
      setOpen(true);
      setOpenModalUpdate(false);
      fetchTopics();
    } catch (error) {
      setAlertType("error");
      setMessage(error.message || "Cập nhật lĩnh vực thất bại!");
      setOpen(true);
    }
  };

  const handleDeleteTopic = async () => {
    try {
      await deleteTopic(idTopic);
      setAlertType("success");
      setMessage("Xóa lĩnh vực thành công!");
      setOpen(true);
      setOpenModalDelete(false);
      fetchTopics();
    } catch (error) {
      setAlertType("error");
      setMessage(error.message || "Xóa lĩnh vực thất bại!");
      setOpen(true);
    }
  };

  // --- Modal open functions ---
  const openCreateModal = () => {
    setOpenModalCreate(true);
    setTenChuDe("");
    setMoTa("");
    setIdTopic("");
  };

  const openUpdateModal = (topic) => {
    setIdTopic(topic.Id_chu_de);
    setTenChuDe(topic.TenChuDe);
    setMoTa(topic.MoTa);
    setOpenModalUpdate(true);
  };

  const openDeleteModal = (id) => {
    setIdTopic(id);
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
  //     await Promise.all(selected.map((id) => deleteTopic(id)));
  //     setAlertType("success");
  //     setMessage("Xóa thành công!");
  //     setOpen(true);
  //     setSelected([]);
  //     fetchTopics();
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
          Thêm Chủ Đề
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
              <TableCell>Tên Chủ Đề</TableCell>
              <TableCell>Mô Tả</TableCell>
              <TableCell>Ngày Tạo</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTopics.map((topic, index) => (
              <TableRow
                key={topic.Id_chu_de || index}
                hover
                onClick={() => toggleRow(topic.Id_chu_de)}
                selected={isSelected(topic.Id_chu_de)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={isSelected(topic.Id_chu_de)} />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{topic.TenChuDe}</TableCell>
                <TableCell>{topic.MoTa}</TableCell>
                <TableCell>{formatDate(topic.NgayTao)}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => openUpdateModal(topic)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => openDeleteModal(topic.Id_chu_de)}
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
        title="Thêm Chủ Đề"
        content={
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Tên Chủ Đề"
              value={tenChuDe}
              onChange={(e) => setTenChuDe(e.target.value)}
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
            onClick={() => handleAddTopic(tenChuDe, moTa)}
          >
            Đồng ý
          </Button>
        }
      />

      <CustomModal
        open={openModalUpdate}
        onClose={() => setOpenModalUpdate(false)}
        type="form"
        title="Sửa Chủ Đề"
        content={
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Tên Chủ Đề"
              value={tenChuDe}
              onChange={(e) => setTenChuDe(e.target.value)}
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
            onClick={() => handleUpdateTopic(tenChuDe, moTa)}
          >
            Đồng ý
          </Button>
        }
      />

      <CustomModal
        open={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
        type="error"
        title="Xóa Chủ Đề"
        content={
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography>
              Bạn có chắc chắn muốn xóa lĩnh vực này không?
            </Typography>
          </Box>
        }
        footer={
          <Button variant="contained" color="error" onClick={handleDeleteTopic}>
            Xóa
          </Button>
        }
      />
    </Paper>
  );
}
