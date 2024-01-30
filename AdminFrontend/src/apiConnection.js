import axios from "axios";

const instance = axios.create({
  baseURL: "https://pera-ride.onrender.com/api/",
});

export default instance;
