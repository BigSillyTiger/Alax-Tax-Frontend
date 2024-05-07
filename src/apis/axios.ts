import axios from "axios";

const apis = axios.create({
    withCredentials: true,
    //baseURL: `http://localhost:8080`,
    // playground
    //baseURL: `https://cpsoftware.com.au`,
    //baseURL: `http://cpsoftware.com.au`,
    // alex
    //baseURL: `https://tool.srclandscaping.com.au`,
    baseURL: `https://test.srclandscaping.com.au`,
});

export default apis;
