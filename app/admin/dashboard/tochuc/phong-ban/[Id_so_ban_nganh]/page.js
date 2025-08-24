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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate } from "@/utils/utils";
import { getListPhongBan } from "@/api/tochuc";

export default function Phongban({ params }) {
  const { Id_so_ban_nganh } = React.use(params);
  const [dataPhongban, setDataPhongban] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]); // lưu danh sách id được chọn

  useEffect(() => {
    async function fetchPhongbans() {
      try {
        const data = await getListPhongBan(Id_so_ban_nganh);
        setDataPhongban(data);
      } catch (err) {
        console.error("Lỗi khi lấy phongbans:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPhongbans();
  }, []);

  const handleDelete = (id) => {
    setDataPhongban(
      dataPhongban.filter((phongban) => phongban.Id_phong_ban !== id)
    );
  };

  const handleEdit = (id) => {
    console.log("Sửa phongban", id);
  };

  const handleAdd = () => {
    console.log("Thêm phongban mới");
  };

  const handleBulkDelete = () => {
    setDataPhongban(
      dataPhongban.filter((t) => !selected.includes(t.Id_phong_ban))
    );
    setSelected([]);
  };

  // Toggle chọn 1 hàng
  const toggleRow = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Check đã chọn chưa
  const isSelected = (id) => selected.includes(id);

  if (loading) return <p>Đang tải...</p>;

  return (
    <Paper sx={{ padding: 2 }}>
      <div style={{ display: "flex", gap: 20 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          sx={{ marginBottom: 2 }}
        >
          Thêm Phòng ban
        </Button>

        {selected.length > 0 && (
          <Box mb={2}>
            <Button
              variant="contained"
              color="error"
              onClick={handleBulkDelete}
            >
              Xóa {selected.length} hàng
            </Button>
          </Box>
        )}
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>STT</TableCell>
              <TableCell>Tên Phòng ban</TableCell>
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

                <TableCell
                  onClick={(e) => e.stopPropagation()} // chặn ảnh hưởng khi bấm nút
                >
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(phongban.Id_phong_ban)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleDelete(phongban.Id_phong_ban)}
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
