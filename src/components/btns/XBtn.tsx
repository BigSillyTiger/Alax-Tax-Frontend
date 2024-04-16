import { ComponentPropsWithoutRef, FC } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

type Tprop = ComponentPropsWithoutRef<"div"> & {
    srStr?: string;
};

const XBtn: FC<Tprop> = (prop) => {
    const { onClick, srStr } = prop;
    const { t } = useTranslation();
    return (
        <div
            className="rounded-md bg-red-200 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto ml-2 cursor-pointer"
            onClick={onClick}
        >
            <span className="sr-only">{srStr ? srStr : t("btn.close")}</span>
            <XMarkIcon className="size-6" aria-hidden="true" />
        </div>
    );
};

export default XBtn;
