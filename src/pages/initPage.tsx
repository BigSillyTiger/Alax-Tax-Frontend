import type { FC } from "react";
import SpinningEle from "@/components/loadingEle/SpinningEle";

const InitPage: FC = () => {
    return (
        <>
            <div className="h-[100dvh] w-[100dvw] flex justify-center content-center">
                <SpinningEle />
            </div>
        </>
    );
};

export default InitPage;
