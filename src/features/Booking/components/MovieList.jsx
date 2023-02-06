import { Button, Card, Col, Pagination, Row } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMoviesAction } from "../redux/action";

const MovieList = () => {
  const movies = useSelector((state) => state.booking.movies);
  const dispatch = useDispatch();
  return (
    <div className="container mx-auto">
      <h1 className="text-center sm:text-3xl lg:text-5xl font-normal">
        Danh Sách Phim
      </h1>
      <Row gutter={30}>
        {movies.items?.map((item) => (
          <Col key={item.maPhim} className="mb-7 " xs={24} sm={12} lg={8} xl={6}>
            <Card
              hoverable
              style={{ width: "100%", height: "100%" }}
              cover={
                <img
                  className="h-72 object-cover object-left-top"
                  alt={item.biDanh}
                  src={item.hinhAnh}
                />
              }
            >
              <h1 className="sm:text-xl sm:h-5 md:text-2xl md:h-10 lg:h-14 xl:text-3xl xl:h-20 my-2 font-semibold ">
                {item.tenPhim}
              </h1>
              <p className="sm:text-xl md:text-2xl  my-2 xl:h-36">
                {item.moTa.substr(0, 100) + "..."}
              </p>
              <Link to={`/detail/${item.maPhim}`}>
                <Button type="primary" size="large">
                  Đặt Vé
                </Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
      {movies.items && (
        <Pagination
          className="text-center mb-10"
          defaultCurrent={movies.currentPage}
          total={movies.totalCount}
          pageSize={8}
          onChange={(page) => {
            dispatch(fetchMoviesAction(page));
          }}
        />
      )}
    </div>
  );
};

export default MovieList;
