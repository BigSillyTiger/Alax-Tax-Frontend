import React, { FC, ReactElement } from "react";
import { Outlet } from "react-router-dom";

interface prop {
    children: ReactElement[] | ReactElement;
}

const Card: FC<prop> = ({ children }) => {
    return (
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
