import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const { ADDR: server_addr } = process.env;

const apis = axios.create({
    withCredentials: true,
    //baseURL: "http://https://src-backend-453b0a1d3a5a.herokuapp.com:6464",
    baseURL: `http://${server_addr}:6464`,
});

export default apis;
