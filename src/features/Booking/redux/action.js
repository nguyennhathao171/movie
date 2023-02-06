import requester from "app/api";
import apiPath from "app/apiPath";
import actions from "./type";

export const fetchBannersAction = async (next) => {
  try {
    // const res = await axios({
    //   method: "GET",
    //   url: process.env.REACT_APP_API_URL + "/api/QuanLyPhim/LayDanhSachBanner",
    //   headers: {
    //     TokenCybersoft:
    //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNyIsIkhldEhhblN0cmluZyI6IjIzLzA1LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NDgwMDAwMDAwMCIsIm5iZiI6MTY1NzIxMzIwMCwiZXhwIjoxNjg0OTQ3NjAwfQ.uVmhasF9oy0mXFYvSl8tBIUY7ZRmZ-U0hLsBB75mkn8",
    //   },
    // });
    //  console.log(res.data)

    const res = await requester({
      method: "GET",
      url: apiPath.BANNERS,
    });

    next({
      type: actions.SET_BANNERS,
      payload: res.data.content,
    });
  } catch (err) {}
};
export const fetchMoviesAction = (page = 1) => {
  return async (next) => {
    try {
      const res = await requester({
        method: "GET",
        url: apiPath.MOVIES,
        params: {
          maNhom: "GP10",
          soTrang: page,
          soPhanTuTrenTrang: 8,
        },
      });
      //console.log(res.data);
      next({
        type: actions.SET_MOVIES,
        payload: res.data.content,
      });
    } catch (err) {}
  };
};
export const fetchMovieDetailAction = (id) => {
  return async (next) => {
    try {
      const res = await requester({
        method: "GET",
        url: apiPath.MOVIES_DETAIL,
        params: {
          MaPhim: id,
        },
      });
      //console.log(res.data);
      next({
        type: actions.SET_MOVIES_DETAIL,
        payload: res.data.content,
      });
    } catch (err) {}
  };
};
// get detail movie with schedule
export const fetchMovieDetailScheduleAction = (id) => {
  return async (next) => {
    try {
      const res = await requester({
        method: "GET",
        url: apiPath.MOVIES_DETAIL_SCHEDULE,
        params: {
          MaPhim: id,
        },
      });
      //console.log(res.data);
      next({
        type: actions.SET_MOVIES_DETAIL_SCHEDULE,
        payload: res.data.content,
      });
    } catch (err) {}
  };
};
//get api heThongRap
export const fetchCinemasAction = async (next) => {
  try {
    const res = await requester({
      method: "GET",
      url: apiPath.CINEMAS,
    });
    next({
      type: actions.SET_CINEMAS,
      payload: res.data.content,
    });
  } catch (err) {}
};
// get api đặt vé
export const fetchBookTickets = (maId) => {
  return async (next) => {
    try {
      const res = await requester({
        method: "GET",
        url: apiPath.BOOK_TICKET_LIST,
        params: {
          MaLichChieu: maId,
        },
      });
      //console.log("data",res.data);
      next({
        type: actions.SET_TICKET,
        payload: res.data.content,
      });
    } catch (err) {}
  };
};

export const postBookTickets = (value) => {
  return async (next) => {
    try {
      await requester({
        method: "POST",
        url: apiPath.BOOK_TICKET,
        data: value,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
