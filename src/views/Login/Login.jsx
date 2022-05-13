import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import React, { Component } from "react";
import "./Login.scss";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { postRequest } from "../../api";
export default class Login extends Component {
  state = {};
  onFinish = (values) => {
    postRequest("/user/login", values).then((res) => {
      console.log(res);
    });
    console.log("Success:", values);
  };
  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
                  <Checkbox style={{ color: "white" }}>记住</Checkbox>
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
