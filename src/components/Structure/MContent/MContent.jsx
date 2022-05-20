import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Bread from "../Bread/Bread";
import "./MContent.scss";

const { Content } = Layout;
export default class MContent extends Component {
  render() {
    return (
      <Content className="content">
        <Bread></Bread>
        <div className="out">
          <Outlet></Outlet>
        </div>
      </Content>
    );
  }
}
