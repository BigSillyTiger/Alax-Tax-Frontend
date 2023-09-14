import React, { FC } from "react";
import { useRouteError, redirect } from "react-router-dom";

const ErrBoundary: FC = () => {
    const error = useRouteError() as any;
    console.log("-> error bountary: ", error);
    /*  */
    return (
        <div>
            <p>Error: Something went wrong</p>
            <p>Error: ${error.status}</p>
        </div>
    );
};

export default ErrBoundary;
