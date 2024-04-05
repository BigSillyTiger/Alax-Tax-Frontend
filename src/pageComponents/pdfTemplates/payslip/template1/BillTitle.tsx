import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { useTranslation } from "react-i18next";
import { Tstaff } from "@/configs/schema/staffSchema";

type Tprops = {
    staff: Tstaff;
    startP: string;
    endP: string;
};

const tw = createTw({});

const PayTitle: FC<Tprops> = ({ staff, startP, endP }) => {
    const { t } = useTranslation();

    return (
        <View
            style={tw(
                "flex flex-col flex-wrap gap-x-4 w-[523pt] border-b-4 border-teal-200 py-3"
            )}
        >
            <View style={tw("flex flex-row justify-center")} wrap={false}>
                <Text style={tw("text-lg leading-7 text-teal-600")}>
                    {t("label.payTo")}
                </Text>
                <Text style={tw("text-lg leading-7 ml-2")}>
                    {staff.first_name + " " + staff.last_name}
                </Text>
            </View>
            <View style={tw("flex flex-row gap-x-4 w-[523pt]")}>
                {/* left */}
                <View style={tw("flex-1 items-start")}>
                    <Text style={tw("text-base leading-5 text-teal-700")}>
                        {t("label.tel")}:{" "}
                        <Text style={tw("text-zinc-700")}>{staff.phone}</Text>
                    </Text>
                    <Text style={tw("text-base leading-5 text-teal-700")}>
                        {t("label.email1")}:{" "}
                        <Text style={tw("text-zinc-700")}>{staff.email}</Text>
                    </Text>
                    <Text style={tw("text-base leading-5 text-teal-700")}>
                        {t("label.bsb")}:{" "}
                        <Text style={tw("text-zinc-700")}>{staff.bsb}</Text>
                    </Text>
                    <Text style={tw("text-base leading-5 text-teal-700")}>
                        {t("label.acc")}:{" "}
                        <Text style={tw("text-zinc-700")}>{staff.account}</Text>
                    </Text>
                </View>
                {/* right */}
                <View style={tw("flex-1 items-end")}>
                    <Text style={tw("text-base leading-5 text-teal-700")}>
                        {t("label.payPeriod")}:{" "}
                        <Text style={tw("text-zinc-700")}>
                            {startP} ~ {endP}
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default PayTitle;
