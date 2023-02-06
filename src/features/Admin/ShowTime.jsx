import { Button, Cascader, DatePicker, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "./components/Nav";
import {
  fetchCinemasListAction,
  fetchClusterCinemasListAction,
  uploadShotime,
} from "./redux/action";

const ShowTime = () => {
  const [flag, setFlag] = useState(0);
  const [isErr, setIsErr] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCinemasListAction);
  }, []);
  const cinemasList = useSelector((state) => state.admin.adminCinemas);
  const params = useParams();
  const idFilm = params.idFilm * 1;
  const adminMovieList = useSelector((state) => state.admin.adminMovieList);
  const movieDetailEdit = adminMovieList.items?.find((item) => {
    return item.maPhim === idFilm;
  });
  const onFinish = async (values) => {
    const value = {
      ...values,
      ngaychieu: values["ngaychieu"].format("DD/MM/YYYY hh:mm:ss"),
    };
    try {
      await dispatch(uploadShotime(value));
      navigate("/admin");
    } catch (err) {
      setIsErr(err);
      console.log(err);
    }
  };
  const clusterCinemasList = useSelector(
    (state) => state.admin.adminClusterCinemas
  );

  const handleChange = async (item) => {
    await dispatch(fetchClusterCinemasListAction(item));
    setFlag(flag + 1);
  };

  const option = [
    clusterCinemasList?.map((item) => {
      return {
        value: `${item.maCumRap}`,
        label: `${item.tenCumRap}`,
        children: item.danhSachRap.map((item2) => {
          return {
            value: `${item2.maRap}`,
            label: `${item2.tenRap}`,
          };
        }),
      };
    }),
  ];

  return (
    movieDetailEdit && (
      <div className="flex ">
        <div className="basis-1/6  ">
          <Nav />
        </div>
        <div className="basis-5/6 bg-slate-100">
          <div className="bg-white m-3 px-6 ">
            <h2>Tạo lịch chiếu - {movieDetailEdit.tenPhim}</h2>
            <div>
              <img className="w-64" src={movieDetailEdit.hinhAnh} alt="" />
            </div>
            <h2 className="text-center text-red-600 mt-0">{isErr}</h2>
            <div className="pb-48">
              <Form
                labelCol={{
                  span: 4,
                }}
                wrapperCol={{
                  span: 14,
                }}
                name="basic"
                onFinish={onFinish}
              >
                <Form.Item
                  label="Mã phim :"
                  name="maphim"
                  initialValue={movieDetailEdit.maPhim}
                >
                  <Input disabled />
                </Form.Item>
                <Form.Item label="Hệ thống rạp :" name="hethongrap">
                  <Select onChange={handleChange}>
                    {cinemasList?.map((item) => {
                      return (
                        <Select.Option
                          key={item.maHeThongRap}
                          value={item.maHeThongRap}
                        >
                          <img
                            className="w-3 mr-3"
                            src={item.logo}
                            alt={item.biDanh}
                          />
                          <span>{item.tenHeThongRap}</span>
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="Cụm rạp :" name="cumrap">
                  <Cascader options={option[0]} />
                </Form.Item>

                <Form.Item label="Ngày chiếu :" name="ngaychieu">
                  <DatePicker />
                </Form.Item>
                <Form.Item label="Giá vé :" name="giave">
                  <Input />
                </Form.Item>
                <Form.Item label="Chức năng">
                  <Button type="primary" htmlType="submit">
                    Tạo lịch chiếu
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ShowTime;
