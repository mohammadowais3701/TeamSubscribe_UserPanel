import { Col, Divider, Input, Row, message, Spin } from "antd";
import add from "../assets/images/add.png";
import BAImage from "../components/Image/Image";
import BAModal from "../components/Modal/Modal";
import { useEffect, useState } from "react";
import BAInput from "../components/Input/Input";
import axios from "axios";
import {
  BellOutlined,
  DeleteOutlined,
  DollarOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import nodatafound from "../assets/images/nodatafound.png";
import { Link, useNavigate } from "react-router-dom";

export default function Family() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [model, setModel] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [family, setFamily] = useState([]);
  const [loader, setLoader] = useState(false);
  const [deleteUser, setDeleteUser] = useState([]);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    var token = JSON.parse(localStorage.getItem("token"));
    console.log(token.accessToken);
    const accessToken = token.accessToken;
    if (!model.email) {
      messageApi.open({
        type: "success",
        content: "Email is required",
      });
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(model.email)) {
      messageApi.open({
        type: "error",
        content: "Invalid Email",
      });
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BASE_URL}User/addUser`, model, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("RESPONSE", response.data.message);
        messageApi.open({
          type: "success",
          content: response.data.message,
        });
        setModel([]);
        console.log(model);
      })
      .catch((error) => {
        console.log("ERROR", error.response.data.errors.user[0]);
        messageApi.open({
          type: "error",
          content: error.response.data.errors.user[0],
        });
        setModel([]);
        console.log(model);
      });

    setModel([]);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getFamily = () => {
    setLoader(true);
    var token = JSON.parse(localStorage.getItem("token"));
    var email = localStorage.getItem("email");
    console.log(token.accessToken);

    axios
      .get(`${process.env.REACT_APP_BASE_URL}Common/userlist?Email=${email}`, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.result.users);
        setFamily(res.data.result.users);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 401) {
          console.log("route to Login");
        }
        setLoader(false);
      });
  };
  const deleteFamily = (e) => {
    var token = JSON.parse(localStorage.getItem("token"));
    console.log(token.accessToken);
    console.log([e]);

    axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}User/deleteusers`,
      headers: {
        Authorization: "Bearer " + token.accessToken,
        "Content-Type": "application/json",
      },
      data: [e],
    })
      .then((response) => {
        console.log("Response:", response.data);
        getFamily();
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
  };
  let getUser = () => {
    var token = JSON.parse(localStorage.getItem("token"));
    console.log(token.accessToken);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}Common/GetDetails`, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.result);

        setUser([res.data.result]);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 401) {
          console.log("route to Login");
        }
      });
  };
  useEffect(() => {
    // window.localStorage.setItem(
    //   "token",
    //   JSON.stringify({
    //     jwtToken:
    //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikh1cm1hdF8xIiwiZW1haWwiOiJodXJtYXQubmF6MDI0QGdtYWlsLmNvbSIsInVzZXJpZCI6IjIwIiwicm9sZWlkIjoiMiIsIm5iZiI6MTY4MzMxMzE4NywiZXhwIjoxNjgzMzU2Mzg3LCJpYXQiOjE2ODMzMTMxODd9.zbIhm7c_aVOddXFDBq6XlgNHDCVKffZw9DwjqMWEjFk",
    //     refreshToken:
    //       "iCLiVyxhF64pndpceqYfO9cuSzimLAzF/oXZbsDh8sN7zVCUrFOxhJY6ey62t7G7AMNtRTF7k54COaQgzLOMfQ==",
    //     expireTime: "2023-04-25T09:23:15Z",
    //   })
    // );
    // if (!localStorage.getItem("token")) {
    //   navigate("/");
    // }
    // setLoader(true);
    getFamily();
    getUser();
  }, []);
  return (
    <div>
      <Row justify="space-between">
        <Col xs={12}>
          <div>{/* <img width="60px" src={logo} /> */}</div>
        </Col>
        <Col xs={12}>
          <div className="py-1 d-flex justify-content-end">
            <Link className="fs-20 mx-2 text-cyan " to="/">
              <DollarOutlined /> Buy Subscription
            </Link>
            <Link className="fs-20 mx-2 text-cyan " to="/subscription">
              <BellOutlined /> My Jobs
            </Link>
          </div>
        </Col>
      </Row>

      <Row className="py-2 container d-flex justify-content-center align-items-center">
        <Col xs={24}>
          <Row className="d-flex align-items-center mb-3 ">
            <Col xs={6}>
              {contextHolder}
              <div
                onClick={showModal}
                className="d-flex justify-content-center "
              >
                <span className="bg-red addIcon border-radius-50 cursorPointer ">
                  <img className="" width={20} src={add} alt="" />
                </span>
              </div>
              <BAModal
                title="Add User"
                showModal={showModal}
                isModalOpen={isModalOpen}
                // handleOk={handleOk}
                onClick={handleOk}
                handleCancel={handleCancel}
              >
                <Divider />
                <BAInput
                  value={model.email}
                  onChange={(e) =>
                    setModel({ ...model, email: e.target.value })
                  }
                  className="mb-2"
                  type="text"
                  placeholder="Email"
                />
              </BAModal>
            </Col>
            <Col xs={18}>
              <div>
                <h1 className="text-cyan" style={{ fontSize: "50px" }}>
                  FREEMAN FAMILY
                </h1>
              </div>
            </Col>
          </Row>
          <div className="bg-cyan container py-1">
            <div className="d-flex justify-content-center">
              {loader ? (
                <div className="d-flex justify-content-center align-items-center mt-5">
                  <Spin
                    type="info"
                    tip="Loading"
                    style={{ color: "purple" }}
                    size="large"
                  ></Spin>
                </div>
              ) : (
                ""
              )}
            </div>
            <Row>
              {user && user.length
                ? user.map((e, i) => {
                    return (
                      <Col key={i} xs={24} md={6} className="mb-2">
                        <div
                          style={{ minHeight: 300, minWidth: 200 }}
                          className="d-flex flex-column justify-content-between p-2 border-1 mx-1"
                        >
                          <div>
                            {e.image ? <BAImage src={e.image} /> : <div></div>}
                          </div>
                          <div className="mt-2 mb-2">
                            <h1 className="text-cyan">{e.name}</h1>
                            <p className="text-cyan">{e.email}</p>
                          </div>
                        </div>
                        <div>
                          <div
                            className="cursorPointer"
                            onClick={() => deleteFamily(e.id)}
                          ></div>
                        </div>
                      </Col>
                    );
                  })
                : ""}

              {family && family.length
                ? family.map((e, i) => {
                    return (
                      <Col key={i} xs={24} md={6} className="mb-2">
                        <div
                          style={{ minHeight: 300, minWidth: 200 }}
                          className="d-flex flex-column justify-content-between p-2 border-1 mx-1"
                        >
                          <div>
                            {e.image ? <BAImage src={e.image} /> : <div></div>}
                          </div>
                          <div className="mt-2 py-1">
                            <h1 className="text-cyan">{e.name}</h1>
                            <p className="text-cyan">{e.email}</p>
                          </div>
                        </div>
                        <div>
                          <div
                            className="cursorPointer " 
                            onClick={() => deleteFamily(e.id)}
                          >
                            <DeleteOutlined
                              style={{
                                position: "absolute",
                                right: 20,
                                bottom: 10,
                                fontSize: 20,
                              }}
                            />
                          </div>
                        </div>
                      </Col>
                    );
                  })
                : ""}
            </Row>
            {/* <p>{console.log(family.length)}</p> */}
            {/* {loader ? (
              <div className="d-flex justify-content-center align-items-center mt-5">
                <Spin
                  type="info"
                  tip="Loading"
                  style={{ color: "purple" }}
                  size="large"
                ></Spin>
              </div>
            ) : !family && user && user.length ? (
              <div className="d-flex justify-content-center align-items-center mt-5">
                <img src={nodatafound} />
              </div>
            ) : (
              ""
            )} */}
          </div>
        </Col>
      </Row>
    </div>
  );
}
