import React from "react";
import SpinningEle from "./SpinningEle";

const LoadingPage = () => {
    return (
        <>
            <div className="px-auto py-auto">
                <p>loadingPage</p>;
                <SpinningEle />
            </div>
        </>
    );
};

export default LoadingPage;
