import Fieldset from "@/components/Fieldset";
import { ORDayPicker } from "@/pageComponents/DayPicker";
import type { ComponentPropsWithoutRef, FC } from "react";
import { useTranslation } from "react-i18next";
import OrderArrangeList from "./OrderArrangeList";
import { useScreenST } from "@/lib/hooks";
import { Separator } from "@/components/ui/separator";
//import { Separator } from "@/components/ui/separator";

type Tprops = ComponentPropsWithoutRef<"fieldset">;

const OrderArrangement: FC<Tprops> = ({ className }) => {
    const { t } = useTranslation();
    const size = useScreenST(1024); // lg:1024

    return (
        <Fieldset
            title={t("label.workArrangement")}
            sFieldset={`flex flex-col lg:flex-row gap-x-2 gap-y-2 lg:justify-center items-center px-2 overflow-y-auto lg:overflow-y-hidden overflow-x-hidden ${className}`}
        >
            <div className="">
                <ORDayPicker />
            </div>

            {size ? (
                <Separator
                    orientation="horizontal"
                    className="border-indigo-300"
                    decorative={true}
                />
            ) : (
                <Separator
                    orientation="vertical"
                    className="border-indigo-300"
                    decorative={true}
                />
            )}
            <div className="h-auto lg:h-full w-full m-1">
                <OrderArrangeList />
            </div>
        </Fieldset>
    );
};

export default OrderArrangement;
