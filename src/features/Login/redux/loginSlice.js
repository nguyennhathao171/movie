import actionLogin from "features/Login/redux/type";

const { default: produce } = require("immer");

const inititalState = {
  profile: null,
};
const reducer = (state = inititalState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionLogin.SET_PROFILE:
        draft.profile = action.payload;
        break;

      default:
        break;
    }
  });
};
export default reducer;
