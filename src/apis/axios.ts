import axios from "axios";

const apis = axios.create({
    withCredentials: true,
    //baseURL: `http://localhost:8080`,
    baseURL: `https://tool.srclandscaping.com.au`,
});

export default apis;
