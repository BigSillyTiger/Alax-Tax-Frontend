import axios from "axios";

const apis = axios.create({
    withCredentials: true,
    //baseURL: "http://https://src-backend-453b0a1d3a5a.herokuapp.com:6464",
    baseURL: "http://localhost:6464",
});

export default apis;
