import React from "react";
import { useDropzone } from "react-dropzone";

let currentImage;

function Dropzone({ open }) {
  const { getRootProps, getInputProps, acceptedFiles } =
    useDropzone({});
  
  const files = acceptedFiles.map((file) => (
    <img key={file.path} src={URL.createObjectURL(file)} />
  ));

  acceptedFiles.forEach(f => {
    if(!currentImage){
      currentImage = f.path;
      console.log(f)
    } else if(currentImage === f.path) {
      // do nothing
    } else {
      currentImage = f.path;
      console.log(f)
    }
  })

  return (
    <div className="allInputContainer">
      {acceptedFiles.length > 0 &&
        <div className="droppedImage">{files}</div>
      }
      {acceptedFiles.length === 0 && 
        <div className="container">
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag and drop a file here or click to select a file</p>
          </div>
        </div>
      }
    </div>
  );
}

export default Dropzone;