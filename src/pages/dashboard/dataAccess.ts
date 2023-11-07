import { API_ADMIN } from "@/apis";
import { defer } from "react-router-dom";

const loader = async () => {
    const result = 1;
    return defer({ content: result });
};

export default loader;
