import cookie from "react-cookies";
import { useHistory } from "react-router-dom";
import { useEffect,useContext, useState } from "react";
import { ThemeContext } from "../App";

const withProtected = (Component) => {
  return (props) => {
    const history = useHistory();

const theme = useContext(ThemeContext);

// cookie.save('auth'); 

    let token = theme.checkAlreadyLogged()


    

    if (!token) {
     return  history.push("/");
    }

    return <Component {...props} />;
  };
};

export default withProtected;
