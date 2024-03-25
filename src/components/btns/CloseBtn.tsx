import { ComponentPropsWithoutRef, FC } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

type Tprop = ComponentPropsWithoutRef<"button"> & {
    srStr?: string;
    xhoverStyle?: string;
    xStyle?: string;
};

const CloseBtn: FC<Tprop> = ({
    onClick,
    srStr,
    xStyle = "size-6 text-gray-400 hover:text-gray-900",
}) => {
    const { t } = useTranslation();
    return (
        <button type="button" className="-m-2.5 p-2.5" onClick={onClick}>
            <span className="sr-only">{srStr ? srStr : t("btn.close")}</span>
            <XMarkIcon className={xStyle} aria-hidden="true" />
        </button>
    );
};

export default CloseBtn;
