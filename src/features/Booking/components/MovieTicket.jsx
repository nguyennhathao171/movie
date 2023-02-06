import { Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookTickets, postBookTickets } from "../redux/action";

const MovieTicket = () => {
  const dispatch = useDispatch();
  const movieInfor = useSelector((state) => state.booking.ticket);
  const chairSelectedList = useSelector(
    (state) => state.booking.chairSelectedList
  );
  const userInfor = useSelector((state) => state.user.profile);
  const handleBookTicket = async () => {
    const ticketList = {
      maLichChieu: movieInfor.thongTinPhim.maLichChieu,
      danhSachVe: chairSelectedList.map((item) => {
        return {
          maGhe: item.maGhe,
          giaVe: item.giaVe,
        };
      }),
      taiKhoanNguoiDung: userInfor.taiKhoan,
    };
    await dispatch(postBookTickets(ticketList));
    await dispatch(fetchBookTickets(movieInfor.thongTinPhim.maLichChieu));
  };
  return (
    chairSelectedList &&
    movieInfor.thongTinPhim && (
      <div className="h-full flex flex-col justify-between">
        <div>
          <h2 className="text-center">{movieInfor.thongTinPhim.tenPhim}</h2>
          <div className="flex justify-between">
            <p>Ngày giờ chiếu :</p>
            <p>
              {movieInfor.thongTinPhim.ngayChieu}~
              {movieInfor.thongTinPhim.gioChieu}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Cụm rạp :</p>
            <p> {movieInfor.thongTinPhim.tenCumRap}</p>
          </div>
          <div className="flex justify-between">
            <p>Số rạp :</p>
            <p> {movieInfor.thongTinPhim.tenRap}</p>
          </div>
          <div className="flex justify-between">
            <p className="m-0 basis-4/12">Ghế đã chọn :</p>
            <div className="basis-8/12">
              {chairSelectedList.map((item) => {
                return (
                  <div className="inline-block ml-8">
                    <span>Ghế : {item.tenGhe}</span> ~{" "}
                    <span>{item.giaVe.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <p>Ưu đãi :</p>
            <p> 0%</p>
          </div>
          <div className="flex justify-between">
            <p>Thành tiền :</p>
            <p>
              {chairSelectedList
                .reduce((total, item) => {
                  return (total += item.giaVe);
                }, 0)
                .toLocaleString()}
              {"  "}
              VNĐ
            </p>
          </div>

          <Button
            type="primary"
            className="float-right"
            onClick={handleBookTicket}
          >
            Thanh toán
          </Button>
        </div>
      </div>
    )
  );
};

export default MovieTicket;
