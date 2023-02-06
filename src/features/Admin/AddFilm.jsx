import Nav from "./components/Nav";
import { DatePicker } from "antd";
import { Button, Form, Input, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch } from "react-redux";
import { fetchUpload } from "./redux/action";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddFilm = () => {
  const handChange = (e) => {
    setImg(e.target.files[0]);
  };
  const [img, setImg] = useState(null);
  const navigate = useNavigate();
  const onFinish = async (value) => {
    const values = {
      ...value,
      ngayKhoiChieu: value["ngayKhoiChieu"].format("DD-MM-YYYY"),
      hinhanh: img,
    };
    console.log("dữ liệu từ form:", values);
    const {
      tenPhim = "",
      trailer = "",
      moTa = "",
      ngayKhoiChieu = "",
      sapChieu = false,
      dangChieu = false,
      hot = false,
      danhGia = "",
      hinhanh,
    } = values;

    var formData = new FormData();
    formData.append("tenPhim", tenPhim);
    formData.append("trailer", trailer);
    formData.append("moTa", moTa);
    formData.append("ngayKhoiChieu", ngayKhoiChieu);
    formData.append("sapChieu", sapChieu);
    formData.append("dangChieu", dangChieu);
    formData.append("hot", hot);
    formData.append("danhGia", danhGia);
    formData.append("maNhom", "GP10");
    formData.append("File", hinhanh, hinhanh.name);
    await dispatch(fetchUpload(formData));
    navigate("/admin");
    // console.log("formData", formData.get("File"));
  };

  const dispatch = useDispatch();
  return (
    <div className="flex">
      <div className="basis-1/6  ">
        <Nav />
      </div>
      <div className="basis-5/6  bg-slate-100">
        <div className="bg-white m-3 px-6 ">
          <h2>Thêm phim mới</h2>
          <Form
            labelCol={{
              span:4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            onFinish={onFinish}
            name="basic"
          >
            <Form.Item label="Tên phim :" name="tenPhim">
              <Input />
            </Form.Item>
            <Form.Item label="Trailer :" name="trailer">
              <Input />
            </Form.Item>
            <Form.Item label="Mô tả :" name="moTa">
              <TextArea
                autoSize={{
                  minRows: 4,
                  maxRows: 20,
                }}
              />
            </Form.Item>

            <Form.Item label="Ngày khởi chiếu :" name="ngayKhoiChieu">
              <DatePicker />
            </Form.Item>

            <Form.Item
              label="Đang chiếu :"
              valuePropName="checked"
              name="dangChieu"
            >
              <Switch />
            </Form.Item>
            <Form.Item
              label="Sắp chiếu :"
              valuePropName="checked"
              name="sapChieu"
            >
              <Switch />
            </Form.Item>
            <Form.Item label="Hot :" valuePropName="checked" name={"hot"}>
              <Switch />
            </Form.Item>
            <Form.Item label="Số sao :" name={"danhGia"}>
              <Input />
            </Form.Item>
            <Form.Item label="Upload :">
              <Input type="file" onChange={handChange} />
            </Form.Item>
            <Form.Item label="Tác vụ :">
              <Button type="primary" htmlType="submit">
                Thêm phim
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddFilm;
