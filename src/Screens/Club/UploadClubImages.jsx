import { useState } from "react";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";
// import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

export default function UploadClubImages({setAllImages}) {
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("acemimg");
  const [uploadPreset] = useState("msjjkxkz");

  const [uwConfig] = useState({
    cloudName,
    uploadPreset
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName
    }
  });

  const myImage = cld.image(publicId);

  const [getImages, setGetImages] = useState([]); // State variable to store image links

  const getDatafromCloud = (data) => {
    setGetImages((prevImages) => [...prevImages, data]); // Add the new image link to the array
    setAllImages((prevAllImages) => [...prevAllImages, data]);

 
  };




  return (
    <div className="App">
      <CloudinaryUploadWidget setImages={getDatafromCloud} uwConfig={uwConfig} setPublicId={setPublicId} />
      
    </div>
  );
}
