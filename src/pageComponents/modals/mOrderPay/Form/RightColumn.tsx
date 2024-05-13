import { OrderDescCard } from "@/pageComponents/cards";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import PayOperation from "./PayOperation";
import { SubmitBtn } from "@/components/form";
import { useNavigation } from "react-router-dom";
import { atOrder } from "@/configs/atoms";
import { useAtom } from "jotai";
import { Tpayment } from "@/configs/schema/orderSchema";
import { UseFieldArrayPrepend, UseFormReturn } from "react-hook-form";
import Fieldset from "@/components/Fieldset";

type Tprops = {
    totalPaid: number;
    trigger: UseFormReturn<Tpayment>["trigger"];
    prepend: UseFieldArrayPrepend<Tpayment>;
    onClose: () => void;
};

const RightColumn: FC<Tprops> = ({ totalPaid, trigger, prepend, onClose }) => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [clientOrder] = useAtom(atOrder);

    return (
        <div className="col-span-1 lg:col-span-5 grid grid-cols-1">
            <Fieldset
                title={t("label.serviceList")}
                sFieldset={`col-span-full my-2 mx-1 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 lg:h-[60dvh] overflow-y-auto`}
            >
                <div className="col-span-full mr-4">
                    <OrderDescCard data={clientOrder.order_services} />
                </div>
            </Fieldset>

            {/* payment section */}
            <PayOperation prepend={prepend} totalPaid={totalPaid} />
            {/* submit btns */}
            <div className="col-span-full row-span-2">
                {/* btns */}
                <SubmitBtn
                    onClick={() => trigger()}
                    onClose={onClose}
                    navState={navigation.state}
                />
            </div>
        </div>
    );
};

export default RightColumn;
