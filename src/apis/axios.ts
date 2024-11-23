import axios from "axios";

const apis = axios.create({
    withCredentials: true,
    baseURL:
        window.location.hostname !== "localhost"
            ? `https://tool.srclandscaping.com.au`
            : `http://localhost:8080`,
    timeout: 40000, // 40 seconds
    //baseURL: `http://localhost:8080`,
    //baseURL: `https://tool.srclandscaping.com.au`,
});

export default apis;
