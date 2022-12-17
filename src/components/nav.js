import Nav from "react-bootstrap/Nav";
import React, { useEffect, useState, useContext } from "react";

import { useHistory } from "react-router-dom";
import callBackendApi from "../common";
import Avatar from "react-avatar";
import cookie from "react-cookies";
import { ThemeContext } from "../App";

function Navbar() {
  const [activeLink, setActiveLink] = useState("/");
  const history = useHistory();
 
  const theme = useContext(ThemeContext);

  const logoutUser = async () => {
    const makeRequest = await callBackendApi("get", "/api/auth/logout");

    if (makeRequest.status === 200) {
      cookie.remove("auth");
       theme.toggleUserProfile();
      history.push("/");
    }
  };

  useEffect(() => {
    theme.getUserProfile();
  }, []);

  return (
    <>
      <div className="d-flex  justify-content-between">
        <Nav
          activeKey={activeLink}
          onSelect={(selectedKey) => {
            setActiveLink(selectedKey);
            history.push(selectedKey);
          }}
        >
          <Nav.Item>
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/">Login</Nav.Link>
          </Nav.Item>
        </Nav>

        <div>
          {theme.userProfile && (
            <div className="d-flex flex-column align-items-center justify-content-center gap-1">
              <Avatar name={theme.userProfile.name} size={50} round={true} />
              <button className="button-box" onClick={logoutUser}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
