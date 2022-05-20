import React from "react";
import "./Menu.scss";
import { Menu as AMenu } from "antd";
import { useNavigate } from "react-router-dom";
export default function Menu(props) {
  const navigator = useNavigate();
  const handleNav = (e) => {
    sessionStorage.setItem("currentpath", e.key);
    navigator(e.key);
  };
  return (
    <div className="menu">
      <AMenu
        defaultSelectedKeys={[sessionStorage.getItem("currentpath") || ""]}
        mode="inline"
        className="content"
        items={props.items}
        onSelect={handleNav}
      />
    </div>
  );
}
