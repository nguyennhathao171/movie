import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import HomeCarousel from "./components/HomeCarousel";
import MovieList from "./components/MovieList";
import ScheduleMovie from "./components/ScheduleMovie";
import { fetchBannersAction, fetchCinemasAction, fetchMoviesAction } from "./redux/action";

// function component : không có state, không có lifecycle => dùng giải pháp : react hook

// công dụng react hook :
// 1. cho phép FC có thể sử dụng được state, lifecycle
// 2. cho phép tái sử dụng logic giữa các component với nhau

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // call api
    //set data store banner
    dispatch(fetchBannersAction);
    //set data store movie
    dispatch(fetchMoviesAction(1));
    //set data store list cinema
    dispatch(fetchCinemasAction)
  }, []);
  return (
    <div>
      <HomeCarousel />
      <MovieList />
      <ScheduleMovie/>
    </div>
  );

  // khi load trang home ,call API
  // 1. lấy ds banner
};

export default Home;
