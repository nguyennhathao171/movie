import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ChairList from "./components/ChairList";
import MovieTicket from "./components/MovieTicket";
import { fetchBookTickets } from "./redux/action";

const Booking = () => {
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    // set data store list đặt vé
    const maPhimChieu = params.maId;
    dispatch(fetchBookTickets(maPhimChieu));
  }, [params]);

  return (
    <div className="container mx-auto mb-10">
      <h2 className="text-center sm:my-3">trang đặt vé</h2>
      <div className="flex justify-evenly  ">
        <div className="basis-6/12">
          <h2 className="text-center bg-green-600">SCREEN</h2>
          <ChairList />
        </div>
        <div className="xl:basis-4/12 sm:basis-5/12">
          <MovieTicket/>
        </div>
      </div>
    </div>
  );
};

export default Booking;
