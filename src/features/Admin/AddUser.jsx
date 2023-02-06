import { Button, Form, Input, Select } from "antd";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "./components/Nav";
import { postUserAction, putUserAction } from "./redux/action";

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

const AddUser = () => {
  const onFinish = async (value) => {
    const values = { ...value, maNhom: "GP10" };
    if (!state) {
      try {
        await dispatch(postUserAction(values));
        navigate("/admin/user");
      } catch (err) {
        setIsERR(err);
      }
    } else {
      try {
        await dispatch(putUserAction(values));
        navigate("/admin/user");
      } catch (err) {
        setIsERR(err);
      }
    }
  };
  const [isERR, setIsERR] = useState("");
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let disabledFlag = false;
  if (state) {
    disabledFlag = true;
  }
  return (
    <div className="flex">
      <div className="basis-1/6 h-max ">
        <Nav />
      </div>
      <div className="basis-5/6  bg-slate-100">
        <div className="bg-white m-3 px-6 ">
          <h2>Thêm người dùng</h2>
          <h2 className="text-center text-red-600 mt-0">{isERR}</h2>
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 16,
            }}
            name="nest-messages"
            validateMessages={validateMessages}
            onFinish={onFinish}
          >
            <Form.Item
              name="taiKhoan"
              label="Tài khoản"
              rules={[
                {
                  required: true,
                },
              ]}
              initialValue={state?.taiKhoan}
            >
              <Input disabled={disabledFlag} />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  required: true,
                },
              ]}
              initialValue={state?.email}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="matKhau"
              label="Mật khẩu"
              initialValue={state?.matKhau}
              rules={[
                {
                 
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="soDt"
              label="Số điện thoại"
              initialValue={state?.soDt}
              rules={[
                {
                  type:"number",
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="hoTen" label="Họ Tên" initialValue={state?.hoTen}>
              <Input />
            </Form.Item>
            <Form.Item
              name="maLoaiNguoiDung"
              label="loại người dùng"
              rules={[
                {
                  required: true,
                },
              ]}
              initialValue={state?.maLoaiNguoiDung}
            >
              <Select>
                <Select.Option value="KhachHang">Khách hàng</Select.Option>
                <Select.Option value="QuanTri">Quản trị viên</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                span: 30,
                offset: 4,
              }}
            >
              <Button type="primary" htmlType="submit">
                Thêm
              </Button>
              <Button
                className="bg-green-600 text-white mx-5"
                htmlType="submit"
              >
                Thay đổi
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
