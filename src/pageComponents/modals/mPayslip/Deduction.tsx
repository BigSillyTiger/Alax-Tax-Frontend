import type { FC } from "react";
import Card from "@/components/Card";
import { PTable } from "@/components/table";
import { usePayslipStore } from "@/configs/zustore";
import useStaffDeductColumnsDef from "@/configs/columnDefs/defStaffDeduct";

const Deduction: FC = () => {
    const deduction = usePayslipStore((state) => state.deduction);
    const staffDeductColumns = useStaffDeductColumnsDef();

    return (
        <>
            {deduction && deduction.length ? (
                <Card className="mt-2">
                    <PTable
                        search={false}
                        hFilter={false}
                        data={deduction}
                        columns={staffDeductColumns.map((column) => ({
                            ...column,
                            meta: {
                                ...column.meta,
                                filterVariant: "text", // Replace "text" with the appropriate value
                            },
                        }))}
                        cnSearch="my-3"
                        cnTable={`h-[30dvh]`}
                        cnHead="sticky z-10 bg-red-300"
                        cnTh="py-3"
                    />
                </Card>
            ) : null}
        </>
    );
};

export default Deduction;
