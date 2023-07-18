import React, { FC } from "react";
import { useRouteError } from "react-router-dom";

const ErrBoundary: FC = () => {
    const error = useRouteError() as any;
    console.log("-> error bountary: ", error.status);
    return <div>Error: Something went wrong</div>;
};

export default ErrBoundary;
