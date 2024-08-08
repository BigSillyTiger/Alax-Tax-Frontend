import type { FC } from "react";
import { linearTitleBG } from "../../configs/utils/color";

type Tprops = {
    title: string;
};

const ModalTitle: FC<Tprops> = ({ title }) => {
    return (
        <div
            className={`h-[4dvh] flex justify-center items-center rounded-lg ${linearTitleBG}`}
        >
            <span className="text-slate-50 text-xl font-black italic">
                {title}
            </span>
        </div>
    );
};

export default ModalTitle;
