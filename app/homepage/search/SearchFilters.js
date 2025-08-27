"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import { getListTopics } from "@/api/topic";
import { getListTochuc, getListPhongBan } from "@/api/tochuc";

export default function SearchFilters({ filters, setFilters }) {
  const [chuDes, setChuDes] = useState([]);
  const [tochucs, setTochucs] = useState([]);
  const [phongbans, setPhongbans] = useState({});

  // style
  const selectedStyle = {
    backgroundColor: "#f0faf7",
    color: "#3c826bff",
  };

  // fetch Chủ đề
  const fetchTopics = async () => {
    try {
      const data = await getListTopics();
      setChuDes(data || []);
    } catch (err) {
      console.error("Lỗi khi lấy chủ đề:", err);
    }
  };

  // fetch tổ chức
  const fetchTochucs = async () => {
    try {
      const data = await getListTochuc();
      setTochucs(data || []);
    } catch (err) {
      console.error("Lỗi khi lấy tổ chức:", err);
    }
  };

  // fetch phòng ban của từng tổ chức
  const fetchPhongbans = async (tochucId) => {
    if (phongbans[tochucId]) return; // tránh gọi lại nhiều lần
    try {
      const data = await getListPhongBan(tochucId);
      setPhongbans((prev) => ({ ...prev, [tochucId]: data || [] }));
    } catch (err) {
      console.error("Lỗi khi lấy phòng ban:", err);
    }
  };

  useEffect(() => {
    fetchTopics();
    fetchTochucs();
  }, []);

  return (
    <div>
      {/* Chủ đề */}
      <Accordion
        sx={{
          "&.Mui-expanded": { margin: "0 !important" },
          width: "100%",
        }}
        defaultExpanded
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
          <Typography>Chủ đề</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          {chuDes.map((cd) => {
            const isSelected = filters.ChuDeIds.includes(cd.Id_chu_de);

            return (
              <div
                key={cd.Id_chu_de}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 10px",
                  cursor: "pointer",
                  borderBottom: "1px solid #c4c4c4",
                  ...(isSelected ? selectedStyle : {}),
                }}
                onClick={() =>
                  setFilters({ ...filters, ChuDeIds: [cd.Id_chu_de] })
                }
              >
                <Typography>{cd.TenChuDe}</Typography>
                <Chip label={cd.SoLuongFile_So || 0} size="small" />
              </div>
            );
          })}
        </AccordionDetails>
      </Accordion>

      {/* Tổ chức + phòng ban */}
      <Accordion
        sx={{
          "&.Mui-expanded": { margin: "0 !important" },
          width: "100%",
        }}
        defaultExpanded
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
          <Typography>Tổ chức</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          {tochucs.map((tochuc) => {
            const isSelected = filters.SoBanNganhIds.includes(
              tochuc.Id_so_ban_nganh
            );

            return (
              <div key={tochuc.Id_so_ban_nganh}>
                {/* dòng chính tổ chức */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 10px",
                    cursor: "pointer",
                    fontWeight: 600,
                    borderBottom: "1px solid #c4c4c4",
                    ...(isSelected ? selectedStyle : {}),
                  }}
                  onClick={() => {
                    setFilters({
                      ...filters,
                      SoBanNganhIds: [tochuc.Id_so_ban_nganh],
                      PhongBanIds: [], // reset khi chọn lại sở
                    });
                    fetchPhongbans(tochuc.Id_so_ban_nganh);
                  }}
                >
                  <Typography>{tochuc.TenSoBanNganh}</Typography>
                  <Chip label={tochuc.SoLuongFile_So || 0} size="small" />
                </div>

                {/* phòng ban */}
                {phongbans[tochuc.Id_so_ban_nganh] &&
                  phongbans[tochuc.Id_so_ban_nganh].length > 0 && (
                    <div style={{ borderBottom: "1px solid #c4c4c4" }}>
                      {phongbans[tochuc.Id_so_ban_nganh].map((pb) => {
                        const isDivisionSelected = filters.PhongBanIds.includes(
                          pb.Id_phong_ban
                        );

                        return (
                          <div
                            key={pb.Id_phong_ban}
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
                                SoBanNganhIds: [tochuc.Id_so_ban_nganh],
                                PhongBanIds: [pb.Id_phong_ban],
                              })
                            }
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <FiberManualRecordIcon
                                sx={{
                                  fontSize: 12,
                                  marginRight: 1,
                                  color: "inherit",
                                }}
                              />
                              <Typography>{pb.TenPhongBan}</Typography>
                            </div>
                            <Chip label={pb.SoLuongFile_So || 0} size="small" />
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
    </div>
  );
}
