"use client"; // <-- Thêm dòng này vào đầu file
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getDataToChuc, getDataTopic } from "@/api/data";

export default function ChartComponent() {
  const [dataTochuc, setDataTochuc] = useState([]);
  const [dataTopic, setDataTopic] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchDataTochuc() {
      try {
        const data = await getDataToChuc();
        setDataTochuc(data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    fetchDataTochuc();
  }, []);

  useEffect(() => {
    setLoading(true);
    async function fetchDataTopic() {
      try {
        const data = await getDataTopic();
        setDataTopic(data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    fetchDataTopic();
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
      {/* Biểu đồ theo tổ chức */}
      <div
        style={{
          width: 1100,
          height: 500,
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          backgroundColor: "#fff  ", // xanh nhạt giống header
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "10px",
            padding: "30px",
            color: "#056d4f",
            background: "   linear-gradient(to right, #d4fce0, #c8f0db)",
            borderBottom: "1px solid #e0e0e0",
            fontSize: 22,
          }}
        >
          Số lượng dữ liệu theo tổ chức
        </div>
        <ResponsiveContainer width="100%" height={450}>
          <BarChart
            layout="vertical"
            data={dataTochuc} // dữ liệu riêng cho tổ chức
            margin={{ top: 0, right: 30, left: 80, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey="TenSoBanNganh"
              axisLine={false} // ẩn thanh dọc bên trái
              tickLine={false} // ẩn các gạch nhỏ ở tick
              style={{ fontSize: "20px" }}
              tick={({ x, y, payload }) => {
                const text = payload.value ? String(payload.value) : "";
                const words = text.split(" ");
                let display = "";

                if (words.length > 4) {
                  display =
                    words.slice(0, 4).join(" ") +
                    "\n" +
                    words.slice(4).join(" ");
                } else {
                  display = text;
                }

                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fontSize={14}
                  >
                    {display.split("\n").map((line, i) => (
                      <tspan key={i} x={x} dy={i === 0 ? 0 : 20}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                );
              }}
            />
            <Tooltip />
            <Bar
              dataKey="SoLuongFile"
              fill="#a8ddb5"
              label={{ position: "right" }}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ theo lĩnh vực */}
      <div
        style={{
          width: 1100,
          height: 500,
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          backgroundColor: "#fff  ", // xanh nhạt giống header
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "10px",
            padding: "30px",
            color: "#056d4f",
            background: "   linear-gradient(to right, #d4fce0, #c8f0db)",
            borderBottom: "1px solid #e0e0e0",
            fontSize: 22,
          }}
        >
          Số lượng dữ liệu theo lĩnh vực
        </div>
        <ResponsiveContainer width="100%" height={450}>
          <BarChart
            layout="vertical"
            data={dataTopic} // dữ liệu riêng cho lĩnh vực
            margin={{ top: 0, right: 30, left: 80, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey="TenChuDe"
              style={{ fontSize: "20px" }}
              axisLine={false} // ẩn thanh dọc bên trái
              tickLine={false} // ẩn các gạch nhỏ ở tick
              tick={({ x, y, payload }) => {
                const text = payload.value ? String(payload.value) : "";
                const words = text.split(" ");
                let display = "";

                if (words.length > 4) {
                  display =
                    words.slice(0, 4).join(" ") +
                    "\n" +
                    words.slice(4).join(" ");
                } else {
                  display = text;
                }

                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor="end"
                    dominantBaseline="middle"
                    fontSize={14}
                  >
                    {display.split("\n").map((line, i) => (
                      <tspan key={i} x={x} dy={i === 0 ? 0 : 20}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                );
              }}
            />
            <Tooltip />
            <Bar
              dataKey="SoLuongFile"
              fill="#ffe4a3"
              label={{ position: "right" }}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
