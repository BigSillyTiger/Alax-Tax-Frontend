import axios from "axios";

const apis = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:6464",
});

export default apis;
