import React from "react";
import { Input, Button, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./TopTool.scss";

const { Option } = Select;
export default function TopTool(props) {
  return (
    <div className="toptool">
      <div className="inputtext">
        <Input.Group compact className="item">
          <Input
            style={{ width: "30%", color: "black", backgroundColor: "white" }}
            defaultValue="案件ID"
            disabled={true}
            bordered={false}
          />
          <Input style={{ width: "40%" }} defaultValue="26888888" />
        </Input.Group>
        <Input.Group compact className="item">
          <Input
            style={{ width: "30%", color: "black", backgroundColor: "white" }}
            defaultValue="大类名称"
            disabled={true}
            bordered={false}
          />
          <Select style={{ width: 120 }} onSelect={props.handleSelect1}>
            {props.selector1.map((item) => (
              <Option value={item} />
            ))}
          </Select>
        </Input.Group>
        <Input.Group compact className="item">
          <Input
            style={{ width: "30%", color: "black", backgroundColor: "white" }}
            defaultValue="小类名称"
            disabled={true}
            bordered={false}
          />
          <Select style={{ width: 120 }} onSelect={props.handleSelect2}>
            {props.selector2.map((item) => (
              <Option key={item} value={item} />
            ))}
          </Select>
        </Input.Group>
      </div>
      <Button
        type="primary"
        shape="circle"
        onClick={props.search}
        icon={<SearchOutlined />}
      ></Button>
    </div>
  );
}
