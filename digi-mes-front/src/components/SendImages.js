import React from "react";
import axios from "axios";

export default function SendImages() {
  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", profilePicture);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

    axios
      .post(process.env.REACT_APP_CLOUDINARY_URL, formData)
      .then((response) => {
        if (response.status === 200) {
          setSuccess(response.status);
          user.imageUrl = response.data.secure_url;
        }
      });
  };

  return <></>;
}
