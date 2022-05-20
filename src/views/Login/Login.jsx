import { Form, Input, Button, Checkbox, Row, Col, message } from "antd";
import React, { Component } from "react";
import "./Login.scss";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { postRequest } from "../../api";
import { NavTo } from "../../utils/navTo";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.password = window.localStorage.getItem("password") || "";
    this.username = window.localStorage.getItem("username") || "";
    this.state = {
      isChecked: window.localStorage.getItem("password") ? true : false,
    };
  }

  onFinish = (values) => {
    if (this.state.isChecked) {
      window.localStorage.setItem("username", values.username);
      window.localStorage.setItem("password", values.password);
    }
    postRequest("/user/login", values).then((res) => {
      console.log(res);
      if (res.data.message === "登录成功") {
        sessionStorage.setItem("token", res.data.token);
        message.success(res.data.message);
        NavTo("/");
      } else {
        message.error(res.message);
      }
    });

    console.log("Success:", values);
  };
  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  handleSetPassword = (e) => {
    this.setState(() => ({
      isChecked: e.target.checked,
    }));
  };
  render() {
    return (
      <div className="login-bg">
        <Form
          className="log"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          autoComplete="off"
        >
          <h2>欢迎登陆</h2>
          <Form.Item
            className="item"
            initialValue={this.username}
            name="username"
            wrapperCol={{
              span: 24,
            }}
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          >
            <Input
              className="vlaue"
              style={{ borderRadius: 7 }}
              prefix={<UserOutlined />}
              placeholder="输入用户名"
            />
          </Form.Item>

          <Form.Item
            className="item"
            name="password"
            initialValue={this.password}
            wrapperCol={{
              span: 24,
            }}
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
          >
            <Input.Password
              className="value"
              prefix={<LockOutlined />}
              placeholder="输入密码"
            />
          </Form.Item>
          <Form.Item
            className="item"
            wrapperCol={{
              span: 24,
            }}
          >
            <Link style={{ float: "left" }} to="/register">
              还没账号？立即注册
            </Link>
          </Form.Item>
          <Form.Item valuePropName="checked" className="tip">
            <Row gutter={18}>
              <Col span={20}>
                <Form.Item className="item2">
                  <Checkbox
                    style={{ color: "white" }}
                    checked={this.state.isChecked}
                    onClick={this.handleSetPassword}
                  >
                    记住
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item className="item2">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="login-btn"
                  >
                    登录
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
