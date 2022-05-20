import React from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import "./Bread.scss";

export default function Bread() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item
        href="/"
        onClick={() => {
          window.sessionStorage.removeItem("currentpath");
        }}
      >
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Item>Application</Breadcrumb.Item>
    </Breadcrumb>
  );
}
