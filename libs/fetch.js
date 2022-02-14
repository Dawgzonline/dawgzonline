import axios from "axios";

let localFetch = axios.create({
  baseURL: "/",
});

export const setToken = (token) => {
  localFetch = axios.create({
    baseURL: "/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getLocalFetch = () => {
  return localFetch;
};

export default getLocalFetch;
