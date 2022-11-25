/* eslint-disable no-undef */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { setUserToLocalStorage, updateUser } from "../address/UrlAddress";
import { AppContext } from "../context/AppContext";

export default function ProfilPicture() {
  const [success, setSuccess] = useState("");
  const { ProfilePicture, profilePicture, setProfilePicture, user } =
    useContext(AppContext);

  useEffect(() => {
    if (user.imageUrl === "") return;
    axios
      .put(`${updateUser}/${user._id}`, {
        imageUrl: user.imageUrl,
      })
      .then((response) => {
        if (response.status === 200 && success == 200)
          setUserToLocalStorage(user);
      })
      .catch((error) => console.log(error));
  }, [success]);

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

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="change-image-container">
        <img
          className="change-user-avatar"
          src={user.imageUrl === "" ? ProfilePicture : user.imageUrl}
          alt="user"
        />
      </div>
      <input
        type="file"
        onChange={(e) => setProfilePicture(e.target.files[0])}
      />
      <button onClick={(e) => uploadImage(e)}>Save</button>
    </div>
  );
}
