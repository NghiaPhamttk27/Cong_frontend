"use client"; // <-- Thêm dòng này vào đầu file
import React from "react";
import Link from "next/link";
import { getListTopics } from "@/api/topic";
import { useEffect, useState } from "react";
import { getListTochuc } from "@/api/tochuc";

export default function Topic() {
  const [dataTopics, setDataTopics] = useState([]);
  const [dataTochuc, setDataTochuc] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopics() {
      try {
        const data = await getListTopics();
        setDataTopics(data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    fetchTopics();
  }, []);

  useEffect(() => {
    async function fetchTochuc() {
      try {
        const data = await getListTochuc();
        setDataTochuc(data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    fetchTochuc();
  }, []);

  if (loading) return <p>Đang tải...</p>;

  return (
    <div>
      <h2 style={{ margin: "30px 0", textAlign: "center" }}>Chủ đề</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px", // có thể chỉnh nhỏ lại
        }}
      >
        {dataTopics.map((topic) => (
          <Link
            key={topic.Id_chu_de}
            href={`/homepage/search?topic=${topic.Id_chu_de}`}
            className="topic-card"
          >
            <span>{topic.TenChuDe}</span>
          </Link>
        ))}
      </div>

      <h2 style={{ margin: "30px 0", textAlign: "center", marginTop: 200 }}>
        Tổ chức
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "15px", // có thể chỉnh nhỏ lại
        }}
      >
        {dataTochuc.map((tochuc) => (
          <Link
            key={tochuc.Id_so_ban_nganh}
            href={`/homepage/search?tochuc=${tochuc.Id_so_ban_nganh}`}
            className="topic-card"
          >
            <span>{tochuc.TenSoBanNganh}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
