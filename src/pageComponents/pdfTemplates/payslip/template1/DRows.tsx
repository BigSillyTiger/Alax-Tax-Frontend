import { memo } from "react";
import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { Tdeduction } from "@/configs/schema/workSchema";

type Tprops = {
    data: Partial<Tdeduction>[];
    unit: "AUD" | "$";
};

const tw = createTw({});

const DRows: FC<Tprops> = memo(({ data, unit: u }) => {
    if (data && data.length <= 0) return null;

    return data.map((item, i) => {
        return (
            <View
                style={tw(
                    `flex flex-row gap-x-1 w-[523pt] justify-center py-1 ${
                        i % 2 ? "bg-red-100" : "bg-slate-50"
                    }`
                )}
            >
                {/* wlid */}
                <Text style={tw("text-sm w-[120pt] text-center my-auto")}>
                    {item.fk_wlid}
                </Text>
                {/* note */}
                <Text style={tw("text-sm w-[283pt] text-center my-auto")}>
                    {item.note}
                </Text>
                {/* amount */}
                <View style={tw("text-sm w-[120pt] my-auto pl-5")}>
                    <Text style={tw("text-sm w-[150pt] my-auto pl-3")}>
                        {"- " + u + " "}
                        {item.amount ? item.amount : 0}
                    </Text>
                </View>
            </View>
        );
    });
});

export default DRows;
