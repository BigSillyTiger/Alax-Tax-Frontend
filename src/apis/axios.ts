import axios from "axios";

const apis = axios.create({
    withCredentials: true,
    baseURL: `http://localhost:6464`,
    // playground
    //baseURL: `http://cpsoftware.com.au:6464`,
    // alex
    //baseURL: `http://tool.srclandscaping.com.au:6464`,
});

export default apis;
