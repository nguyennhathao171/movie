import actions from "./type";
import produce from "immer";

const inititalState = {
  banners: [],
  movies: {},
  movieDetail: null,
  movieDetailSchedule: null,
  cinemas: [],
  ticket: {},
  chairSelectedList: [],
};

const reducer = (state = inititalState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case actions.SET_BANNERS:
        draft.banners = action.payload;
        break;
      case actions.SET_MOVIES:
        draft.movies = action.payload;
        break;
      case actions.SET_MOVIES_DETAIL:
        draft.movieDetail = action.payload;
        break;
      case actions.SET_MOVIES_DETAIL_SCHEDULE:
        draft.movieDetailSchedule = action.payload;
        break;
      case actions.SET_CINEMAS:
        draft.cinemas = action.payload;
        break;
      case actions.SET_TICKET:
        draft.ticket = action.payload;
        draft.chairSelectedList = [];
        break;
      case actions.SET_BOOKING:
        const data = draft.chairSelectedList;

        // kiểm tra trong mảng chairSelectedList đã tồn tại ghế hay chưa

        //findIndex: nếu có thì trả về số thứ tự đúng với item, nếu không thì trả về -1

        const index = data.findIndex(
          (item) => item.maGhe === action.payload.maGhe
        );
        if (index !== -1) {
          data.splice(index, 1);
        } else {
          data.push(action.payload);
        }
        break;
      default:
        break;
    }
  });
};

export default reducer;
