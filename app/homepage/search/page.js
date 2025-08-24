"use client";
import { useState, useEffect } from "react";
import SearchFilters from "./SearchFilters";
import SearchResults from "./SearchResults";
import { search } from "@/api/search"; // import hàm search luôn

export default function SearchPage() {
  const [filters, setFilters] = useState({
    query: "",
    organization: "",
    topic: "",
  });
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await search(filters);
      setResults(data);
    }
    loadData();
  }, [filters]);

  return (
    <div className="flex" style={{ display: "flex", padding: "50px 300px" }}>
      {/* Sidebar filters */}
      <div style={{ width: "20%" }}>
        <SearchFilters filters={filters} setFilters={setFilters} />
      </div>

      {/* Results */}
      <div className="flex-1 p-4" style={{ paddingLeft: 30, width: "78%" }}>
        <SearchResults results={results} />
      </div>
    </div>
  );
}
