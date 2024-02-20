import { defer } from "react-router-dom";

export const dashboardLoader = async () => {
    const result = 1;
    return defer({ content: result });
};
