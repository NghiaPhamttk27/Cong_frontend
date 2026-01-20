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
  Snackbar,
  Alert,
  TextField,
  Typography,
  MenuItem,
  Box,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LockResetIcon from "@mui/icons-material/LockReset";
import AddIcon from "@mui/icons-material/Add";

import CustomModal from "@/components/customModal";
import {
  getListUsers,
  updateUser,
  deleteUser,
  resetPassword,
  registerUser,
} from "@/api/user";
import { getListTochuc, getListPhongBan } from "@/api/tochuc";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // modal
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  // alert
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [message, setMessage] = useState("");

  // dropdown data
  const [dataTochuc, setDataTochuc] = useState([]);
  const [dataPhongban, setDataPhongban] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await getListUsers();
      setUsers(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchTochuc = async () => {
    const data = await getListTochuc();
    setDataTochuc(data);
  };

  useEffect(() => {
    fetchUsers();
    fetchTochuc();
  }, []);

  const showAlert = (type, msg) => {
    setAlertType(type);
    setMessage(msg);
    setOpenAlert(true);
  };

  if (loading) return <p>Đang tải...</p>;

  return (
    <Paper sx={{ p: 2 }}>
      <Button
        startIcon={<AddIcon />}
        variant="contained"
        onClick={() => setOpenCreate(true)}
        sx={{ mb: 2 }}
      >
        Thêm người dùng
      </Button>

      {/* Alert */}
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={alertType}>{message}</Alert>
      </Snackbar>

      {/* Create */}
      <UserForm
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        dataTochuc={dataTochuc}
        dataPhongban={dataPhongban}
        loadPhongban={setDataPhongban}
        onSubmit={async (payload) => {
          await registerUser(payload);
          showAlert("success", "Tạo user thành công");
          setOpenCreate(false);
          fetchUsers();
        }}
      />

      {/* Edit */}
      <UserForm
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        isEdit
        user={selectedUser}
        dataTochuc={dataTochuc}
        dataPhongban={dataPhongban}
        loadPhongban={setDataPhongban}
        onSubmit={async (payload) => {
          await updateUser(selectedUser.Id_user, payload);
          showAlert("success", "Cập nhật user thành công");
          setOpenEdit(false);
          fetchUsers();
        }}
      />

      {/* Delete */}
      <CustomModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        type="error"
        title="Xóa user"
        content={<Typography>Bạn có chắc muốn xóa user này?</Typography>}
        footer={
          <Button
            color="error"
            variant="contained"
            onClick={async () => {
              await deleteUser(selectedUser.Id_user);
              showAlert("success", "Xóa user thành công");
              setOpenDelete(false);
              fetchUsers();
            }}
          >
            Xóa
          </Button>
        }
      />

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Tổ chức</TableCell>
              <TableCell>Phòng ban</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u, i) => (
              <TableRow key={u.Id_user}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{u.Email}</TableCell>
                <TableCell>{u.UserName}</TableCell>
                <TableCell>{u.Role}</TableCell>
                <TableCell>{u.SoBanNganh?.TenSoBanNganh}</TableCell>
                <TableCell>{u.PhongBan?.TenPhongBan}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setSelectedUser(u);
                      setOpenEdit(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="warning"
                    onClick={async () => {
                      await resetPassword(u.Id_user);
                      showAlert("success", "Reset mật khẩu thành công");
                    }}
                  >
                    <LockResetIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => {
                      setSelectedUser(u);
                      setOpenDelete(true);
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

/* ---------------- User Form ---------------- */
const UserForm = ({
  open,
  onClose,
  onSubmit,
  isEdit = false,
  user,
  dataTochuc,
  dataPhongban,
  loadPhongban,
}) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("User");
  const [tochuc, setTochuc] = useState("");
  const [phongban, setPhongban] = useState("");

  useEffect(() => {
    if (isEdit && user) {
      setEmail(user.Email);
      setUsername(user.UserName);
      setPhone(user.PhoneNumber);
      setRole(user.Role);
      setTochuc(user.SoBanNganh?.Id_so_ban_nganh || "");
      setPhongban(user.PhongBan?.Id_phong_ban || "");
    }
  }, [user]);

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      type="form"
      title={isEdit ? "Cập nhật user" : "Tạo user"}
      content={
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <TextField
            select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
          </TextField>

          <TextField
            select
            label="Tổ chức"
            value={tochuc}
            onChange={(e) => {
              setTochuc(e.target.value);
              loadPhongban([]);
            }}
          >
            {dataTochuc.map((tc) => (
              <MenuItem key={tc.Id_so_ban_nganh} value={tc.Id_so_ban_nganh}>
                {tc.TenSoBanNganh}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Phòng ban"
            value={phongban}
            onChange={(e) => setPhongban(e.target.value)}
          >
            {dataPhongban.map((pb) => (
              <MenuItem key={pb.Id_phong_ban} value={pb.Id_phong_ban}>
                {pb.TenPhongBan}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      }
      footer={
        <Button
          variant="contained"
          onClick={() =>
            onSubmit({
              Email: email,
              UserName: username,
              PhoneNumber: phone,
              Role: role,
              Id_so_ban_nganh: tochuc,
              Id_phong_ban: phongban,
            })
          }
        >
          Lưu
        </Button>
      }
    />
  );
};
