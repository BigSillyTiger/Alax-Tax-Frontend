import { Btext } from "@/components/Btext";
import Fieldset from "@/components/Fieldset";
import { TorderWithClient } from "@/configs/schema/orderSchema";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

type Tprops = {
    info: TorderWithClient;
    sFieldset?: string;
};

const OrderInfoFs: FC<Tprops> = ({ info, sFieldset = "" }) => {
    const { t } = useTranslation();
    return (
        <Fieldset
            title={t("label.orderInfo")}
            sFieldset={`grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6 ${sFieldset}`}
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
                    {info.client_info.address +
                        ", " +
                        info.client_info.suburb +
                        ", " +
                        info.client_info.city +
                        ", " +
                        info.client_info.state +
                        ", " +
                        info.client_info.country +
                        ", " +
                        info.client_info.postcode}
                </p>
            </div>
        </Fieldset>
    );
};

export default OrderInfoFs;
