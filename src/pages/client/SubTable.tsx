import type { FC } from "react";
import SubTableSwitch from "@/components/table/SubTableSwitch";
import { TorderWithClient } from "@/configs/schema/orderSchema";
import { orderSubTable } from "@/pageComponents/orderSubTables";
import useOrderServiceColumnsDef from "@/configs/columnDefs/defOrderService";
import useOrderPaymentColumnsDef from "@/configs/columnDefs/defPayments";

type Tprops = {
    data: TorderWithClient;
};

const SubTable: FC<Tprops> = ({ data }) => {
    const orderServiceColumns = useOrderServiceColumnsDef();
    const orderPaymentsColumns = useOrderPaymentColumnsDef();

    return (
        <SubTableSwitch
            items={orderSubTable(
                data,
                orderServiceColumns,
                orderPaymentsColumns
            )}
        />
    );
};

export default SubTable;
