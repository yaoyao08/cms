import React from "react";
import { Outlet } from "react-router-dom";
import { Button } from "antd";

export default function App() {
  return (
    <div>
      <Outlet></Outlet>
      <Button type="primary">Primary Button</Button>
    </div>
  );
}
