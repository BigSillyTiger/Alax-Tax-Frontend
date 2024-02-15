import { memo } from "react";
import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { TorderDesc } from "@/configs/schema/orderSchema";
import { plusAB } from "@/utils/calculations";

type Tprops = {
    data: TorderDesc[];
    unit: "AUD" | "$";
};

const tw = createTw({});

const TableRows: FC<Tprops> = memo(({ data, unit: u }) => {
    if (data.length <= 0) return null;

    return data.map((item, i) => {
        return (
            <View
                style={tw(
                    `flex flex-row gap-x-1 w-[523pt] justify-center py-1 ${
                        i % 2 ? "bg-orange-100" : "bg-slate-50"
                    }`
                )}
            >
                <View style={tw("text-sm w-[270pt] my-auto pl-5")}>
                    <Text style={tw("text-sm w-[270pt] my-auto pl-3")}>
                        {item.title}
                    </Text>
                    {item.description && (
                        <Text
                            style={tw(
                                "text-sm w-[280pt] my-auto pl-5 text-gray-500"
                            )}
                        >
                            {item.description}
                        </Text>
                    )}
                </View>
                <Text style={tw("text-sm w-[40pt] text-center my-auto")}>
                    {item.qty}
                </Text>
                <Text style={tw("text-sm w-[70pt] text-center my-auto")}>
                    {u + " "}
                    {item.gst}
                </Text>
                <Text style={tw("text-sm w-[70pt] text-center my-auto")}>
                    {u + " "}
                    {item.netto}
                </Text>
                <Text style={tw("text-sm w-[73pt] text-center my-auto")}>
                    {u + " "}
                    {plusAB(item.netto, item.gst)}
                </Text>
            </View>
        );
    });
});

export default TableRows;
