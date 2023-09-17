import { API_CLIENT } from "@/apis";
import { defer } from "react-router-dom";

export const clientsLoader = async () => {
    const result = API_CLIENT.clientAll();
    return defer({ clients: result });
};
