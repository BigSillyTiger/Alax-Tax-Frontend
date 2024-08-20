import Card from "@/components/Card";
import { PTable } from "@/components/table";
import useClientServiceColumnsDef from "@/configs/columnDefs/defClientService";
import { TclientService } from "@/configs/schema/serviceSchema";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

type Tprops = {
    services: TclientService[];
};

const ClientServiceContent: FC<Tprops> = ({ services }) => {
    const { t } = useTranslation();
    const clientServiceColumns = useClientServiceColumnsDef();

    return (
        <Card className="">
            {/* client orders table */}
            {services.length > 0 ? (
                <PTable
                    search={true}
                    data={services}
                    columns={clientServiceColumns}
                />
            ) : (
                <span>{t("tips.noContent")}</span>
            )}
        </Card>
    );
};

export default ClientServiceContent;
