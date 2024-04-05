import { memo } from "react";
import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { convertWorkHour, timesAB } from "@/lib/calculations";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { calWorkTime } from "@/lib/time";

type Tprops = {
    data: TwlTableRow[];
    unit: "AUD" | "$";
};

const tw = createTw({});

const PayRows: FC<Tprops> = memo(({ data, unit: u }) => {
    if (data.length <= 0) return null;

    return data.map((item, i) => {
        return (
            <View
                style={tw(
                    `flex flex-row gap-x-1 w-[523pt] justify-center py-1 ${
                        i % 2 ? "bg-teal-100" : "bg-slate-50"
                    }`
                )}
            >
                {/* work date */}
                <View style={tw("text-sm w-[150pt] my-auto pl-5")}>
                    <Text style={tw("text-sm w-[150pt] my-auto pl-3")}>
                        {item.wl_date}
                    </Text>
                    {item.wl_note && (
                        <Text
                            style={tw(
                                "text-sm w-[150pt] my-auto pl-5 text-gray-500"
                            )}
                        >
                            {item.wl_note}
                        </Text>
                    )}
                </View>
                {/* work hours / units */}
                <Text style={tw("text-sm w-[110pt] text-center my-auto")}>
                    {convertWorkHour(
                        calWorkTime(item.s_time, item.e_time, item.b_hour)
                    )}
                </Text>
                {/* hour rate */}
                <Text style={tw("text-sm w-[110pt] text-center my-auto")}>
                    {item.hr}
                </Text>
                <Text style={tw("text-sm w-[133pt] text-center my-auto")}>
                    {u + " "}
                    {timesAB(
                        convertWorkHour(
                            calWorkTime(item.s_time, item.e_time, item.b_hour)
                        ),
                        item.hr
                    )}
                </Text>
            </View>
        );
    });
});

export default PayRows;
