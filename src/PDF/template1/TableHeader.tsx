import React from "react";
import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({});

const TableHeader: FC = () => {
    return (
        <View
            style={tw(
                "flex flex-row gap-x-1 w-[523pt] bg-orange-200 justify-center h-10"
            )}
        >
            <Text style={tw("text-base w-[280pt] my-auto pl-5")}>Services</Text>
            <Text style={tw("text-base w-[50pt] text-center my-auto")}>
                QTY
            </Text>
            <Text style={tw("text-base w-[60pt] text-center my-auto")}>
                GST
            </Text>
            <Text style={tw("text-base w-[60pt] text-center my-auto")}>
                Netto
            </Text>
            <Text style={tw("text-base w-[73pt] text-center my-auto")}>
                Total
            </Text>
        </View>
    );
};

export default TableHeader;
