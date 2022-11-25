/* eslint-disable no-undef */
export const apiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL;

export const loginUrl =
  process.env.NODE_ENV === "production"
    ? `${process.env.REACT_APP_PROD_API_URL}api/auth/login`
    : `${process.env.REACT_APP_DEV_API_URL}api/auth/login`;

export const logupUrl =
  process.env.NODE_ENV === "production"
    ? `${process.env.REACT_APP_PROD_API_URL}api/auth/register`
    : `${process.env.REACT_APP_DEV_API_URL}api/auth/register`;

export const usersUrl =
  process.env.NODE_ENV === "production"
    ? `${process.env.REACT_APP_PROD_API_URL}api/users`
    : `${process.env.REACT_APP_DEV_API_URL}api/users`;

export const updateUser =
  process.env.NODE_ENV === "production"
    ? `${process.env.REACT_APP_PROD_API_URL}api/auth/user/update`
    : `${process.env.REACT_APP_DEV_API_URL}api/auth/user/update`;

export const setUserToLocalStorage = (user) => {
  window.localStorage.setItem("user", JSON.stringify(user));
  window.location.href = "/";
};
