"use client"; // <-- Thêm dòng này vào đầu file
import React from "react";
import Link from "next/link";
import { getListTopics } from "@/api/topic";
import { useEffect, useState } from "react";

export default function Topic() {
  const [dataTopics, setDataTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("getListTopics type:", typeof getListTopics); // <- check xem có phải function ko
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

  if (loading) return <p>Đang tải...</p>;

  return (
    <div>
      <h2 style={{ margin: "30px 0", textAlign: "center" }}>Chủ đề</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "25px",
        }}
      >
        {dataTopics.map((topic) => (
          <Link
            key={topic.Id_chu_de}
            href={`/search?topic=${topic.Id_chu_de}`}
            className="topic-card"
          >
            <span>{topic.TenChuDe}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
