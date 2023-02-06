import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  const profile = useSelector((state) => state.user.profile);
  return (
    <header className="bg-slate-900 h-20 px-4">
      <div className="container h-full mx-auto flex justify-between items-center">
        <Link to="/" className="sm:text-2xl lg:text-4xl text-white no-underline">
          Cyber Movie
        </Link>
        {profile ? (
          <Link
            to="/thongtintaikhoan"
            className="text-white no-underline text-xl"
          >
            Xin chào, {profile.hoTen}
          </Link>
        ) : (
          <nav>
            <NavLink
              to="/login"
              className={(param) => {
                if (param.isActive)
                  return "text-yellow-200 text-lg no-underline";
                return "text-white text-lg no-underline";
              }}
            >
              Đăng Nhập
            </NavLink>
            <span className="text-white text-xl">|</span>
            <NavLink
              to="/signup"
              className={(param) => {
                if (param.isActive)
                  return "text-yellow-200 text-lg no-underline";
                return "text-white text-lg no-underline";
              }}
            >
              Đăng Ký
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
