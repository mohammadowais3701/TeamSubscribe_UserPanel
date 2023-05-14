/*global chrome*/

import { Col, Row } from "antd";
import chrome from "chrome-extension-async";
import { Link, useNavigate } from "react-router-dom";
import { useChromeStorageLocal } from "use-chrome-storage";
import BAButton from "../components/Button/Button";
import {
  BellOutlined,
  CheckOutlined,
  DollarOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import "./style.css";
import { useEffect, useState } from "react";
export default function Plan() {
  // const navigate=useNavigate()
  const cards = [
    {
      id: 1,
      heading: "PLAN A",
      price: "Free",
      features: ["8 Users", "10 Subscriptions", "36 Days", "2X"],
      color: "#e93948",
    },
    {
      id: 2,
      heading: "PLAN B",
      price: "$ 0.00",
      features: ["12 Users", "70 Subscriptions", "72 Days", "4X"],
      color: "#f9ca01",
    },
    {
      id: 3,
      heading: "PLAN C",
      price: "Free",
      features: ["12 Users", "Unlimited", "1 Year", "Unlimited Select"],
      color: "#97dd01",
    },
    {
      id: 4,
      heading: "PLAN D",
      price: "$ 0.00",
      features: ["16 Users", "Unlimited", "2 Year", "Unlimited Select"],
      color: "#01a8f6",
    },
  ];
  // const [data, setData] = useState("");
  // const [email, setEmail] = useState("");

  // useEffect(() => {
  //   const token=localStorage.getItem(JSON.parse("token"))
  //   setData(token)
  //   const email=localStorage.getItem("email")
  //   setEmail(email)
  //   // Load data from Chrome storage on component mount
  //   // chrome.storage.sync.get("token", (result) => {
  //   //   setData(result.token || "");
  //   // });
  // }, []);
  // const token = localStorage.getItem("token");
  // console.log(token);
  // chrome.storage.local.get(["token"], function (result) {
  //   console.log("User is token" );
  //   // you can use the variable or set to any state variable from here
  // });
  // useEffect(() => {
  //   console.log(localStorage.getItem("token"));

  //   // console.log(localStorage.getItem(JSON.parse("token")))
    
  // }, []);

  return (
    <div>
      <Row justify="space-between">
        <Col xs={12}></Col>
        <Col xs={12}>
         
          <div className="py-1 d-flex justify-content-end">
            <Link className="fs-20 mx-2 text-cyan " to="/family">
              <UsergroupAddOutlined /> Family
            </Link>
            <Link className="fs-20 mx-2 text-cyan " to="/subscription">
              <BellOutlined /> My Jobs
            </Link>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <div className="container d-flex flex-column justify-content-around align-items-center">
            <Row>
              <Col xs={24} className="">
                <div className="mt-2 d-flex flex-column align-items-center justify-content-center">
                  <h1 className="text-cyan fs-40">Pick Best the Plan</h1>
                  <p className="text-cyan fs-24 font-500">
                    Take your desired plan to get our subscription.
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="mt-3 d-flex justify-content-around align-items-center">
              {cards.map((e, i) => {
                return (
                  <Col
                    xs={24}
                    lg={6}
                    sm={24}
                    md={24}
                    xl={6}
                    xxl={6}
                    className="mb-2 "
                  >
                    <div
                      style={{
                        boxShadow: "1px 1px 10px 1px rgba(120,100,141,0.6)",
                        minWidth: 200,
                      }}
                      className="mainCard bg-white border-radius-1 text-center py-5 px-3 mx-1"
                    >
                      <div className="">
                        <h1 style={{ color: e.color }}>{e.heading}</h1>
                        <p className="fs-30 fw-500 ">{e.price}</p>
                        <div className="mt-1 ">
                          {e.features.map((e, i) => {
                            return (
                              <div
                                key={i}
                                className="mt-2 d-flex align-items-center justify-content-start "
                              >
                                <CheckOutlined
                                  style={{ fontSize: 15, color: "green" }}
                                />
                                <h3 className="mx-1">{e}</h3>
                              </div>
                            );
                          })}
                          <div className="mt-2 d-flex align-items-center justify-content-start ">
                            <BAButton
                              backgroundColor={e.color}
                              color="white"
                              block={true}
                              value="Buy Now"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}
