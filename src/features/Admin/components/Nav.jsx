import React from "react";

import { Menu } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  UserOutlined,
} from "@ant-design/icons/lib/icons";
import { Link } from "react-router-dom";
import { fetchMovieListAction, fetchUserListAction } from "../redux/action";
import { useDispatch } from "react-redux";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(<Link to="/admin/user">Users</Link>, "sub2", <UserOutlined />),
  getItem(<Link to="/admin">Film</Link>, "sub1", <FileOutlined />),
  getItem(<Link to="/">Trang chủ</Link>, "sub3", <DesktopOutlined />),
];
const Nav = () => {
  const onClick = (value) => {
    if (value.key === "sub1") {
      dispatch(fetchMovieListAction());
    } else if (value.key === "sub2") {
      dispatch(fetchUserListAction());
    }
  };
  const dispatch = useDispatch();
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
      // theme="dark"
    />
  );
};
export default Nav;
