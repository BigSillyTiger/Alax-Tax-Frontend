import type { FC } from "react";
import { plusAB } from "@/lib/calculations";
import { useCtPaymentStore } from "@/configs/zustore";
import { useTranslation } from "react-i18next";

const SummaryContent: FC = () => {
    const { t } = useTranslation();

    const currentYear = useCtPaymentStore((state) => state.currentYear);
    const paymentAll = useCtPaymentStore((state) => state.paymentAll);
    const orderAll = useCtPaymentStore((state) => state.orderAll);
    const unpaidAll = useCtPaymentStore((state) => state.unpaidAll);

    const paymentContent = paymentAll[currentYear]
        ? Object.values(paymentAll[currentYear])
        : [];
    const orderContent = orderAll[currentYear]
        ? Object.values(orderAll[currentYear])
        : [];
    const unpaidContent = unpaidAll[currentYear]
        ? Object.values(unpaidAll[currentYear])
        : [];
    const totalPayment = Object.values(paymentContent).reduce((acc, next) => {
        return plusAB(next, acc);
    }, 0);
    const totalOrder = Object.values(orderContent).reduce((acc, next) => {
        return plusAB(next, acc);
    }, 0);
    const totalUnpaid = Object.values(unpaidContent).reduce((acc, next) => {
        return plusAB(next, acc);
    }, 0);

    return (
        <div className="bg-gray-200 border-y-2 border-indigo-300 border-dashed h-[10dvh] flex flex-row justify-evenly w-full">
            <div className="border-r-2 border-dashed border-indigo-300 flex flex-col w-full justify-center items-center">
                <p className="font-bold text-xl text-teal-700">
                    ${totalPayment}
                </p>
                <p className="text-sm text-neutral-500">
                    {t("label.totalPaid")}
                </p>
            </div>
            <div className="border-r-2 border-dashed border-indigo-300 flex flex-col w-full justify-center items-center">
                <p className="font-bold text-xl text-red-700">${totalUnpaid}</p>
                <p className="text-sm text-neutral-500">
                    {t("label.totalUnpaid")}
                </p>
            </div>
            <div className="flex flex-col w-full justify-center items-center">
                <p className="font-bold text-xl text-amber-700">{totalOrder}</p>
                <p className="text-sm text-neutral-500">
                    {t("label.totalOrder")}
                </p>
            </div>
        </div>
    );
};

export default SummaryContent;
