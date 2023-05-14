import { Button, Modal } from "antd";
import { useState } from "react";
import "./style.css";
export default function BAModal(props) {
  const {
    children,
    showModal,
    isModalOpen,
    onClick,
    handleOk,
    handleCancel,
    title,
    value,
  } = props;

  return (
    <>
      <Modal
        centered
        closable={false}
        footer={
          <Button
            onClick={onClick}
            style={{
              width: "100%",
              minHeight: 40,
              fontSize: 20,
              backgroundColor: "#9c288d",
              color: "white",
              borderRadius: "0px",
            }}
          >
            {value ?? "Add"}
          </Button>
        }
        title={title}
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={handleCancel}
        okText="ADD"
      >
        {children}
      </Modal>
    </>
  );
}
