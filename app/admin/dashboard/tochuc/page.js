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
import { getListTochuc } from "@/api/tochuc";
import Link from "next/link";

export default function Tochuc() {
  const [dataTochuc, setDataTochuc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]); // lưu danh sách id được chọn

  useEffect(() => {
    async function fetchTochucs() {
      try {
        const data = await getListTochuc();
        setDataTochuc(data);
      } catch (err) {
        console.error("Lỗi khi lấy tochucs:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTochucs();
  }, []);

  const handleDelete = (id) => {
    setDataTochuc(dataTochuc.filter((tochuc) => tochuc.Id_so_ban_nganh !== id));
  };

  const handleEdit = (id) => {
    console.log("Sửa tochuc", id);
  };

  const handleAdd = () => {
    console.log("Thêm tochuc mới");
  };

  const handleBulkDelete = () => {
    setDataTochuc(
      dataTochuc.filter((t) => !selected.includes(t.Id_so_ban_nganh))
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
          Thêm Tổ Chức
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
              <TableCell>Tên Tổ chức</TableCell>
              <TableCell>Mô Tả</TableCell>
              <TableCell>Ngày Tạo</TableCell>
              <TableCell>Chi tiết</TableCell>
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
                    href={`/admin/dashboard/tochuc/phong-ban/${tochuc.Id_so_ban_nganh}`}
                    variant="contained"
                    color="success"
                  >
                    Xem
                  </Button>
                </TableCell>
                <TableCell
                  onClick={(e) => e.stopPropagation()} // chặn ảnh hưởng khi bấm nút
                >
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(tochuc.Id_so_ban_nganh)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleDelete(tochuc.Id_so_ban_nganh)}
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
