import React from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

type Tprops = {
    onClick: () => void;
    onClose: () => void;
};

const ConfirmBtn: FC<Tprops> = ({ onClick, onClose }) => {
    const { t } = useTranslation();
    return (
        <div className="border-t border-gray-900/10 pt-4 mt-5 sm:mt-4 grid grid-flow-row-dense grid-cols-2 gap-3">
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
                onClick={onClick}
            >
                {t("btn.confirm")}
            </button>
        </div>
    );
};

export default ConfirmBtn;
