import React from "react";
import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

type Tprops = {
    data: {
        title: string;
        qty: number;
        gst: number;
        netto: number;
        total: number;
        description?: string;
    }[];
};

const tw = createTw({});

const TableRows: FC<Tprops> = ({ data }) => {
    if (data.length <= 0) return null;
    return data.map((item, i) => {
        return (
            <View
                style={tw(
                    `flex flex-row gap-x-1 w-[523pt]justify-center py-1 ${
                        i % 2 ? "bg-orange-100" : "bg-slate-50"
                    }`
                )}
            >
                <View style={tw("text-base w-[280pt] my-auto pl-5")}>
                    <Text style={tw("text-base w-[280pt] my-auto pl-5")}>
                        {item.title}
                    </Text>
                    {item.description && (
                        <Text
                            style={tw(
                                "text-base w-[280pt] my-auto pl-5 text-gray-500"
                            )}
                        >
                            {item.description}
                        </Text>
                    )}
                </View>
                <Text style={tw("text-base w-[50pt] text-center my-auto")}>
                    {item.qty}
                </Text>
                <Text style={tw("text-base w-[60pt] text-center my-auto")}>
                    {item.gst}
                </Text>
                <Text style={tw("text-base w-[60pt] text-center my-auto")}>
                    {item.netto}
                </Text>
                <Text style={tw("text-base w-[73pt] text-center my-auto")}>
                    {item.total}
                </Text>
            </View>
        );
    });
};

export default TableRows;
