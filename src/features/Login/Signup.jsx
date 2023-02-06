import { Button, Form, Input } from "antd";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupAction } from "./redux/action";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} chưa nhập",
  types: {
    email: "${label} không hợp lệ !",
    number: "${label} bắt buộc phải là số !",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const Signup = () => {
  const handleLogin = async (values) => {
    const account = { ...values, maNhom: "GP10" };
    try {
      await dispatch(signupAction(account));
      navigate("/login");
    } catch (err) {
      setIserr(err);
    }
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [iserr, setIserr] = useState("");
  return (
    <div>
      <h2 className="text-center mb-0">Đăng kí</h2>
      <h2 className="text-red-600 text-center my-0">{iserr}</h2>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={handleLogin}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={"taiKhoan"}
          label="Tài khoản"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="matKhau"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: "password chưa nhập",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Nhập lại mật khẩu"
          dependencies={["matKhau"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("matKhau") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Hai mật khẩu khác nhau"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name={"hoTen"}
          label="Họ tên"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={"email"}
          label="Email"
          rules={[
            {
              type: "email",
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="soDt"
          label="Số điện thoại"
          rules={[
            {
              required: true,
              type:"number"
            },
          ]}
        >
          <Input
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 11,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
