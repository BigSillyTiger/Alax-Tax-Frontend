import type { FC } from "react";
import ComboBox from "@/components/ComboBox";
import { useTranslation } from "react-i18next";
import { atOrderWithClient, atOrderService, atSUData } from "@/configs/atoms";
import { useAtom } from "jotai";
import { Tservice } from "@/configs/schema/settingSchema";
import { calGst } from "@/lib/calculations";
import { TorderForm } from "@/configs/schema/orderSchema";
import { UseFieldArrayAppend } from "react-hook-form";
import { Nbtn } from "@/components/btns";
import { ORDER_STATUS } from "@/configs/utils/setting";

type Tprops = {
    append: UseFieldArrayAppend<TorderForm, "order_services">;
};

const AppendNewService: FC<Tprops> = ({ append }) => {
    const { t } = useTranslation();
    const [uniData] = useAtom(atSUData);
    const [serviceDesc, setServiceDesc] = useAtom(atOrderService);
    const [clientOrder] = useAtom(atOrderWithClient);

    const setDefaultService = (value: string) => {
        let service = uniData?.services
            ? uniData.services.find((item: Tservice) => item.service === value)
            : uniData.services[0];

        if (service === undefined) {
            service = uniData.services[0];
        }

        setServiceDesc({
            osid: "",
            ranking: 0,
            fk_cid: clientOrder.fk_cid,
            fk_oid: clientOrder.oid,
            status: ORDER_STATUS[0], // pending
            title: service.service as string,
            taxable: true,
            note: "",
            qty: 1,
            unit: service.unit as string,
            unit_price: service.unit_price as number,
            gst: calGst(Number(service.unit_price)),
            net: service.unit_price as number,
            created_date: "",
            expiry_date: "none",
            service_type: service.service_type,
            product_name: service.product_name,
        });
    };

    return (
        <div className="col-span-full grid grid-cols-6 my-2 gap-x-3">
            <div className="col-span-4">
                <label htmlFor="sTitle" className="text-indigo-500 text-bold">
                    {t("modal.tips.pickService")}:
                </label>
                <ComboBox
                    setAdvanced={setDefaultService}
                    optionsList={uniData?.services}
                    opKey={"service"}
                    directUp={true}
                />
            </div>
            <div className="col-span-2 mt-6">
                <Nbtn
                    type="button"
                    className="w-full"
                    onClick={() => append(serviceDesc)}
                >
                    {t("btn.append")}
                </Nbtn>
            </div>
        </div>
    );
};

export default AppendNewService;
