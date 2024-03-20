import Fieldset from "@/components/form/fieldset";
import { Torder } from "@/configs/schema/orderSchema";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

type Tprops = {
    info: Torder;
    sFieldset?: string;
    sLegend?: string;
};

const OrderInfoFs: FC<Tprops> = ({ info, sFieldset = "", sLegend = "" }) => {
    const [t] = useTranslation();
    return (
        <Fieldset
            title={t("label.orderInfo")}
            sFieldset={`justify-evenly m-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 my-2 mx-1 text-sm p-4 ${sFieldset}`}
            sLegend={`text-indigo-500 text-bold text-lg ${sLegend}`}
        >
            <div className="col-span-full break-words">
                <p>
                    <b className="text-indigo-600">
                        {t("label.idOrder")}:&nbsp;
                    </b>
                    {info.oid}
                </p>
            </div>
            <div className="col-span-full break-words">
                <p>
                    <b className="text-indigo-600">
                        {t("label.workAddr")}:&nbsp;
                    </b>
                    {info.address},&nbsp;
                    {info.suburb}
                    ,&nbsp;
                    {info.city},&nbsp;
                    {info.state},&nbsp;
                    {info.country},&nbsp;
                    {info.postcode}
                </p>
            </div>
        </Fieldset>
    );
};

export default OrderInfoFs;
