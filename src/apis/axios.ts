import axios from "axios";

const apis = axios.create({
    withCredentials: true,
    baseURL: `http://localhost:6464`,
    //baseURL: `http://170.64.214.8:6464`,
});

export default apis;
