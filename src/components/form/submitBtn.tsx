import type { FC, ComponentPropsWithoutRef } from "react";
import { useTranslation } from "react-i18next";

type Tprops = ComponentPropsWithoutRef<"div"> & {
    onClose: () => void;
    navState: string;
};

const SubmitBtn: FC<Tprops> = ({
    onClick,
    onClose,
    navState,
    className = "mt-5 sm:mt-4",
}) => {
    const { t } = useTranslation();
    return (
        <div
            className={`border-t border-gray-900/10 pt-3 grid grid-flow-row-dense grid-cols-2 gap-3 ${className}`}
        >
            <button
                type="button"
                className="w-full rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={(e) => {
                    e.preventDefault();
                    onClose();
                }}
            >
                {t("btn.cancel")}
            </button>
            <button
                name="intent"
                value="add"
                type="submit"
                className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset hover:bg-indigo-700"
                disabled={navState === "submitting" || navState === "loading"}
                onClick={onClick}
            >
                {navState === "submitting"
                    ? t("btn.submitting")
                    : t("btn.submit")}
            </button>
        </div>
    );
};

export default SubmitBtn;
