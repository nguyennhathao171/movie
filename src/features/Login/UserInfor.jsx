import React, { useState } from "react";
import { Button, Col, Form, Input, Modal, Row, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchProfileAction, putProfileAction } from "./redux/action";
import { useNavigate } from "react-router-dom";

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

const UserInfor = () => {
  const colClass = " sm:text-lg  lg:text-2xl my-2";
  const profile = useSelector((state) => state.user.profile);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isERR, setIsERR] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleModal = () => {
    setIsModalOpen(true);
    setIsERR("");
  };
  const deleteLogin = async () => {
    await localStorage.removeItem("accessToken");
    navigate("/");
    await window.location.reload();
  };
  const items = [
    {
      key: "1",
      label: `THÔNG TIN CÁ NHÂN`,
      children: (
        <div>
          <Row justify="space-around">
            <Col className={colClass} span={10}>
              Email : {profile?.email}
            </Col>
            <Col className={colClass} span={10}>
              Tài khoản : {profile?.taiKhoan}
            </Col>
            <Col className={colClass} span={10}>
              Họ tên : {profile?.hoTen}
            </Col>
            <Col className={colClass} span={10}>
              Mật khẩu : {profile?.matKhau}
            </Col>
            <Col className={colClass} span={10}>
              Số điện thoại : {profile?.soDT}
            </Col>
            <Col className="my-2" span={10}>
              <Button onClick={handleModal} type="primary" className="mr-2">
                Cập nhật
              </Button>
              <Button onClick={deleteLogin} type="primary" danger>
                Đăng xuất
              </Button>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "2",
      label: `LỊCH SỬ ĐẶT VÉ`,
      children: (
        <div>
          {profile?.thongTinDatVe.map((item) => {
            return (
              <div
                key={item.maVe}
                className="border-solid border-0 border-b-4 mb-3 pb-3"
              >
                <Row justify="start">
                  <Col className=" sm:text-lg  lg:text-2xl my-2 mx-5" span={4}>
                    <img
                      className="w-full"
                      src={item?.hinhAnh}
                      alt={item?.tenPhim}
                    />
                  </Col>
                  <Col className="flex flex-row flex-wrap" span={19}>
                    {item?.danhSachGhe.map((value) => {
                      return (
                        <div key={value.maGhe} className="basis-2/4 mb-2 ">
                          <div>
                            <h2 className="my-0 text-sm text-red-600 ">
                              {value.tenHeThongRap}
                            </h2>
                          </div>
                          <div>
                            <p className="my-0 text-sm">
                              Ngày đặt :{" "}
                              {moment(item.ngayDat).format(
                                "Do MMMM YYYY, h:mm:ss a"
                              )}{" "}
                              - {value.tenRap} - ghế {value.tenGhe}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </Col>
                </Row>
              </div>
            );
          })}
        </div>
      ),
    },
  ];
  const onFinish = async (item) => {
    const items = {
      ...item,
      maNhom: "GP10",
      maLoaiNguoiDung: profile.maLoaiNguoiDung,
    };
    try {
      await dispatch(putProfileAction(items));
      handleCancel();
      dispatch(fetchProfileAction);
    } catch (err) {
      setIsERR(err);
    }
  };
  return (
    profile && (
      <div className="sm:w-11/12 xl:w-4/6 mx-auto">
        <Tabs defaultActiveKey="1" items={items} />

        <Modal
          title="THÔNG TIN CÁ NHÂN"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <div>
            <Form
              onFinish={onFinish}
              labelCol={{
                sm: { span: 10 },
                lg: { span: 5 },
              }}
              wrapperCol={{
                span: 16,
              }}
              validateMessages={validateMessages}
            >
              <h2 className="text-red-600 text-center my-0">{isERR}</h2>
              <Form.Item
                label="Tài khoản :"
                name="taiKhoan"
                initialValue={profile?.taiKhoan}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item
                label="Email :"
                name="email"
                initialValue={profile?.email}
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
                label="Họ tên :"
                name="hoTen"
                initialValue={profile?.hoTen}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Mật khẩu :"
                name="matKhau"
                initialValue={profile?.matKhau}
                rules={[
                  {
                    required: true,
                    message: "password chưa nhập",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Số điện thoại :"
                name="soDT"
                initialValue={profile?.soDT}
                rules={[
                  {
                    required: true,
                    type:"number"
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  span: 30,
                  sm: { offset: 9 },
                  lg: { offset: 5 },
                }}
              >
                <Button type="primary" htmlType="submit">
                  Lưu thông tin
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    )
  );
};

export default UserInfor;
