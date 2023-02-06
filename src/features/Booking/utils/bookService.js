import requester from "app/api";

const { default: apiPath } = require("app/apiPath");

export const getScheludeMovieCinema = async (maHeThongRap) => {
  const res = await requester({
    method: "GET",
    url: apiPath.SCHEDULE_CINEMAS + `?maHeThongRap=${maHeThongRap}&maNhom=GP10`,
  });
  return res;
};
