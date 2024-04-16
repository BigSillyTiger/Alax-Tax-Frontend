import type { FC } from "react";
import SubTableSwitch from "@/components/table/SubTableSwitch";
import { Torder } from "@/configs/schema/orderSchema";
import { orderSubTable } from "@/pageComponents/orderSubTables";

type Tprops = {
    data: Torder;
};

const SubTable: FC<Tprops> = ({ data }) => {
    return <SubTableSwitch items={orderSubTable(data)} />;
};

export default SubTable;
