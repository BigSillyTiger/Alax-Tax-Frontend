import { Btext } from "@/components/Btext";
import Fieldset from "@/components/Fieldset";
import { Torder } from "@/configs/schema/orderSchema";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

type Tprops = {
    info: Torder;
    sFieldset?: string;
};

const OrderInfoFs: FC<Tprops> = ({ info, sFieldset = "" }) => {
    const { t } = useTranslation();
    return (
        <Fieldset
            title={t("label.orderInfo")}
            sFieldset={`m-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 my-2 mx-1 text-sm p-4 ${sFieldset}`}
        >
            <div className="col-span-full break-words text-lg">
                <p>
                    <Btext>{t("label.idOrder")}:&nbsp;</Btext>
                    {info.oid}
                </p>
            </div>
            <div className="col-span-full text-wrap  text-lg">
                <p>
                    <Btext>{t("label.workAddr")}:&nbsp;</Btext>
                    {info.address +
                        ", " +
                        info.suburb +
                        ", " +
                        info.city +
                        ", " +
                        info.state +
                        ", " +
                        info.country +
                        ", " +
                        info.postcode}
                </p>
            </div>
        </Fieldset>
    );
};

export default OrderInfoFs;
