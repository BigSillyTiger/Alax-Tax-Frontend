import type { FC } from "react";
import SubTableSwitch from "@/components/table/SubTableSwitch";
import { Torder } from "@/configs/schema/orderSchema";
import { orderSubTable } from "@/pageComponents/orderSubTables";
import useOrderDescColumnsDef from "@/configs/columnDefs/defOrderDesc";
import useOrderColumnsDef from "@/configs/columnDefs/defPayments";

type Tprops = {
    data: Torder;
};

const SubTable: FC<Tprops> = ({ data }) => {
    const orderDescColumns = useOrderDescColumnsDef();
    const orderPaymentsColumns = useOrderColumnsDef();
    return (
        <SubTableSwitch
            items={orderSubTable(data, orderDescColumns, orderPaymentsColumns)}
        />
    );
};

export default SubTable;
