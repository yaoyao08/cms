import React from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { menus as items } from "../../../utils/menu";
import { Layout, Button } from "antd";
import Menu from "../../Menu/Menu";
import "./MSider.scss";

const { Sider } = Layout;
export default function MSider(props) {
  return (
    <Sider width={300} collapsed={props.collapsed} className="sider">
      <Button type="primary" onClick={props.toggleCollapsed} className="show">
        {props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu items={items}></Menu>
    </Sider>
  );
}
