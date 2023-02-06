import { Button, Pagination } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMovieEditAction,
  fetchMovieListAction,
  searchMovieListAction,
} from "./redux/action";
import Nav from "./components/Nav";
import {
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Search from "antd/es/input/Search";
import { useState } from "react";

const Admin = () => {
  const adminMovieList = useSelector((state) => state.admin.adminMovieList);
  const handelDelete = async (item) => {
    await dispatch(deleteMovieEditAction(item));
    dispatch(fetchMovieListAction());
  };
  const handleSearch = (value) => {
    if (value) {
      dispatch(searchMovieListAction(value));
    } else {
      dispatch(fetchMovieListAction());
    }
  };
  useEffect(() => {
    // call api ds phim
    dispatch(fetchMovieListAction());
  }, []);
  const dispatch = useDispatch();
  return (
    adminMovieList && (
      <div className="flex">
        <div className="basis-1/6 h-max ">
          <Nav />
        </div>
        <div className="basis-5/6  bg-slate-100">
          <div className="bg-white m-3 px-6 ">
            <h2>Quản lí phim</h2>
            <Link to="/admin/addnew">
              <Button type="primary" className="mb-5">
                Thêm phim
              </Button>
            </Link>
            <Search
              placeholder="Nhập vào tên phim"
              onSearch={handleSearch}
              enterButton
              className="mb-5"
              size="large"
            />
            <table className=" table-fixed border-collapse w-full mx-auto text-center ">
              <thead className=" bg-slate-100">
                <tr className=" border-solid border-0 border-b-2  border-gray-300">
                  <th className="py-5">Mã phim</th>
                  <th className="sm:hidden lg:table-cell">Hình ảnh</th>
                  <th>Tên phim</th>
                  <th className="m-9 w-5/12 sm:hidden lg:table-cell">Mô tả</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {adminMovieList.items?.map((item, index) => {
                  // console.log(item);
                  return (
                    <tr
                      key={item.maPhim}
                      className=" border-solid border-0 border-b-2  border-gray-300"
                    >
                      <td>{item.maPhim}</td>
                      <td className="py-5 sm:hidden lg:table-cell">
                        <img
                          className="w-24 h-32 "
                          src={item.hinhAnh}
                          alt={item.tenPhim}
                        />
                      </td>
                      <td>{item.tenPhim}</td>
                      <td className="px-5 sm:hidden lg:table-cell">{item.moTa}</td>
                      <td>
                        <Link
                          className="text-2xl text-green-600"
                          to={`/admin/showtime/${item.maPhim}`}
                        >
                          <CalendarOutlined />
                        </Link>
                        <Link
                          className="text-2xl sm:mx-2 xl:mx-4"
                          to={`/admin/edit/${item.maPhim}`}
                        >
                          <EditOutlined />
                        </Link>
                        <button
                          onClick={() => {
                            handelDelete(item.maPhim);
                          }}
                          className="cursor-pointer text-2xl p-0 text-red-600 border-none bg-transparent"
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
            total={adminMovieList.totalCount}
            pageSize={5}
            onChange={(page) => {
              dispatch(fetchMovieListAction(page));
            }}
          />
        </div>
      </div>
    )
  );
};

export default Admin;
