import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { setUserToLocalStorage } from "../address/ApiAddress";
import { AppContext } from "../context/AppContext";

export default function ProfilPicture() {
  const [success, setSuccess] = useState("");
  const { ProfilePicture, profilePicture, setProfilePicture, user } =
    useContext(AppContext);

  useEffect(() => {
    if (user.imageUrl === "") return;
    axios
      .put(`http://localhost:5000/api/auth/user/update/${user._id}`, {
        imageUrl: user.imageUrl,
      })
      .then((response) => {
        if (response.status === 200) setUserToLocalStorage(user);
      })
      .catch((error) => console.log(error));
  }, [success]);
  console.log(user.imageUrl);
  console.log(user);
  //   console.log(imageUrl);

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", profilePicture);
    formData.append("upload_preset", "r6gfn2yt");

    axios
      .post("https://api.cloudinary.com/v1_1/dxpjmkij5/image/upload", formData)
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="image-user">
        <img
          className="user-avatar"
          src={user.imageUrl === "" ? ProfilePicture : user.imageUrl}
          alt="user"
        />
      </div>
      <input
        type="file"
        onChange={(e) => setProfilePicture(e.target.files[0])}
      />
      <button onClick={uploadImage}>Send</button>
    </div>
  );
}
