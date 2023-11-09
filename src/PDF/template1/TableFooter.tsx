import React from "react";
import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({});

const TableFooter: FC = () => {
    return (
        <View
            style={tw("flex flex-row w-[523pt] justify-center justify-end")}
            wrap={false}
        >
            <View style={tw("flex flex-col bg-orange-200 h-50 w-[220pt] px-2")}>
                <View
                    style={tw(
                        "flex flex-row h-10 justify-between justify-between"
                    )}
                >
                    <Text style={tw("text-base w-[280pt] my-auto")}>Gst:</Text>
                    <Text style={tw("text-base w-[280pt] my-auto text-right")}>
                        123
                    </Text>
                </View>
                <View style={tw("flex flex-row h-10 justify-between")}>
                    <Text style={tw("text-base w-[280pt] my-auto")}>
                        Netto:
                    </Text>
                    <Text style={tw("text-base w-[280pt] my-auto text-right")}>
                        123
                    </Text>
                </View>
                <View style={tw("flex flex-row h-10 justify-between")}>
                    <Text style={tw("text-base w-[280pt] my-auto")}>
                        Total:
                    </Text>
                    <Text style={tw("text-base w-[280pt] my-auto text-right")}>
                        123
                    </Text>
                </View>
                <View
                    style={tw(
                        "flex flex-row h-15 justify-between border-t-2 border-black-200 border-dotted pt-4"
                    )}
                >
                    <Text style={tw("text-xl w-[280pt] my-auto")}>
                        Balance Due:
                    </Text>
                    <Text style={tw("text-xl w-[280pt] my-auto text-right")}>
                        123
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default TableFooter;
