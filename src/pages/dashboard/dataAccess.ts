import { API_ADMIN } from "@/apis";
import { defer } from "react-router-dom";

export const dashboardLoader = async () => {
    const result = API_ADMIN.test();
    return defer({ content: result });
};
