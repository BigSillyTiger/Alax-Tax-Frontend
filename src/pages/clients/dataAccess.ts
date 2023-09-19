import { API_CLIENT } from "@/apis";
import { defer } from "react-router-dom";

const loader = async () => {
    const result = API_CLIENT.clientAll();
    return defer({ clients: result });
};

export default loader;
