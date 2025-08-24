"use client"; // <-- Thêm dòng này vào đầu file

import React from "react";
import Topic from "../topic/page";
import ChartComponent from "../chart/page";
import DataList from "../data/page";

function Content() {
  return (
    <div
      style={{
        width: "100%",
        padding: "20px 300px",
        display: "flex",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ width: "1300px", marginBottom: 0, padding: "50px 0" }}>
        <DataList />
      </div>
      <div style={{ width: "1300px", marginBottom: 100 }}>
        <Topic />
      </div>
      <div style={{ width: "1300px" }}>
        <ChartComponent />
      </div>
    </div>
  );
}

export default Content;
