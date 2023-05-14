import { Col, Row, message } from "antd";
import BAInput from "../components/Input/Input";
import BAButton from "../components/Button/Button";
import { useState } from "react";
import BASelect from "../components/Select/Select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [model, setModel] = useState([]);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const onChangeSelect = (value) => {
    setModel({ ...model, IsEmailNotify: value });
  };
  const onChangeSelectEmail = (value) => {
    setModel({ ...model, IsPhoneNotify: value });
  };
  let Register = async () => {
    console.log("MODEL",model);
    if (!model.Name) {
      messageApi.open({
        type: "warning",
        content: "Name is required",
      });
    } else if (!model.UserName) {
      messageApi.open({
        type: "warning",
        content: "User Name is required",
      });
    } else if (!model.Email) {
      messageApi.open({
        type: "warning",
        content: "Email is required",
      });
    } else if (!model.PhoneNumber) {
      messageApi.open({
        type: "warning",
        content: "Phone Number is required",
      });
    } else if (!model.Password) {
      messageApi.open({
        type: "warning",
        content: "Password is required",
      });
    } else if (!model.ConfirmPassword) {
      messageApi.open({
        type: "warning",
        content: "Confirm Password is required",
      });
    } else if (model.Password != model.ConfirmPassword) {
      messageApi.open({
        type: "warning",
        content: "Password doesn't match",
      });
    } else if (model.IsEmailNotify == true) {
      model.IsEmailNotify = "true";
    } else if (model.IsEmailNotify == false) {
      model.IsEmailNotify = "false";
    } else if (!model.IsEmailNotify) {
      messageApi.open({
        type: "warning",
        content: "Email Notify is required",
      });
    } else if (model.IsPhoneNotify == true) {
      model.IsPhoneNotify = "true";
    } else if (model.IsPhoneNotify == false) {
      model.IsPhoneNotify = "false";
    } else if (!model.IsPhoneNotify) {
      messageApi.open({
        type: "warning",
        content: "Phone Notify is required",
      });
    } else {
      const formData = new FormData();
      formData.append("UserName", model.UserName);
      formData.append("ImageSrc", model.ImageSrc);
      formData.append("Name", model.Name);
      formData.append("PhoneNumber", model.PhoneNumber);
      formData.append("Email", model.Email);
      formData.append("Password", model.Password);
      formData.append("ConfirmPassword", model.ConfirmPassword);
      formData.append("IsEmailNotify", model.IsEmailNotify);
      formData.append("IsPhoneNotify", model.IsPhoneNotify);
      // console.log("here");
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}User/RegisterUser`, formData, {
          // headers: {
          //   Authorization: `Bearer ${accessToken}`,
          // },
        })
        .then((response) => {
          console.log("Mesg", response, model);
          if (model.IsPhoneNotify == "true") {
            setTimeout(() => {
              navigate("/verify");
            }, 1000);
            if (response.data.errors[0]) {
              messageApi.open({
                type: "error",
                content: response.data.errors[0],
              });
            } else {
              messageApi.open({
                type: "success",
                content: response.data.message,
              });
            }
          } else {
            setModel([]);
            if (response.data.errors[0]) {
              messageApi.open({
                type: "error",
                content: response.data.errors[0],
              });
            } else {
              messageApi.open({
                type: "success",
                content: response.data.message,
              });
            }
          }

          // setModel([]);
          // messageApi.open({
          //   type: "success",
          //   content: response.data.error[0],
          // });
          // }
          // getJobs();

          // setModel([]);
          // console.log(model);
        })
        .catch((error) => {
          console.log("Mesg", error, model);
          // console.log(error);
          // if (error) {
          //   console.log("ERROR", error?.response?.data?.errors[0]);
          messageApi.open({
            type: "error",
            content: Array.isArray(error?.response?.data?.errors)
              ? error?.response?.data?.errors[0]
              : null,
          });
          //   // setModel([]);
          // }
          // setModel([]);
          // console.log(model)
        });
    }
    console.log("hereend");
    // setIsModalOpen(false);
  };
  return (
    <div>
      <Row className="">
        <Col xs={24}>
          <div className="d-flex justify-content-center h-100 align-items-center">
            {contextHolder}
            <div
              style={{
                width: 550,
                backgroundColor: "white",
                borderRadius: 5,
                boxShadow: "1px 1px 10px 1px rgba(120,100,141,0.6)",
              }}
              className="py-2 px-3"
            >
              <h1
                style={{ letterSpacing: 2 }}
                className="text-cyan text-center fs-30 mb-2"
              >
                REGISTER
              </h1>
              <div className="my-2 ">
                <p>Select an Image</p>
                <BAInput
                  value={model.ImageSrc}
                  onChange={(e) =>
                    setModel({ ...model, ImageSrc: e.target.value })
                  }
                  className="fs-16"
                  type="file"
                  name="image"
                />
              </div>
              <div className="my-2">
                <BAInput
                  value={model.Name}
                  onChange={(e) => setModel({ ...model, Name: e.target.value })}
                  className="fs-16"
                  placeholder="Enter Name"
                />
              </div>
              <div className="my-2">
                <BAInput
                  onChange={(e) =>
                    setModel({ ...model, UserName: e.target.value })
                  }
                  value={model.UserName}
                  className="fs-16"
                  placeholder="Enter User Name"
                />
              </div>
              <div className="my-2">
                <BAInput
                  onChange={(e) =>
                    setModel({ ...model, Email: e.target.value })
                  }
                  value={model.Email}
                  type="email"
                  className="fs-16"
                  placeholder="Enter Email"
                />
              </div>
              <div className="my-2">
                <BAInput
                  onChange={(e) =>
                    setModel({ ...model, PhoneNumber: e.target.value })
                  }
                  value={model.PhoneNumber}
                  type="email"
                  className="fs-16"
                  placeholder="Enter Phone Number"
                />
              </div>
              <div className="my-2">
                <BAInput
                  className="fs-16"
                  value={model.Password}
                  onChange={(e) =>
                    setModel({ ...model, Password: e.target.value })
                  }
                  type="password"
                  placeholder="Enter Password"
                />
              </div>
              <div className="my-2">
                <BAInput
                  value={model.ConfirmPassword}
                  className="fs-16"
                  type="password"
                  onChange={(e) =>
                    setModel({ ...model, ConfirmPassword: e.target.value })
                  }
                  placeholder="Confirm Password "
                />
              </div>
              <div className="my-2 ">
                <BASelect
                  value={model.IsEmailNotify}
                  onChangeSelect={onChangeSelect}
                  placeholder="is Email Notify"
                />

                <BASelect
                  value={model.IsPhoneNotify}
                  onChangeSelect={onChangeSelectEmail}
                  placeholder="is Phone Notify"
                />
              </div>
              <div className="my-2">
                <BAButton
                  className="fs-16"
                  borderRadius="3px"
                  color="white"
                  onClick={Register}
                  backgroundColor="#9c288d"
                  block={true}
                  value="Register"
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
