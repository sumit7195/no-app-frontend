import React, { useState } from "react";

import { useHistory, Link } from "react-router-dom";
import callBackendApi from "../common";

export default function Singup() {
  let [signUpForm, setSignUpForm] = useState({});
  let [err, setError] = useState(null);

  const history = useHistory();

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setSignUpForm((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let mandatoryFields = ["name", "email", "password"];

    let errObj = {};

    for (let i = 0; i < mandatoryFields.length; i++) {
      let name = mandatoryFields[i];
      if (signUpForm[name] === undefined || signUpForm[name].length === 0) {
        errObj[name] = `Please enter ${name} field!`;
      }
    }

    let errKeys = Object.keys(errObj);
    if (errKeys.length > 0) {
      return setError(errObj);
    }

    // call backend

    try {
      const makeRequest = await callBackendApi(
        "post",
        "/api/auth/register",
        signUpForm
      );

      const res = await makeRequest.status;

      if (res === 200 || res === 201) {
        history.push("/");
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  console.log(err);

  return (
    <div
      className="f-flex border login-container px-3  "
      style={{
        maxWidth: "400px",
        width: "50%",
        height: "70vh",
        margin: "auto",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column mt-5 mb-3 gap-1 ">
          <span className="mandatatory">Name:</span>
          <input
            name="name"
            className="input-box"
            type="text"
            onChange={handleChange}
          />

          {err?.name && <span className="error">{err?.name}</span>}
        </div>

        <div className="d-flex flex-column mb-3 gap-1">
          <span className="mandatatory">Email:</span>
          <input
            name="email"
            className="input-box"
            type="text"
            onChange={handleChange}
          />
          {err?.email && <span className="error">{err.email}</span>}
        </div>

        <div className="d-flex flex-column mb-3 gap-1 ">
          <span className="mandatatory">Password:</span>
          <input
            name="password"
            className="input-box"
            type="password"
            onChange={handleChange}
          />
          {err?.password && <span className="error">{err.password}</span>}
        </div>

        <div className="d-flex justify-content-center">
          <button className="button-box" type="submit">
            signUp
          </button>
        </div>
      </form>
    </div>
  );
}
