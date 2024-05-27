import { ComponentPropsWithoutRef, FC } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

type Tprop = ComponentPropsWithoutRef<"div"> & {
    srStr?: string;
    index?: number;
};

const XBtn: FC<Tprop> = ({ onClick, srStr, index }) => {
    const { t } = useTranslation();
    return (
        <div
            className="rounded-md bg-red-200 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto ml-2 cursor-pointer flex flex-row items-center justify-center gap-x-2"
            onClick={onClick}
        >
            <span className="sr-only">{srStr ? srStr : t("btn.close")}</span>
            {index ? <span>{index}</span> : null}
            <XMarkIcon className="size-6" aria-hidden="true" />
        </div>
    );
};

export default XBtn;
