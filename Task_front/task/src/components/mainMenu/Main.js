import React from 'react'
 import {Link } from "react-router-dom";
export default function Main() {
    // const history = useHistory();

    // const fileUpload = (id) => {

    //     if(id === "file"){

    //         let path = "../fileUpload/fileUpload";
    //         history.push(path);
    //     }
    //     else{
    //         let path = "../filedownload/Filedownload";
    //         history.push(path);
    //     }
        
    // }
    return (
        <div>
            <h1>Welcome to React FileZilla Application</h1>
            
            <div>
                <Link to="/fileUpload">
                <button id="id">FILE UPLOAD</button>
                </Link>
            
            </div>
            </div> 
      )
}
