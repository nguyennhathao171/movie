import requester from "app/api";
import apiPath from "app/apiPath";
import actionLogin from "features/Login/redux/type";

export const loginAction = (userLogin) => {
  return async (next) => {
    try {
      const res = await requester({
        method: "POST",
        url: apiPath.USER,
        data: userLogin,
      });
      next({
        type: actionLogin.SET_PROFILE,
        payload: res.data.content,
      });
      localStorage.setItem("accessToken", res.data.content.accessToken);
      // set localStorage => cơ chế tránh token bị mất => refresh token || fingerprint

      // set cookies
    } catch (err) {
      throw err.response.data.content;
    }
  };
};

export const fetchProfileAction = async (next) => {
  try {
    const res = await requester({
      method: "POST",
      url: apiPath.USER_INFOR,
    });
    next({
      type: actionLogin.SET_PROFILE,
      payload: res.data.content,
    });
  } catch (err) {
    console.log(err);
  }
};
export const putProfileAction = (item) => {
  return async (next) => {
    try {
      await requester({
        method: "PUT",
        url: apiPath.USER_EDIT,
        data: item,
      });
    } catch (err) {
      throw err.response.data.content;
    }
  };
};
export const signupAction = (account) => {
  return async (next) => {
    try {
      await requester({
        method: "POST",
        url: apiPath.SIGNUP,
        data: account,
      });
    } catch (err) {
      throw err.response.data.content;
    }
  };
};
