import { atOrder } from "@/configs/atoms";
import { TorderPayment } from "@/configs/schema/orderSchema";
import { plusAB } from "@/lib/calculations";
import { dateFormat } from "@/lib/time";
import { toastError } from "@/lib/toaster";
import { useAtom } from "jotai";
import { useState, type FC } from "react";
import { UseFieldArrayPrepend } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { dateMax, dateMin } from "@/configs/utils/date";
import { Nbtn } from "@/components/btns";

type Tpayment = {
    payments: TorderPayment[];
};

type Tprops = { prepend: UseFieldArrayPrepend<Tpayment>; totalPaid: number };

const PayOperation: FC<Tprops> = ({ prepend, totalPaid }) => {
    const { t } = useTranslation();
    const [clientOrder] = useAtom(atOrder);
    const [payment, setPayment] = useState<TorderPayment>({
        pid: "",
        fk_oid: "",
        paid: 0,
        paid_date: dateFormat(new Date()),
    });

    const handlePayment = () => {
        const inputCheck = payment.paid > 0 && payment.paid_date.length > 0;
        !inputCheck && toastError(t("toastF.invalidPayment"));
        const overPaidCheck =
            plusAB(totalPaid, payment.paid) <= clientOrder.total;
        !overPaidCheck && toastError(t("toastF.overPaid"));
        inputCheck && overPaidCheck && prepend(payment);
    };

    return (
        <fieldset className="col-span-full mt-4 pt-3 border-t-2 border-indigo-300 border-dashed">
            <div className="grid grid-cols-6 gap-x-3">
                <div className="col-span-2">
                    <label
                        htmlFor="payAmount"
                        className="text-indigo-500 text-bold"
                    >
                        {t("label.payAmount")}
                    </label>
                    <input
                        id="payAmount"
                        name="payAmount"
                        type="number"
                        min={0}
                        step="0.01"
                        defaultValue={0}
                        onChange={(e) => {
                            setPayment({
                                ...payment,
                                paid: e.target.valueAsNumber,
                            });
                        }}
                        className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    />
                </div>
                <div className="col-span-3">
                    <label
                        htmlFor="payDate"
                        className="text-indigo-500 text-bold"
                    >
                        {t("label.payDate")}
                    </label>
                    <input
                        id="payDate"
                        name="payDate"
                        type="date"
                        min={dateMin}
                        max={dateMax}
                        defaultValue={dateFormat(new Date())}
                        onChange={(e) => {
                            setPayment({
                                ...payment,
                                paid_date: e.target.value,
                            });
                        }}
                        className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    />
                </div>
                <div className="col-span-1 mt-6">
                    <Nbtn
                        type="button"
                        className="w-full"
                        onClick={handlePayment}
                    >
                        {t("btn.pay")}
                    </Nbtn>
                </div>
            </div>
        </fieldset>
    );
};

export default PayOperation;
