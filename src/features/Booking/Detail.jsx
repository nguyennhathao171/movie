import { Button, Col, Modal, Rate, Row, Tabs, Tag } from "antd";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  fetchMovieDetailAction,
  fetchMovieDetailScheduleAction,
} from "./redux/action";

const MovieDetail = () => {
  // cách dùng modal

  const [openModal, setOpenModal] = useState(false);
  const showModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    //tắt video khi đóng tab (khó hiểu)

    var iframe = document.querySelector("#video-trailer");
    if (iframe !== null) {
      var iframeSrc = iframe.src;
      iframe.src = iframeSrc;
    }

    setOpenModal(false);
  };

  const params = useParams();

  useEffect(() => {
    const movieID = params.id;
    dispatch(fetchMovieDetailAction(movieID));
    dispatch(fetchMovieDetailScheduleAction(movieID));
  }, [params]);
  const movieDetail = useSelector((state) => state.booking.movieDetail);
  const movieDetailSchedule = useSelector(
    (state) => state.booking.movieDetailSchedule
  );

  const dispatch = useDispatch();

  // cắt video từ youtube từ watch sang chuẩn embed để chèn vào web

  let trailer = "";
  trailer = movieDetail;
  //console.log("daasd", movieDetail);

  return (
    movieDetail && (
      <div className="container mx-auto sm:pt-10 lg:pt-14 xl:pt-20">
        <Row>
          <Col span={8}>
            <img className="w-full" alt="" src={movieDetail.hinhAnh} />
          </Col>
          <Col className="pl-10 " span={16}>
            <h2 className="sm:text-base lg:text-2xl my-0">
              {movieDetail.tenPhim}
            </h2>
            <p className="sm:text-base lg:text-2xl my-0">{movieDetail.moTa}</p>

            <table className="table-auto text-2xl text-left border-spacing-5">
              <tbody>
                <tr>
                  <th>Đánh Giá : </th>
                  <td>
                    <Rate count={10} value={movieDetail.danhGia} />
                  </td>
                </tr>
                <tr>
                  <th>
                    {movieDetail.dangChieu && (
                      <Tag color="magenta">Đang Chiếu</Tag>
                    )}
                    {movieDetail.sapChieu && <Tag color="blue">Sắp Chiếu</Tag>}
                  </th>
                </tr>
                <tr>
                  <th>Ngày Chiếu : </th>
                  <td>
                    {moment(movieDetail.ngayKhoiChieu).format("DD/MM/YYYY")}
                  </td>
                </tr>
                <tr>
                  <td>
                    <Button
                      className="mr-3 mb-3"
                      type="primary"
                      size="large"
                      onClick={showModal}
                    >
                      Xem Trailer
                    </Button>
                    <Button type="primary" size="large">
                      Đặt Vé
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>

            <Tabs
              className="pt-10"
              tabPosition="left"
              items={movieDetailSchedule?.heThongRapChieu.map(
                (itemRap, index) => {
                  return {
                    label: (
                      <div key={index}>
                        <img
                          alt={itemRap.maHeThongRap}
                          className="sm:w-12 lg:w-24"
                          src={itemRap.logo}
                        />
                        <br />
                        {itemRap.tenHeThongRap}
                      </div>
                    ),
                    key: itemRap.maHeThongRap,
                    children: itemRap.cumRapChieu.map((itemCumRap, index) => {
                      // console.log("itemCumRap", itemCumRap);
                      return (
                        <p key={index} className="text-lg text-green-700">
                          {itemCumRap.tenCumRap} {itemCumRap.diaChi}
                          <br />
                          {itemCumRap.lichChieuPhim.map((itemLichChieu) => {
                            return (
                              <Link
                                key={itemLichChieu.maLichChieu}
                                to={`/booking/${itemLichChieu.maLichChieu}`}
                              >
                                <Button className="mr-4 mb-4">
                                  {moment(
                                    itemLichChieu.ngayChieuGioChieu
                                  ).format("DD-MM-YYYY ~ hh:mm")}
                                </Button>
                              </Link>
                            );
                          })}
                        </p>
                      );
                    }),
                  };
                }
              )}
            />

            {/* <iframe
            width="956"
            height="538"
            src="https://www.youtube.com/embed/xEeGwKxa03I"
            title="Review ALICE IN BORDERLAND mùa 2: Có HAY HƠN mùa 1?"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe> */}
          </Col>
        </Row>

        <Modal
          title="Trailer"
          open={openModal}
          onCancel={closeModal}
          width={800}
        >
          <iframe
            id="video-trailer"
            title="Trailer"
            width="100%"
            height="500px"
            src={trailer}
          ></iframe>
        </Modal>
      </div>
    )
  );
};

export default MovieDetail;
