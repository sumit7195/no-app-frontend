import cookie from "react-cookies";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const withProtected = (Component) => {
  return (props) => {
    const history = useHistory();

    const [token, setToken] = useState(cookie.load("auth") || null);

    if (!token) {
      history.push("/");
    }

    return <Component {...props} />;
  };
};

export default withProtected;
