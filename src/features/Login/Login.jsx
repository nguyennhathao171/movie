import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "./redux/action";

const Login = () => {
  const dispatch = useDispatch();
  const [iserr, setIserr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    // call service api
    // console.log(values);
    try {
      await dispatch(loginAction(values));
      // navigate user qua trang home
      navigate("/");
      await window.location.reload();
    } catch (err) {
      setIserr(err);
    }

    // trả về thông tin user login thành công => res.data.content
    // lưu data lên store
    // save set localStorage
    // get localStorage khi cần sử dụng
    // navigate user qua trang home
  };
  return (
    <div className="container text-center mx-auto ">
      <h1 className="mb-0">Login</h1>
      <h2 className="text-red-600 text-center my-0">{iserr}</h2>
      <div className="flex justify-center pt-5">
        <Form name="basic" onFinish={handleLogin}>
          <Form.Item
            label="Tài khoản"
            name="taiKhoan"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="matKhau"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      <h3>
        tài khoản admin: 123abc
        <br /> mật khẩu: 0123456789
      </h3>
    </div>
  );
};

export default Login;
