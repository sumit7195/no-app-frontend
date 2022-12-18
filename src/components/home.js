import React, { useEffect, useState, useCallback } from "react";
import cookie from "react-cookies";
import callBackendApi from "../common";

export default function Home() {
  let [files, setFiles] = useState({});

  let [userFiles, setUserFiles] = useState([]);

  const getUserFiles = async () => {
    try {
      const makeRequest = await callBackendApi("get", "/api/files").then(
        (res) => {
          setUserFiles(res.data.data);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = useCallback(async (e) => {
    try {
      const makeRequest = await callBackendApi(
        "delete",
        `/api/delete/${e.target.name}`
      );

      if (makeRequest.status === 200) {
        const newFiles = userFiles.filter((item) => item._id !== e.target.name);

        setUserFiles(newFiles);
      }

      // console.log("delete request", makeRequest);
    } catch (err) {
      alert(err.message);
    }
  });

  useEffect(() => {
    getUserFiles();
  }, []);

  console.log(userFiles);

  const uploadFile = async (e) => {
    e.preventDefault();

    let file = e.target.files[0];

    setFiles(file);
  };

  const uploadFiles = async (e) => {
    e.preventDefault();

    // const formdata =  new formData()
    const formData = new FormData();
    formData.append("avatar", files);

    try {
      const makeRequest = await callBackendApi("post", "/api/upload", formData);

      const files = await makeRequest.data.data;

      setUserFiles([...userFiles, ...files]);

      // console.log("uploadFiles", makeRequest)

      setFiles(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className=" d-flex justify-content-center align-items-center">
        <div class="mb-3">
          <form
            enctype="multipart/form-data"
            onSubmit={uploadFiles}
            className="d-flex"
          >
            <input
              class="form-control"
              type="file"
              id="formFile"
              onChange={uploadFile}
              name="avatar"
            />
            <button className="uploadButton" type="submit">
              Upload
            </button>
          </form>
        </div>
      </div>

      {userFiles && (
        <div className=" d-flex flex-column justify-content-center align-items-center mt-5">
          <h1>Uploaded Files</h1>

          <div>
            <table id="customers">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Phone</td>
                  <td>Email</td>
                  <td>linkedin</td>
                  <td>Profile_url</td>
                  <td>Delete</td>
                </tr>
              </thead>

              <tbody>
                {userFiles.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>{item.linkedin}</td>
                    <td>{item.profile_url}</td>
                    <td>
                      <button
                        name={item._id}
                        className="button-box"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
