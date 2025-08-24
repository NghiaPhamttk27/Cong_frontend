"use client";
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

// Dữ liệu giả định
const filterData = [
  {
    title: "Chủ đề",
    paramKey: "topic",
    items: [
      { label: "Công nghệ thông tin - Truyền thông", value: "cntt", count: 2 },
      { label: "Giáo dục", value: "giaoduc", count: 5 },
      { label: "Y tế, Sức khỏe", value: "yte", count: 3 },
    ],
  },
  {
    title: "Tổ chức",
    paramKey: "organization",
    items: [
      {
        label: "Sở Khoa học và Công nghệ",
        value: "so-khcn",
        count: 5,
        divisions: [
          {
            label: "Phòng Khoa học và Công nghệ",
            value: "so-khcn-phong-khcn",
            count: 2,
          },
          {
            label: "Phòng Công nghệ thông tin",
            value: "so-khcn-phong-cntt",
            count: 3,
          },
        ],
      },
      {
        label: "Sở Y tế",
        value: "so-yte",
        count: 3,
        divisions: [
          {
            label: "Phòng Y tế dự phòng",
            value: "so-yte-yte-du-phong",
            count: 1,
          },
          {
            label: "Phòng Kế hoạch tổng hợp",
            value: "so-yte-ke-hoach-th",
            count: 2,
          },
        ],
      },
      { label: "Sở Giáo dục và Đào tạo", value: "so-gddt", count: 1 },
    ],
  },
];

export default function SearchFilters({ filters, setFilters }) {
  // Style cho mục đang được chọn
  const selectedStyle = {
    backgroundColor: "#f0faf7", // Màu xanh nhạt
    color: "#3c826bff",
  };

  // Style cho dòng Sở
  const soItemStyle = {};

  return (
    <div>
      {filterData.map((category) => (
        <Accordion
          key={category.paramKey}
          sx={{
            "&.Mui-expanded": { margin: "0 !important" },
            width: "100%",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
            sx={{
              background: "#1b873f",
              color: "white",
              height: "40px !important",
              minHeight: "40px !important",
            }}
          >
            <Typography>{category.title}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            {category.items.map((item) => {
              // Kiểm tra xem mục này (hoặc Sở chứa nó) có đang được chọn không
              const isSelected =
                filters[category.paramKey] === item.value ||
                (item.divisions &&
                  filters[category.paramKey]?.startsWith(item.value));

              return (
                <div key={item.value}>
                  {/* Dòng chính cho Sở hoặc Chủ đề */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 10px", // Thêm padding ngang
                      cursor: "pointer",
                      fontWeight: 600,
                      borderBottom: "1px solid #c4c4c4",
                      ...soItemStyle,
                      ...(isSelected ? selectedStyle : {}),
                    }}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        [category.paramKey]: item.value,
                      })
                    }
                  >
                    <Typography>{item.label}</Typography>
                    <Chip label={item.count} size="small" />
                  </div>
                  {/* Nếu có phòng ban, render lồng vào bên trong */}
                  {item.divisions && (
                    <div style={{ borderBottom: "1px solid #c4c4c4" }}>
                      {item.divisions.map((division) => {
                        const isDivisionSelected =
                          filters[category.paramKey] === division.value;

                        return (
                          <div
                            key={division.value}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "8px 10px",
                              paddingLeft: "20px",

                              cursor: "pointer",

                              ...(isDivisionSelected ? selectedStyle : {}),
                            }}
                            onClick={() =>
                              setFilters({
                                ...filters,

                                [category.paramKey]: division.value,
                              })
                            }
                          >
                            {/* Vấn đề được sửa ở đây: icon và text giờ là con trực tiếp của flexbox */}
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <FiberManualRecordIcon
                                sx={{
                                  fontSize: 12,
                                  marginRight: 1,
                                  color: "inherit",
                                }} // color inherit để kế thừa màu từ style cha
                              />
                              <Typography>{division.label}</Typography>
                            </div>
                            <Chip label={division.count} size="small" />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
