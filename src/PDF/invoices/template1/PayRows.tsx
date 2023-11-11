import React, { memo } from "react";
import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { TorderPayment } from "@/configs/schema/orderSchema";
import { format } from "date-fns";
import { dateFormat } from "@/utils/utils";

type Tprops = {
    data: TorderPayment[];
    unit: "AUD" | "$";
};

const tw = createTw({});

const PayRows: FC<Tprops> = ({ data, unit: u }) => {
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
                <Text style={tw("text-sm w-[260pt] text-center my-auto")}>
                    {u + " "}
                    {item.paid}
                </Text>
                <Text style={tw("text-sm w-[263pt] text-center my-auto")}>
                    {dateFormat(item.paid_date)}
                </Text>
            </View>
        );
    });
};

export default memo(PayRows);
