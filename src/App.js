// import Demo from "demoHook/Demo";
import Header from "components/Header";
import AddFilm from "features/Admin/AddFilm";
import Admin from "features/Admin/Admin";
import User from "features/Admin/User";
import EditFilm from "features/Admin/EditFilm";
import ShowTime from "features/Admin/ShowTime";

import Booking from "features/Booking/Booking";
import MovieDetail from "features/Booking/Detail";
import Home from "features/Booking/Home";
import Login from "features/Login/Login";
import { fetchProfileAction } from "features/Login/redux/action";
import Signup from "features/Login/Signup";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useCallback, useState } from "react";
// import chuyển trang cho react
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddUser from "features/Admin/AddUser";
import UserInfor from "features/Login/UserInfor";

function App() {
  // const [count1, setCount1] = useState(0);

  // const testMemo = useCallback(() => {
  //   console.log("hello", count1);
  // }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch async action fetch profile
    dispatch(fetchProfileAction);
  }, []);

  return (
    /* <h1>{count1}</h1>
      <button
        onClick={() => {
          setCount1(count1 + 1);
        }}
      >
        Increase count 1
      </button> */

    /* <Home />
      <MovieDetail />
      <Booking />
      <Login />
      <Signup /> */

    /* <Demo testMemo={testMemo} /> */

    // phần chính

    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/detail/:id" element={<MovieDetail />} />
        <Route path="/booking/:maId" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/thongtintaikhoan" element={<UserInfor />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/addnew" element={<AddFilm />} />
        <Route path="/admin/edit/:idFilm" element={<EditFilm />} />
        <Route path="/admin/showtime/:idFilm" element={<ShowTime />} />
        <Route path="/admin/user" element={<User />} />
        <Route path="/admin/user/addnew" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
