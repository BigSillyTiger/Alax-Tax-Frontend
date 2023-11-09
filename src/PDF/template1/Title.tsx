import React from "react";
import type { FC } from "react";
import { Text, View, Image } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({});

const imgSrc =
    "https://pbs.twimg.com/media/F-T6w9SW8AEiITX?format=jpg&name=small";

const Title = () => {
    return (
        <View
            style={tw(
                "flex flex-row gap-2 w-[523pt] border-b-4 border-orange-200 pb-3"
            )}
            fixed
        >
            <Image src={imgSrc} style={tw("rounded-lg h-20 w-20")} />
            <View style={tw("flex justify-center")}>
                <Text style={tw("font-bold text-base")}>business name</Text>
                <Text style={tw("text-xs text-gray-600")}>
                    business address
                </Text>
                <Text style={tw("text-xs text-gray-600")}>business phone</Text>
            </View>
            <View style={tw("ml-auto flex justify-center items-end")}>
                <Text style={tw("font-bold text-base")}>Invoice # ***</Text>
                <Text style={tw("text-xs text-gray-600")}>
                    Invoice Issue Date: ***
                </Text>
                <Text style={tw("text-xs text-gray-600")}>
                    Invoice Due Date: *base
                </Text>
            </View>
        </View>
    );
};

export default Title;
