import { Button, Form, Input, Switch } from "antd";
import { DatePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import Nav from "./components/Nav";
import { fetchMovieEditUploadAction } from "./redux/action";

const EditFilm = () => {
  var thunghiem = {};
  const handChange = (e) => {
    thunghiem = e.target.files[0];
    //console.log(thunghiem);
  };
  const navigate = useNavigate();
  const onFinish = (value) => {
    if (value.ngayKhoiChieu) {
      var values = {
        ...value,
        ngayKhoiChieu: value["ngayKhoiChieu"].format("DD-MM-YYYY"),
      };
    } else {
      values = { ...value };
    }
    console.log("dữ liệu từ form:", values);
    const {
      tenPhim = movieDetailEdit.tenPhim,
      trailer = movieDetailEdit.trailer,
      moTa = movieDetailEdit.moTa,
      ngayKhoiChieu = movieDetailEdit.ngayKhoiChieu,
      sapChieu = movieDetailEdit.sapChieu,
      dangChieu = movieDetailEdit.dangChieu,
      hot = movieDetailEdit.hot,
      danhGia = movieDetailEdit.danhGia,
    } = values;

    var formData = new FormData();
    formData.append("maPhim", idFilm);
    formData.append("tenPhim", tenPhim);
    formData.append("trailer", trailer);
    formData.append("moTa", moTa);
    formData.append("ngayKhoiChieu", ngayKhoiChieu);
    formData.append("sapChieu", sapChieu);
    formData.append("dangChieu", dangChieu);
    formData.append("hot", hot);
    formData.append("danhGia", danhGia);
    formData.append("maNhom", "GP10");
    formData.append("File", thunghiem);
    dispatch(fetchMovieEditUploadAction(formData));
    navigate("/admin");
    // console.log("formData", formData.get("File"));
  };
  const dispatch = useDispatch();
  const params = useParams();
  const idFilm = params.idFilm * 1;

  const adminMovieList = useSelector((state) => state.admin.adminMovieList);
  const movieDetailEdit = adminMovieList.items?.find((item) => {
    return item.maPhim === idFilm;
  });

  console.log("movieDetailEdit", movieDetailEdit);

  return (
    movieDetailEdit && (
      <div className="flex">
        <div className="basis-1/6 h-max ">
          <Nav />
        </div>
        <div className="basis-5/6  bg-slate-100">
          <div className="bg-white m-3 px-6 ">
            <h2>Thêm phim mới </h2>
            <Form
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={onFinish}
              name="basic"
            >
              <Form.Item label="Tên phim :" name="tenPhim">
                <Input defaultValue={movieDetailEdit.tenPhim} />
              </Form.Item>
              <Form.Item label="Trailer :" name="trailer">
                <Input defaultValue={movieDetailEdit.trailer} />
              </Form.Item>
              <Form.Item label="Mô tả :" name="moTa">
                <TextArea
                  defaultValue={movieDetailEdit.moTa}
                  autoSize={{
                    minRows: 4,
                    maxRows: 20,
                  }}
                />
              </Form.Item>

              <Form.Item label="Ngày khởi chiếu :" name="ngayKhoiChieu">
                <DatePicker
                  defaultValue={dayjs(
                    `${movieDetailEdit.ngayKhoiChieu}`,
                    "YYYY-MM-DD"
                  )}
                />
              </Form.Item>

              <Form.Item
                label="Đang chiếu :"
                valuePropName="checked"
                name="dangChieu"
              >
                <Switch defaultChecked={movieDetailEdit.dangChieu} />
              </Form.Item>
              <Form.Item
                label="Sắp chiếu :"
                valuePropName="checked"
                name="sapChieu"
              >
                <Switch defaultChecked={movieDetailEdit.sapChieu} />
              </Form.Item>
              <Form.Item label="Hot :" valuePropName="checked" name={"hot"}>
                <Switch defaultChecked={movieDetailEdit.hot} />
              </Form.Item>
              <Form.Item label="Số sao :" name={"danhGia"}>
                <Input defaultValue={movieDetailEdit.danhGia} />
              </Form.Item>
              <Form.Item label="Upload :">
                <Input type="file" onChange={handChange} />
                <img src={movieDetailEdit.hinhAnh} alt="" className="w-44" />
              </Form.Item>
              <Form.Item label="Tác vụ :">
                <Button type="primary" htmlType="submit">
                  Sửa phim
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    )
  );
};

export default EditFilm;
