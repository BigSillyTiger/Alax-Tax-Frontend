import Card from "@/components/Card";
import { PTable } from "@/components/table";
import useOrderServiceColumnsDef from "@/configs/columnDefs/defOrderService";
import { TorderService } from "@/configs/schema/orderServiceSchema";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

type Tprops = {
    services: TorderService[];
};

const ClientServiceContent: FC<Tprops> = ({ services }) => {
    const { t } = useTranslation();
    const orderServiceColumns = useOrderServiceColumnsDef();

    return (
        <Card className="">
            {/* client orders table */}
            {services.length > 0 ? (
                <PTable
                    search={true}
                    data={services}
                    columns={orderServiceColumns}
                />
            ) : (
                <span>{t("tips.noContent")}</span>
            )}
        </Card>
    );
};

export default ClientServiceContent;
