import { Form, Input, Button } from "antd";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Register.scss";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { postRequest } from "../../api";
export default class Register extends Component {
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
  handleCancel() {}
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
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            className="item"
            wrapperCol={{
              span: 24,
            }}
            rules={[
              {
                required: true,
                message: "请检查两次输入的密码!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次输入的密码不一致"));
                },
              }),
            ]}
          >
            <Input.Password
              className="value"
              prefix={<LockOutlined />}
              placeholder="再次输入密码"
            />
          </Form.Item>
          <Form.Item valuePropName="checked" className="tip">
            <Button
              wrapperCol={{
                span: 24,
              }}
              type="primary"
              htmlType="submit"
              size="large"
              className="login-btn"
            >
              注册
            </Button>
            <Button
              wrapperCol={{
                span: 24,
              }}
              type="primary"
              size="large"
              onClick={this.handleCancel}
              className="login-btn"
            >
              <Link to="/login">取消</Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
