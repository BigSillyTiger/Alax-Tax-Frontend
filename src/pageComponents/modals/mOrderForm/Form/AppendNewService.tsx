import type { FC } from "react";
import ComboBox from "@/components/ComboBox";
import { useTranslation } from "react-i18next";
import { atOrder, atOrderService, atSUData } from "@/configs/atoms";
import { useAtom } from "jotai";
import { Tservice } from "@/configs/schema/settingSchema";
import { calGst } from "@/lib/calculations";
import { TorderForm } from "@/configs/schema/orderSchema";
import { UseFieldArrayAppend } from "react-hook-form";
import { Nbtn } from "@/components/btns";

type Tprops = {
    append: UseFieldArrayAppend<TorderForm, "order_services">;
};

const AppendNewService: FC<Tprops> = ({ append }) => {
    const { t } = useTranslation();
    const [uniData] = useAtom(atSUData);
    const [serviceDesc, setServiceDesc] = useAtom(atOrderService);
    const [clientOrder] = useAtom(atOrder);

    const setDefaultService = (value: string) => {
        let service = uniData?.services
            ? uniData.services.find((item: Tservice) => item.service === value)
            : ({
                  service: value,
                  unit: "",
                  unit_price: 0,
              } as Partial<Tservice>);

        if (service === undefined) {
            service = {
                service: value,
                unit: "",
                unit_price: 0,
            } as Partial<Tservice>;
        }

        setServiceDesc({
            ranking: 0,
            fk_oid: clientOrder.oid,
            title: service.service as string,
            taxable: true,
            description: "",
            qty: 1,
            unit: service.unit as string,
            unit_price: service.unit_price as number,
            gst: calGst(Number(service.unit_price)),
            netto: service.unit_price as number,
        });
    };

    return (
        <div className="col-span-full grid grid-cols-6 mt-4 pt-2 gap-x-3 border-t-2 border-indigo-300 border-dashed">
            <div className="col-span-4 ">
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
