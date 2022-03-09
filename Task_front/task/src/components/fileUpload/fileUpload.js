import React, { useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileDownload from "../filedownload/Filedownload.js";

toast.configure();
function Fileupload() {
  const [file, setFile] = useState();

  const ref = useRef();
  const history = useHistory();

  const saveFile = (e) => {
    console.log(e.target.files[0]);

    setFile(e.target.files[0]);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("http://localhost:3000/upload", formData);

      if (res) {
        toast("File uploaded successfully");
        ref.current.value = "";
      } else {
        toast("Failed to upload file");
      }

      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h2>PLease Upload the File</h2>
      <input type="file" ref={ref} onChange={saveFile}></input>
      <button onClick={uploadFile}>Upload</button>
      <br />
      <br />
      <button
        onClick={() => {
          history.push("/filedownload");
        }}
      >
        Click here to download the file
      </button>
      <div></div>
    </div>
  );
}

export default Fileupload;
