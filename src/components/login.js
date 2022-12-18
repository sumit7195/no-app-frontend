import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import callBackendApi from "../common";
import { useHistory } from "react-router-dom";
import cookie from "react-cookies";
import { ThemeContext } from "../App";
import Toaster from "./toast";

export default function Login() {
  const [form, setForm] = useState({});
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);
  const [showtoast, setShowToast] = useState(false);
  const theme = useContext(ThemeContext);

  const history = useHistory();

 

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setForm((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let mandatoryFields = ["email", "password"];

    let errObj = {};

    mandatoryFields.forEach((item) => {
      if (form[item] === undefined || form[item].length === 0) {
        errObj[item] = `Please enter ${item} field!`;
      }
    });

    let keys = Object.keys(errObj);

    if (keys.length > 0) {
     return setErr(errObj);

    }

    try {
      setLoading(true);

      const makeRequest = await callBackendApi("post", "/api/auth/login", form);

      let resdata = await makeRequest.data;

      if (makeRequest.status === 200) {
        cookie.save("auth", resdata.token);
        theme.getUserProfile();
        history.push("/home");
        setLoading(false);
      } 
        
     
    } catch (err) {
      console.log(err);
      setShowToast(true);
      // alert(err.message);
      setLoading(false);
    }
  };

  console.log(err);

  return loading ? (
    <div class="spinner-border m-auto" role="status">
      <span class="visually-hidden  ">Loading...</span>
    </div>
  ) : (
    <>
      {showtoast && (
        <Toaster msg={"Please Check Email or Password"} setToast={true} />
      )}

      <div
        className="f-flex border login-container px-3   "
        style={{
          width: "50%",
          maxWidth: "400px",
          height: "50vh",
          margin: "auto",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-column mt-5 mb-3">
            <span className="mandatatory">Email:</span>
            <input
              className="input-box"
              name="email"
              onChange={handleChange}
              type="text"
              placeholder="Enter email"
            />

            {err.email && <span className="error">{err.email}</span>}
          </div>

          <div className="d-flex flex-column mb-3">
            <span className="mandatatory">Password:</span>
            <input
              className="input-box"
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Enter password"
            />
            {err.password && <span className="error">{err.password}</span>}
          </div>

          <button className="button-box" type="submit">
            LogIn
          </button>
        </form>

        <div className="d-flex flex-column mt-5 align-items-center justify-content-center">
          <span>Did not have Account?</span>
          <Link to="/signup">
            <button className="button-box">signUp</button>
          </Link>
        </div>
      </div>
    </>
  );
}
