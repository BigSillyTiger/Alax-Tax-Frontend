import type { FC } from "react";
import SpinningEle from "@/components/loadingEle/SpinningEle";

const InitPage: FC = () => {
    return (
        <>
            <div
                className={`h-dvh w-screen flex justify-center content-center`}
            >
                <SpinningEle />
            </div>
        </>
    );
};

export default InitPage;
