import cookie from "react-cookies";
import { useHistory, Redirect } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { ThemeContext } from "../App";



const withProtected = (Component) => {
  return (props) => {
    const history = useHistory();

     const token =  cookie.load('auth')

     console.log('token' ,  typeof token);


     useEffect(()=>{
      if(token==='undefined' || token===undefined){
      return  history.push('/')
     }
  
     },[token])

   
  


  

    return <Component {...props} />;
  };
};

export default withProtected;
