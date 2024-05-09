import React from "react";

const Bganimation = () => {
    return (
        <>
            <div className="absolute -top-20 left-4 size-60 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 z-10 animate-blob-move"></div>
            <div className="absolute top-0 -right-20 size-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 z-10 animate-blob-move"></div>
            <div className="absolute -bottom-20 -left-30 size-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 z-10 animate-blob-move"></div>
        </>
    );
};

export default Bganimation;
