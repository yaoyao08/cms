import React from "react";
import "./Head.scss";
import { Layout } from "antd";
const { Header } = Layout;
export default function Head(props) {
  return (
    <div className="header">
      <Header className="title">{props.title}</Header>
    </div>
  );
}
