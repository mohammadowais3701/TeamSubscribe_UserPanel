import { Link, useNavigate } from "react-router-dom";
import add from "../assets/images/add.png";
import { useEffect, useState } from "react";
import BAInput from "../components/Input/Input";
import BAModal from "../components/Modal/Modal";
import BASelect from "../components/Select/Select";
import BAButton from "../components/Button/Button";
import { Col, Divider, Row, Spin, message } from "antd";
import {
  BellFilled,
  BellOutlined,
  DeleteOutlined,
  DollarOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import nodatafound from "../assets/images/nodatafound.png";
import BADatePickert from "../components/DatePicker/Datepicker";
import axios from "axios";
import "./style.css";
export default function Subscription() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState();
  const [model, setModel] = useState([]);
  const [databyID, setDatabyId] = useState();
  const [loader, setLoader] = useState(false);
  const [Dataloader, setLoaderData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpenDiscription, setisModalOpenDiscription] = useState(false);
  const [deleteJobs, setdeleteJobs] = useState({});

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalDiscription = (e) => {
    setisModalOpenDiscription(true);
    setLoaderData(true);
    let token = JSON.parse(localStorage.getItem("token"));
    axios
      .get(`${process.env.REACT_APP_BASE_URL}Job/View?id=${e}`, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setDatabyId(res.data.result.jobs);
        setLoaderData(false);
      })
      .catch((err) => {
        console.log(err);
        setLoaderData(false);
      });
  };
  const handleOk = () => {
    console.log("here", model);
    let offset = new Date().getTimezoneOffset();
    let date = new Date(model.renewDate);
    model.renewDate = new Date(date.getTime() + offset * 60000).toISOString();
    model.imageSrc = "https://www." + model.jobName.trim() + ".com/favicon.ico";

    // console.log("model", model);

    let token = JSON.parse(localStorage.getItem("token"));
    const accessToken = token.accessToken;

    // console.log('ACCESSTOKEN',accessToken)
    axios
      .post("http://20.127.224.138:5005/api/job/add", JSON.stringify(model), {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
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
        }
        getJobs();

        setModel([]);
        console.log(model);
      })
      .catch((error) => {
        console.log("ERROR", error);
        setModel([]);
        messageApi.open({
          type: "error",
          content: error.response.data.errors.user[0],
        });
        setModel([]);
        console.log(model);
      });

    setIsModalOpen(false);
    // }
  };
  const handleOkData = () => {
    setisModalOpenDiscription(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setisModalOpenDiscription(false);
    setModel([]);
  };
  const onChange = (date, dateString) => {
    setModel({ ...model, renewDate: dateString });
  };
  const onChangeSelect = (value) => {
    setModel({ ...model, isNotify: value });
  };
  let deleteJob = (i) => {
    let token = JSON.parse(localStorage.getItem("token"));
    console.log(token.accessToken);
    const accessToken = token.accessToken;
    console.log(token.accessToken);
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_BASE_URL}Job/Delete`,
      headers: {
        Authorization: "Bearer " + token.accessToken,
        "Content-Type": "application/json",
      },
      data: [i],
    })
      .then((res) => {
        console.log("Response:", res.data);
        if (res.data.errors[0]) {
          messageApi.open({
            type: "error",
            content: res.data.errors[0],
          });
        } else {
          messageApi.open({
            type: "success",
            content: res.data.message,
          });
        }
        getJobs();
        // getFamily();
      })
      .catch((error) => {
        console.error("Error:", error.response.data);
      });
    // axios
    //   .delete(`${process.env.REACT_APP_BASE_URL}Job/Delete`, payload, {
    //     headers: {
    //       // "content-type": "application/json",
    //       Authorization: "Bearer " + accessToken,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     getJobs();
    //     if (res.data.errors[0]) {
    //       messageApi.open({
    //         type: "error",
    //         content: res.data.errors[0],
    //       });
    //     } else {
    //       messageApi.open({
    //         type: "success",
    //         content: res.data.message,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  let notify = (e, i) => {
    console.log(e);
    let token = JSON.parse(localStorage.getItem("token"));
    if (jobs[i].isNotify) {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}Job/PauseNotify?JobId=${e}`,
          e,
          {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.errors[0]) {
            messageApi.open({
              type: "error",
              content: res.data.errors[0],
            });
          } else {
            messageApi.open({
              type: "success",
              content: res.data.message,
            });
          }
          getJobs();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}Job/ResumeNotify?JobId=${e}`,
          e,
          {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data.errors[0]) {
            messageApi.open({
              type: "error",
              content: res.data.errors[0],
            });
          } else {
            messageApi.open({
              type: "success",
              content: res.data.message,
            });
            getJobs();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  let getJobs = () => {
    setLoader(true);
    let token = JSON.parse(localStorage.getItem("token"));
    axios
      .get(`${process.env.REACT_APP_BASE_URL}Job/View`, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      })
      .then((res) => {
        console.log("RESPONSE", res);
        setJobs(res.data.result.jobs);
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
  useEffect(() => {
    // window.localStorage.setItem(
    //   "token",
    //   JSON.stringify({
    //     jwtToken:
    //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikh1cm1hdF8xIiwiZW1haWwiOiJodXJtYXQubmF6MDI0QGdtYWlsLmNvbSIsInVzZXJpZCI6IjIwIiwicm9sZWlkIjoiMiIsIm5iZiI6MTY4MzM0ODEyMiwiZXhwIjoxNjgzMzkxMzIyLCJpYXQiOjE2ODMzNDgxMjJ9.YLcXDw6Txm-j2YFdJ26GrvjLMp58pREctr1087j2QwU",
    //     refreshToken:
    //       "iCLiVyxhF64pndpceqYfO9cuSzimLAzF/oXZbsDh8sN7zVCUrFOxhJY6ey62t7G7AMNtRTF7k54COaQgzLOMfQ==",
    //     expireTime: "2023-04-25T09:23:15Z",
    //   })
    // );
    // if (!localStorage.getItem("token")) {
    //   // navigate("/");
    //   console.log("login")
    // }
    setLoader(true);
    getJobs();
  }, []);

  return (
    <div>
      <Row justify="space-between">
        <Col xs={12}></Col>
        <Col xs={12}>
          <div className="py-1 d-flex justify-content-end">
            <Link className="fs-20 mx-2 text-cyan " to="/family">
              <UsergroupAddOutlined /> Family
            </Link>
            <Link className="fs-20 mx-2 text-cyan " to="/">
              <DollarOutlined /> Buy Subscription
            </Link>
          </div>
        </Col>
      </Row>
      <Row className="container d-flex justify-content-center align-items-center">
        <Col xs={24}>
          {contextHolder}
          <Row className="d-flex align-items-center mt-3">
            <Col xs={6}>
              <div
                onClick={showModal}
                className="d-flex justify-content-center"
              >
                <span className="bg-red addIcon border-radius-50 cursorPointer">
                  <img className="" width={20} src={add} alt="" />
                </span>
              </div>
              <BAModal
                title="Job Details"
                showModal={showModalDiscription}
                isModalOpen={isModalOpenDiscription}
                onClick={handleOkData}
                handleCancel={handleCancel}
                value="OK"
              >
                {Dataloader ? (
                  <div className="d-flex justify-content-center mt-2">
                    <Spin />
                  </div>
                ) : databyID && databyID.length ? (
                  databyID.map((e, i) => {
                    return (
                      <div>
                        <p className="mt-2">Job Name</p>
                        <BAInput
                          value={e.jobName}
                          className="mb-2"
                          type="text"
                          placeholder="Email"
                        />
                        <p>Job Discriptin</p>
                        <BAInput
                          value={e.jobDescription}
                          className="mb-2"
                          type="text"
                          placeholder="Email"
                        />
                        <div clas>
                          <p>Renew Date</p>
                          <BAInput
                            value={e.renewDate.slice(0, 10)}
                            className="mb-2"
                            type="text"
                            placeholder="Email"
                          />

                          <p>Notify</p>
                          <BAInput
                            value={e.isNotify ? "true" : "false"}
                            className="mb-2"
                            type="text"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  ""
                )}
              </BAModal>
              <BAModal
                title="Add Job"
                showModal={showModal}
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
                onClick={handleOk}
              >
                <Divider />
                <BAInput
                  value={model.JobName}
                  onChange={(e) => {
                    setModel({ ...model, jobName: e.target.value });
                  }}
                  className="mb-2"
                  placeholder="Job Name"
                />
                <BAInput
                  value={model.JobDescription}
                  onChange={(e) => {
                    setModel({ ...model, jobDescription: e.target.value });
                  }}
                  className="mb-2"
                  placeholder="Job Description"
                />
                <Row justify={"space-between"}>
                  <BADatePickert
                    title={model.renewDate}
                    value={model.renewDate}
                    onChange={onChange}
                  />
                  <BASelect
                    value={model.isNotify}
                    onChangeSelect={onChangeSelect}
                    placeholder="is Notify"
                  />
                </Row>
              </BAModal>
            </Col>
            <Col xs={18}>
              <div>
                <h1 className="fs-40 text-cyan">FRANK'S SUBSCRIPTION</h1>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={24} className="mt-5">
              <Row justify="space-around">
                {console.log(jobs)}
                {jobs && jobs.length
                  ? jobs.map((e, i) => {
                      return (
                        <>
                          <Col
                            style={{ position: "relative" }}
                            className=""
                            xs={24}
                            lg={6}
                          >
                            <div className="">
                              <div
                                className="cursorPointer"
                                onClick={() => deleteJob(e.id)}
                              >
                                <DeleteOutlined
                                  style={{
                                    position: "absolute",
                                    right: 20,
                                    bottom: 20,
                                    fontSize: 20,
                                  }}
                                />
                              </div>
                              <div
                                onClick={() => notify(e.id, i)}
                                className="cursorPointer "
                                style={{
                                  position: "absolute",
                                  left: 240,
                                  bottom: 220,
                                }}
                              >
                                <p>{console.log(e.isNotify)}</p>
                                {e.isNotify ? (
                                  <BellFilled
                                    style={{
                                      fontSize: 50,
                                    }}
                                  />
                                ) : (
                                  <BellOutlined
                                    style={{
                                      fontSize: 50,
                                    }}
                                  />
                                )}{" "}
                              </div>
                              <div className="mx-1">
                                <div
                                  style={{
                                    boxShadow:
                                      "1px 1px 10px 1px rgba(120,100,141,0.6)",

                                    minHeight: 250,
                                  }}
                                  className="d-flex justify-content-center flex-column align-items-center"
                                >
                                  <div className="d-flex align-items-center">
                                    <img width="100%" src={e.imageSrc} alt="" />
                                  </div>
                                  <h1 className=" fs-324">{e.jobName}</h1>
                                  <h2>{e.renewDate.slice(0, 10)}</h2>
                                  <div className="py-1">
                                    <BAButton
                                      color="white"
                                      block={true}
                                      className="px-3"
                                      backgroundColor="#FF7D7D"
                                      value="VIEW"
                                      onClick={() => showModalDiscription(e.id)}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </>
                      );
                    })
                  : ""}
              </Row>
              {loader ? (
                <div className="d-flex justify-content-center align-items-center mt-5">
                  <Spin
                    type="info"
                    tip="Loading"
                    style={{ color: "purple" }}
                    size="large"
                  ></Spin>
                </div>
              ) : jobs && !jobs.length ? (
                <div className="d-flex justify-content-center align-items-center mt-5">
                  <img src={nodatafound} />
                </div>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
