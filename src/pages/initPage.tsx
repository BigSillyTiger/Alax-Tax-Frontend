import type { FC } from "react";
import SpinningEle from "@/components/loadingEle/SpinningEle";
import { fullH, fullW } from "@/configs/ui";

const InitPage: FC = () => {
    return (
        <>
            <div
                className={`h-[${fullH}] w-[${fullW}] flex justify-center content-center`}
            >
                <SpinningEle />
            </div>
        </>
    );
};

export default InitPage;
