import React, { useState } from "react";
import { ToastContainer } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

const Toaster = (props) => {
  const [show, setShow] = useState(true);

  return (
    <ToastContainer
      position="top-end"
      className="mt-3  "
      style={{ color: "whitesmoke" }}
    >
      <Toast
        bg="danger"
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Body>{props.msg}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Toaster;
