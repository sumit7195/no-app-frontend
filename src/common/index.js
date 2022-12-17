import axios from "axios";
import cookie from "react-cookies";

const backendUrl = "http://localhost:3001";

export const callBackendApi = async (method, url, data, params, context) => {
 
  return await axios({
    url: backendUrl + url,
    method,
    data,
    headers: { auth: cookie.load("auth") },
    params,
  });
};

export default callBackendApi;
