import React from "react";
import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({});

const BillTitle: FC = () => {
    return (
        <View
            style={tw(
                "flex flex-row flex-wrap gap-x-4 w-[523pt] border-b-4 border-orange-200 py-3"
            )}
        >
            <View style={tw("flex-1")} wrap={false}>
                <Text style={tw("text-sm text-orange-600")}>From</Text>
                <Text style={tw("text-lg leading-6")}>Company name</Text>
                <Text style={tw("text-base leading-5 text-orange-700")}>
                    BLD: <Text style={tw("text-zinc-700")}>123 12312 412</Text>
                </Text>
                <Text style={tw("text-base leading-5 text-orange-700")}>
                    Tel: <Text style={tw("text-zinc-700")}>123 12312 412</Text>
                </Text>
                <Text style={tw("text-base leading-5 text-orange-700")}>
                    ABN: <Text style={tw("text-zinc-700")}>123 12312 412</Text>
                </Text>
                <Text style={tw("text-base leading-5 text-orange-700")}>
                    BSB: <Text style={tw("text-zinc-700")}>123 12312 412</Text>
                </Text>
                <Text style={tw("text-base leading-5 text-orange-700")}>
                    Bank Account:{" "}
                    <Text style={tw("text-zinc-700")}>123 12312 412</Text>
                </Text>
            </View>
            <View style={tw("flex-1 items-end")}>
                <Text style={tw("text-sm text-orange-600")}>Bill To</Text>
                <Text style={tw("text-lg leading-6")}>Company name</Text>
                <Text style={tw("text-base leading-5 text-orange-700")}>
                    building liscence
                    <Text style={tw("text-zinc-700")}>123 12312 412</Text>
                </Text>
                <Text style={tw("text-base leading-5 text-orange-700")}>
                    Tel: <Text style={tw("text-zinc-700")}>123 12312 412</Text>
                </Text>
                <Text style={tw("text-base leading-5 text-orange-700")}>
                    ABN: <Text style={tw("text-zinc-700")}>123 12312 412</Text>
                </Text>
                <Text style={tw("text-base leading-5 text-orange-700")}>
                    BSB: <Text style={tw("text-zinc-700")}>123 12312 412</Text>
                </Text>
                <Text style={tw("text-base leading-5 text-orange-700")}>
                    Bank Account:{" "}
                    <Text style={tw("text-zinc-700")}>123 12312 412</Text>
                </Text>
            </View>
        </View>
    );
};

export default BillTitle;
