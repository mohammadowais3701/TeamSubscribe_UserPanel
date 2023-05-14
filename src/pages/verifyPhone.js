import { useState } from "react";
import BAButton from "../components/Button/Button";
import BAInput from "../components/Input/Input";
import { message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

export default function VerifyPhone() {
  const [model, setModel] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  let Register = () => {
    if (!model.Email) {
      messageApi.open({
        type: "warning",
        content: "Email is required",
      });
    } else if (!model.Otp) {
      messageApi.open({
        type: "warning",
        content: "Otp is required",
      });
    } else {
      const formData = new FormData();
      formData.append("Email", model.Email);
      formData.append("Otp", model.Otp);
      let token = JSON.parse(localStorage.getItem("token"));
      const accessToken = token.accessToken;
      axios
        .post(`${process.env.REACT_APP_BASE_URL}User/verifyPhone`, formData)
        .then((response) => {
          console.log("Mesg", response);
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
            setModel([]);
          }
        })
        .catch((error) => {
          console.log(error);

          //   messageApi.open({
          //     type: "error",
          //     content: Array.isArray(error?.response?.data?.errors)
          //       ? error?.response?.data?.errors[0]
          //       : null,
          //   });
        });
    }
    console.log(model);
  };
  return (
    <div className="d-flex flex-column justify-content-center h-100 align-items-center ">
      {contextHolder}
      <div
        className="bg-white py-3 px-2"
        style={{
          borderRadius: 2,
          boxShadow: "0px 10px 20px 0px rgba(196,161,161,0.75)",
        }}
      >
        <div className="fs-30 mb-3 text-center text-cyan text-bold">
          Team Subscrybe
        </div>
        <div style={{ width: 500 }} className="mx-1 mb-1">
          <BAInput
            onChange={(e) => setModel({ ...model, Email: e.target.value })}
            placeholder="Enter Email"
            className="px-2"
          />
        </div>
        <div style={{ width: 500 }} className="mx-1 mb-1">
          <BAInput
            onChange={(e) => setModel({ ...model, Otp: e.target.value })}
            placeholder="Enter Otp"
            className="px-2"
          />
        </div>
        <div className="mx-1 mb-1 mt-2">
          <BAButton
            onClick={() => Register()}
            value="Verify"
            block={true}
            backgroundColor="#9c288d"
            color="white"
            className="fs-16"
          />
        </div>
        <div className="d-flex justify-content-end mx-1">
          <Link to="/Otp">Resend Phone Otp</Link>
        </div>
      </div>
    </div>
  );
}
