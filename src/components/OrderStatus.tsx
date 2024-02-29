import { FC } from "react";
import i18n from "@/utils/i18n";

const setOrderStatusColor = (value: TorderStatus) => {
    switch (value) {
        case i18n.t("label.pending"):
            return "bg-yellow-200 text-yellow-700 ring-yellow-700";
        case i18n.t("label.processing"):
            return "bg-cyan-200 text-cyan-700 ring-cyan-700";
        case i18n.t("label.closed"):
            return "bg-red-200 text-red-700 ring-red-700";
        case i18n.t("label.completed"):
            return "bg-green-200 text-green-700 ring-green-700";
    }
};

const OrderStatus: FC<{ value: TorderStatus }> = ({ value }) => {
    return (
        <span
            className={`rounded-md ring-1 ring-inset font-bold py-1 px-2 ${setOrderStatusColor(
                value
            )}
                            `}
        >
            {value}
        </span>
    );
};

export default OrderStatus;
