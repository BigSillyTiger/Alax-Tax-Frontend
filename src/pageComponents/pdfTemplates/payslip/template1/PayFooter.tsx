import { memo } from "react";
import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { useTranslation } from "react-i18next";
import { convertWorkHour, plusAB, timesAB } from "@/lib/calculations";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { calWorkTime } from "@/lib/time";

type Tprops = {
    data: TwlTableRow[];
    unit: "AUD" | "$";
    rate: number;
};

const tw = createTw({});

const PayFooter: FC<Tprops> = memo(({ data, unit: u, rate }) => {
    const { t } = useTranslation();

    const total = data.reduce((accumulator, currentItem) => {
        const workTime = convertWorkHour(
            calWorkTime(
                currentItem.s_time,
                currentItem.e_time,
                currentItem.b_hour
            )
        );
        return plusAB(timesAB(workTime, rate), accumulator);
    }, 0);

    return (
        <View
            style={tw("flex flex-row w-[523pt] justify-end mt-3")}
            wrap={false}
        >
            {/* <View style={tw("flex flex-col w-[220pt] px-2 leading-6 my-auto")}>
                <Text style={tw("text-sm text-teal-600")}>
                    {t("label.paymentTo")}
                </Text>
                <Text style={tw("text-base leading-6")}>{company.name}</Text>
                <Text style={tw("text-base leading-6 text-teal-700")}>
                    {t("label.bld")}:{" "}
                    <Text style={tw("text-zinc-700")}>{company.bld}</Text>
                </Text>
                <Text style={tw("text-base leading-6 text-teal-700")}>
                    {t("label.abn")}:{" "}
                    <Text style={tw("text-zinc-700")}>{company.abn}</Text>
                </Text>
                <Text style={tw("text-base leading-6 text-teal-700")}>
                    {t("label.bsb")}:{" "}
                    <Text style={tw("text-zinc-700")}>{company.bsb}</Text>
                </Text>
                <Text style={tw("text-base leading-6 text-teal-700")}>
                    {t("label.acc")}:{" "}
                    <Text style={tw("text-zinc-700")}>{company.acc}</Text>
                </Text>
            </View> */}
            <View
                style={tw("flex flex-col bg-teal-100 w-[220pt] px-2 leading-6")}
            >
                <View style={tw("flex flex-row h-7 justify-between")}>
                    <Text style={tw("text-base my-auto")}>
                        {t("label.total")}:
                    </Text>
                    <Text style={tw("text-base my-auto text-right")}>
                        {u + " "}
                        {total}
                    </Text>
                </View>
            </View>
        </View>
    );
});

export default PayFooter;
