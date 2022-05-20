import React from "react";
import { Layout } from "antd";
import Head from "./components/Structure/Head/Head";
import MContent from "./components/Structure/MContent/MContent";
import MSider from "./components/Structure/MSider/MSider";
import "./App.scss";

const { Footer } = Layout;

export default function App() {
  const [collapsed, setCollapsed] = React.useState(false);
  const title = "React管理系统";
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout className="app">
      <Head className="head" title={title}></Head>
      <Layout>
        <MSider
          toggleCollapsed={toggleCollapsed}
          collapsed={collapsed}
        ></MSider>
        <MContent></MContent>
      </Layout>
      <Footer className="foot">Respect | CopyRight @ 2022 Author wjp </Footer>
    </Layout>
  );
}
