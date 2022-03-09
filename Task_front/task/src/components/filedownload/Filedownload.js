import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css"

function Filedownload() {
  const [fileDownload, setFileDownload] = useState([]);
  const [file, setFile] = useState();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [image, setImage] = useState();

  const listFile = async (e) => {
    try {
      const res = await axios.get("http://localhost:3000/list_files");
      //  console.log(res.data);
      if (res) {
        toast("List of file");
        setFileDownload(res.data);
      } else {
        toast("Failed to show list file");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fileSelect = async (e) => {
    try {
      let file = e.target.innerText;

      if (file) {
        setFile(file);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fileSize = async (e) => {
    e.preventDefault();
    console.log(width, "add", height);

    let params = {
      filename: file,
      width: width,
      height: height,
    };

    const res = await axios.get("http://localhost:3000/resize", {
      params: params,
    });

    // console.log();
    setImage(res.request.responseURL);
    setFile("");
  };

  // useEffect(() => {
  //  console.log(file)
  // },[file])

  return (
    <div>
      <h2>List of Files</h2>
      <button onClick={listFile}>Click here to see the list</button>

      <ul>
        {fileDownload.map((data, index) => (
          <div key={index}>
            <li onClick={fileSelect}>{data.file}</li>
          </div>
        ))}
      </ul>

      <br />
      <h2>Selected File is -- {file}</h2>

      <br />

      <h3>Please give the width and heigth of image you want to download</h3>

      <div>
        <form>
          <input
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            label="Enter the Width"
          />
          <input
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            label="Enter the Height"
          />

          <button type="submit" onClick={fileSize}>
            Sumbit
          </button>
          <br />
          <br />
          <div>
            {image && (
              <a
                onClick={() => setImage("")}
               className="btn"
                href={image}
                download
              >
                download
              </a>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Filedownload;
