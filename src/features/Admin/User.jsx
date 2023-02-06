import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Pagination } from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "./components/Nav";
import {
  deleteUserAction,
  fetchUserListAction,
  searchUserListAction,
} from "./redux/action";

const User = () => {
  const userList = useSelector((state) => state.admin.User);
  useEffect(() => {
    // call api ds phim
    dispatch(fetchUserListAction());
  }, []);
  const dispatch = useDispatch();
  const handleSearch = (item) => {
    if (item) {
      dispatch(searchUserListAction(item));
    } else {
      dispatch(fetchUserListAction());
    }
  };

  const handelDelete = async (item) => {
    await dispatch(deleteUserAction(item));
    dispatch(fetchUserListAction());
  };

  return (
    userList && (
      <div className="flex">
        <div className="basis-1/6  ">
          <Nav />
        </div>
        <div className="basis-5/6  bg-slate-100">
          <div className="bg-white m-3 px-6 ">
            <h2>Quản lí người dùng</h2>
            <Link to="/admin/user/addnew">
              <Button type="primary" className="mb-5">
                Thêm người dùng
              </Button>
            </Link>
            <Search
              placeholder="Nhập vào họ tên cần tìm"
              onSearch={handleSearch}
              enterButton
              className="mb-5"
              size="large"
            />
            <table className=" table-fixed border-collapse w-full mx-auto text-center ">
              <thead className=" bg-slate-100">
                <tr className=" border-solid border-0 border-b-2  border-gray-300">
                  <th className="py-5 w-10">STT</th>
                  <th>Tài khoản</th>
                  <th className="sm:hidden xl:table-cell">Mật khẩu</th>
                  <th>Họ Tên</th>
                  <th className="sm:hidden lg:table-cell">Email</th>
                  <th className="sm:hidden xl:table-cell">Số điện thoại</th>
                  <th className="w-24">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {userList.items?.map((item, index) => {
                  return (
                    <tr
                      key={item.taiKhoan}
                      className=" border-solid border-0 border-b-2  border-gray-300"
                    >
                      <td>{index + 1}</td>
                      <td className="py-5">{item.taiKhoan}</td>
                      <td className="sm:hidden xl:table-cell">{item.matKhau}</td>
                      <td className="px-5">{item.hoTen}</td>
                      <td className="px-5 sm:hidden lg:table-cell">{item.email}</td>
                      <td className="px-5 sm:hidden xl:table-cell">
                        {item.soDT}
                        {item.soDt}
                      </td>
                      <td>
                        <Link
                          state={item}
                          to={`/admin/user/addnew`}
                          className="text-2xl mr-4"
                        >
                          <EditOutlined />
                        </Link>
                        <button
                          onClick={() => {
                            handelDelete(item.taiKhoan);
                          }}
                          className="cursor-pointer mr-2 text-2xl p-0 text-red-600 border-none bg-transparent"
                        >
                          <DeleteOutlined />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination
            className="text-center mb-10"
            defaultCurrent={1}
            total={userList.totalCount}
            pageSize={6}
            onChange={(page) => {
              dispatch(fetchUserListAction(page));
            }}
          />
        </div>
      </div>
    )
  );
};

export default User;
