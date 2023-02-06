import actions from "./type";

const { default: produce } = require("immer");

const inititalState = {
  adminMovieList: null,
  adminCinemas: null,
  adminClusterCinemas: null,
  User: null,
};
const reducer = (state = inititalState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actions.SET_ADMIN:
        draft.adminMovieList = action.payload;
        break;
      case actions.SET_ADMIN_SEARCH:
        draft.adminMovieList.items = action.payload;
        break;
      case actions.SET_ADMIN_CINEMAS:
        draft.adminCinemas = action.payload;
        break;
      case actions.SET_ADMIN_CLUSTER_CINEMAS:
        draft.adminClusterCinemas = action.payload;
        break;
      case actions.SET_ADMIN_USER:
        draft.User = action.payload;
        break;
      case actions.SET_USER_SEARCH:
        draft.User.items = action.payload;
        break;
      default:
        break;
    }
  });
};
export default reducer;
