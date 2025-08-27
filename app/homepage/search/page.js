"use client";
import { useState, useEffect } from "react";
import SearchFilters from "./SearchFilters";
import SearchResults from "./SearchResults";
import { search } from "@/api/search";
import { useSearchParams, useRouter } from "next/navigation";
import { getDetailTopic } from "@/api/topic";
import { getDetailTochuc, getDetailPhongban } from "@/api/tochuc";

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // lấy params từ URL
  const topic = searchParams.get("topic")
    ? Number(searchParams.get("topic"))
    : null;
  const tochuc = searchParams.get("tochuc")
    ? Number(searchParams.get("tochuc"))
    : null;
  const phongban = searchParams.get("phongban")
    ? Number(searchParams.get("phongban"))
    : null;
  const keyword = searchParams.get("keyword") || "";

  // state filters
  const [filters, setFilters] = useState({
    Keyword: keyword,
    ChuDeIds: topic ? [topic] : [],
    SoBanNganhIds: tochuc ? [tochuc] : [],
    PhongBanIds: phongban ? [phongban] : [],
    Mode: "and",
  });

  const [results, setResults] = useState([]);
  const [tags, setTags] = useState([]);

  const [dataTopic, setDataTopic] = useState(null);
  const [dataTochuc, setDataTochuc] = useState(null);
  const [dataPhongban, setDataPhongban] = useState(null);

  // fetch chi tiết topic, tổ chức, phòng ban
  useEffect(() => {
    async function fetchData() {
      try {
        if (topic) {
          const data = await getDetailTopic(topic);
          setDataTopic(data);
        }
        if (tochuc) {
          const data = await getDetailTochuc(tochuc);
          setDataTochuc(data);
        }
        if (phongban) {
          const data = await getDetailPhongban(phongban);
          setDataPhongban(data);
        }
      } catch (error) {
        console.error("Lỗi khi load dữ liệu:", error);
      }
    }
    fetchData();
  }, [topic, tochuc, phongban]);

  // Khởi tạo tags từ query
  useEffect(() => {
    const initTags = [];
    if (filters.Keyword)
      initTags.push({ key: "Từ khóa", value: filters.Keyword });
    if (topic && dataTopic)
      initTags.push({ key: "Chủ đề", value: dataTopic.TenChuDe });
    if (tochuc && dataTochuc)
      initTags.push({ key: "Tổ chức", value: dataTochuc.TenSoBanNganh });
    if (phongban && dataPhongban)
      initTags.push({ key: "Phòng ban", value: dataPhongban.TenPhongBan });

    setTags(initTags);
  }, [
    filters.Keyword,
    topic,
    tochuc,
    phongban,
    dataTopic,
    dataTochuc,
    dataPhongban,
  ]);

  // Side-effect: khi filters thay đổi, cập nhật URL và gọi search
  useEffect(() => {
    async function updateSearch() {
      try {
        // Cập nhật URL
        const query = new URLSearchParams();
        if (filters.Keyword) query.set("keyword", filters.Keyword);
        if (filters.ChuDeIds.length) query.set("topic", filters.ChuDeIds[0]);
        if (filters.SoBanNganhIds.length)
          query.set("tochuc", filters.SoBanNganhIds[0]);
        if (filters.PhongBanIds.length)
          query.set("phongban", filters.PhongBanIds[0]);

        const url = `/homepage/search?${query.toString()}`;
        router.replace(url);

        // Gọi API search dựa trên filter
        const data = await search(filters);
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
      }
    }
    updateSearch();
  }, [filters, router]);

  // Khi xóa tag
  const handleRemoveTag = (keyToRemove) => {
    setTags((prev) => prev.filter((tag) => tag.key !== keyToRemove));

    setFilters((prev) => {
      const newFilters = { ...prev };
      if (keyToRemove === "Từ khóa") newFilters.Keyword = "";
      if (keyToRemove === "Chủ đề") newFilters.ChuDeIds = [];
      if (keyToRemove === "Tổ chức") newFilters.SoBanNganhIds = [];
      if (keyToRemove === "Phòng ban") newFilters.PhongBanIds = [];
      return newFilters;
    });
  };

  return (
    <div className="flex" style={{ display: "flex", padding: "100px 10vw" }}>
      {/* Sidebar filters */}
      <div style={{ width: "300px" }}>
        <SearchFilters filters={filters} setFilters={setFilters} />
      </div>

      {/* Results */}
      <div className="flex-1 p-4" style={{ paddingLeft: 50, flex: 1 }}>
        <SearchResults
          results={results}
          tags={tags}
          onRemoveTag={handleRemoveTag}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    </div>
  );
}
