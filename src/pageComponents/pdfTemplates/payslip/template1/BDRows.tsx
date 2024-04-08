import { memo } from "react";
import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

import { Tbonus } from "@/configs/schema/payslipSchema";

type Tprops = {
    data: Partial<Tbonus>[];
    unit: "AUD" | "$";
    // b: bonus, d: deduction
    bd?: "b" | "d";
};

const tw = createTw({});

const BDRows: FC<Tprops> = memo(({ data, unit: u, bd = "b" }) => {
    if (data.length <= 0) return null;

    return data.map((item, i) => {
        return (
            <View
                style={tw(
                    `flex flex-row gap-x-1 w-[523pt] justify-center py-1 ${
                        i % 2
                            ? `${bd === "b" ? "bg-teal-100" : "bg-red-100"}`
                            : "bg-slate-50"
                    }`
                )}
            >
                {/* amount */}
                <View style={tw("text-sm w-[200pt] my-auto pl-5")}>
                    <Text style={tw("text-sm w-[150pt] my-auto pl-3")}>
                        {bd === "b" ? "" : "- "}
                        {u + " "}
                        {item.amount ? item.amount : 0}
                    </Text>
                </View>
                {/* note */}
                <Text style={tw("text-sm w-[323pt] text-center my-auto")}>
                    {item.note}
                </Text>
            </View>
        );
    });
});

export default BDRows;
