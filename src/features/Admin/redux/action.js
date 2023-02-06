import actions from "./type";

const { default: requester } = require("app/api");
const { default: apiPath } = require("app/apiPath");

export const fetchMovieListAction = (value = 1) => {
  return async (next) => {
    try {
      const res = await requester({
        method: "GET",
        url: apiPath.ADMIN,
        params: {
          maNhom: "GP10",
          soTrang: value,
          soPhanTuTrenTrang: 5,
        },
      });
      //console.log(res.data.content);
      next({
        type: actions.SET_ADMIN,
        payload: res.data.content,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const fetchUpload = (value) => {
  return async (next) => {
    try {
      await requester({
        url: apiPath.UP_HINH,
        method: "POST",
        data: value,
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export const fetchMovieEditUploadAction = (e) => {
  return async (next) => {
    try {
      await requester({
        method: "POST",
        url: apiPath.EDIT_HINH,
        data: e,
      });

      //console.log(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };
};
export const deleteMovieEditAction = (e) => {
  return async () => {
    try {
      await requester({
        method: "DELETE",
        url: apiPath.DELETE_HINH,
        params: {
          MaPhim: e,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const searchMovieListAction = (value) => {
  return async (next) => {
    try {
      const res = await requester({
        method: "GET",
        url: apiPath.ADMIN_SEARCH,
        params: {
          maNhom: "GP10",
          tenPhim: value,
        },
      });
      console.log(res.data.content);
      next({
        type: actions.SET_ADMIN_SEARCH,
        payload: res.data.content,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
// lấy thông tin rạp
export const fetchCinemasListAction = async (next) => {
  try {
    const res = await requester({
      method: "GET",
      url: apiPath.CINEMAS,
    });
    //console.log(res.data);
    next({
      type: actions.SET_ADMIN_CINEMAS,
      payload: res.data.content,
    });
  } catch (err) {}
};
// cum rạp
export const fetchClusterCinemasListAction = (item) => {
  return async (next) => {
    try {
      const res = await requester({
        method: "GET",
        url: apiPath.CLUSTER_CINEMAS,
        params: {
          maHeThongRap: item,
        },
      });
      //console.log(res.data);
      next({
        type: actions.SET_ADMIN_CLUSTER_CINEMAS,
        payload: res.data.content,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
// set lịch chiếu
export const uploadShotime = (item) => {
  return async (next) => {
    try {
      await requester({
        method: "POST",
        url: apiPath.CREATE_SHOWTIMES,
        data: {
          maPhim: item.maphim,
          ngayChieuGioChieu: item.ngaychieu,
          maRap: item.cumrap[0],
          giaVe: item.giave,
        },
      });
    } catch (err) {
      throw err.response.data.content;
    }
  };
};
// get user
export const fetchUserListAction = (value = 1) => {
  return async (next) => {
    try {
      const res = await requester({
        method: "GET",
        url: apiPath.USER_LIST,
        params: {
          maNhom: "GP10",
          soTrang: value,
          soPhanTuTrenTrang: 6,
        },
      });
      next({
        type: actions.SET_ADMIN_USER,
        payload: res.data.content,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
// post user
export const postUserAction = (item) => {
  return async () => {
    try {
      await requester({
        method: "POST",
        url: apiPath.USER_ACCOUNT,
        data: item,
      });
    } catch (err) {
      throw err.response.data.content;
    }
  };
};
export const putUserAction = (item) => {
  return async () => {
    try {
      await requester({
        method: "POST",
        url: apiPath.USER_EDIT,
        data: item,
      });
    } catch (err) {
      throw err.response.data.content;
    }
  };
};
export const deleteUserAction = (e) => {
  return async () => {
    try {
      await requester({
        method: "DELETE",
        url: apiPath.USER_DELETE,
        params: {
          TaiKhoan: e,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const searchUserListAction = (value) => {
  return async (next) => {
    try {
      const res = await requester({
        method: "GET",
        url: apiPath.USER_SEARCH,
        params: {
          maNhom: "GP10",
          tuKhoa: value,
        },
      });
      console.log(res.data.content);
      next({
        type: actions.SET_USER_SEARCH,
        payload: res.data.content,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
