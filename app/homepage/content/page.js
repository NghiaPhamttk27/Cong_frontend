"use client"; // <-- Thêm dòng này vào đầu file

import React from "react";
import Topic from "../topic/page";
import ChartComponent from "../chart/page";
import DataList from "../data/page";
import SearchComponent from "@/components/searchComponent";

function Content() {
  return (
    <div
      style={{
        width: "100%",
        padding: "20px 10vw",
        display: "flex",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginBottom: 0, padding: "50px 0" }}>
        <SearchComponent />
      </div>
      <div style={{ marginBottom: 0, padding: "50px 0" }}>
        <DataList />
      </div>

      <div style={{ marginBottom: 100 }}>
        <Topic />
      </div>
      <div style={{}}>
        <ChartComponent />
      </div>
    </div>
  );
}

export default Content;
