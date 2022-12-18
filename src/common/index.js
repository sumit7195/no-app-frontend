import axios from "axios";
import cookie from "react-cookies";

let backendUrl="https://no-app-assignement-api.onrender.com";

// if (process.env.NODE_ENV !== "production") {
//   backendUrl = "http://localhost:3001";
// } else {
//   backendUrl = "https://no-app-assignement-api.onrender.com";
// }

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
