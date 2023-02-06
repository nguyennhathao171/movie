import { Button } from "antd";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import "./chairList.css";

import actions from "../redux/type";

const ChairList = () => {
  const movieTicket = useSelector((state) => state.booking.ticket);
  const chairSelectedList = useSelector(
    (state) => state.booking.chairSelectedList
  );
  const dispatch = useDispatch();

  //console.log(movieTicket)
  return (
    <div className="grid grid-cols-12 sm:gap-1 xl:gap-3 ">
      {movieTicket.danhSachGhe?.map((soGhe) => {
        return (
          <Button
            key={soGhe.maGhe}
            className={clsx("chair", {
              booked: soGhe.daDat,
              booking: chairSelectedList?.find(
                (ele) => ele.maGhe === soGhe.maGhe
              ),
            })}
            disabled={soGhe.daDat}
            onClick={() => {
              dispatch({
                type: actions.SET_BOOKING,
                payload: soGhe,
              });
            }}
          >
            {soGhe.tenGhe}
          </Button>
        );
      })}
    </div>
  );
};

export default ChairList;
