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
import { getListTopics } from "@/api/topic";

export default function Topic() {
  const [dataTopics, setDataTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]); // lưu danh sách id được chọn

  useEffect(() => {
    async function fetchTopics() {
      try {
        const data = await getListTopics();
        setDataTopics(data);
      } catch (err) {
        console.error("Lỗi khi lấy topics:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTopics();
  }, []);

  const handleDelete = (id) => {
    setDataTopics(dataTopics.filter((topic) => topic.Id_chu_de !== id));
  };

  const handleEdit = (id) => {
    console.log("Sửa topic", id);
  };

  const handleAdd = () => {
    console.log("Thêm topic mới");
  };

  const handleBulkDelete = () => {
    setDataTopics(dataTopics.filter((t) => !selected.includes(t.Id_chu_de)));
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
          Thêm Chủ Đề
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
                <TableCell
                  onClick={(e) => e.stopPropagation()} // chặn ảnh hưởng khi bấm nút
                >
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(topic.Id_chu_de)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleDelete(topic.Id_chu_de)}
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
