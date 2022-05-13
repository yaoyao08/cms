import React from "react";
import { Outlet } from "react-router-dom";
import "./App.scss";
export default function App() {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
}
