import { memo } from "react";
import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { TorderService } from "@/configs/schema/orderSchema";
import { formMoney } from "@/lib/literals";

type Tprops = {
    data: TorderService[];
    unit?: "AUD" | "$";
    bgC: string;
};

const tw = createTw({});

const TableRows: FC<Tprops> = memo(({ data, bgC }) => {
    if (data.length <= 0) return null;

    return data.map((item, i) => {
        return (
            <View
                style={tw(
                    `flex flex-row gap-x-1 w-[523pt] justify-center py-1 ${
                        i % 2 ? bgC : "bg-slate-50"
                    }`
                )}
            >
                <View style={tw("text-sm w-[260pt] my-auto")}>
                    <Text style={tw("text-sm w-[250pt] my-auto pl-3")}>
                        {item.title}
                    </Text>
                    {item.description ? (
                        <Text
                            style={tw(
                                "left-[5pt] text-sm w-[250pt] my-auto pl-5 text-gray-500"
                            )}
                        >
                            {item.description}
                        </Text>
                    ) : null}
                </View>
                <Text style={tw("text-sm w-[40pt] text-center my-auto")}>
                    {item.qty}
                </Text>
                <Text style={tw("text-sm w-[70pt] text-center my-auto")}>
                    {item.unit}
                </Text>
                <Text style={tw("text-sm w-[70pt] text-center my-auto")}>
                    {formMoney(item.unit_price)}
                </Text>
                <Text style={tw("text-sm w-[73pt] text-center my-auto")}>
                    {formMoney(item.netto)}
                </Text>
            </View>
        );
    });
});

export default TableRows;
