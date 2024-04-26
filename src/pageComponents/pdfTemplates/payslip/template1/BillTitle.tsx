import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { useTranslation } from "react-i18next";

type Tprops = {
    staffName: string;
    staffPhone: string;
    staffEmail: string;
    staffBSB: string;
    staffACC: string;
    startP: string;
    endP: string;
};

const tw = createTw({});

const BillTitle: FC<Tprops> = ({
    staffName,
    staffPhone,
    staffEmail,
    staffBSB,
    staffACC,
    startP,
    endP,
}) => {
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
                <Text style={tw("text-lg leading-7 ml-2")}>{staffName}</Text>
            </View>
            <View style={tw("flex flex-row gap-x-4 w-[523pt]")}>
                {/* left */}
                <View style={tw("flex-1 items-start")}>
                    <Text style={tw("text-base leading-5 text-teal-700")}>
                        {t("label.tel")}:{" "}
                        <Text style={tw("text-zinc-700")}>{staffPhone}</Text>
                    </Text>
                    <Text style={tw("text-base leading-5 text-teal-700")}>
                        {t("label.email1")}:{" "}
                        <Text style={tw("text-zinc-700")}>{staffEmail}</Text>
                    </Text>
                    <Text style={tw("text-base leading-5 text-teal-700")}>
                        {t("label.bsb")}:{" "}
                        <Text style={tw("text-zinc-700")}>{staffBSB}</Text>
                    </Text>
                    <Text style={tw("text-base leading-5 text-teal-700")}>
                        {t("label.acc")}:{" "}
                        <Text style={tw("text-zinc-700")}>{staffACC}</Text>
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
                    <Text style={tw("text-base leading-5 text-teal-700")}>
                        {t("label.payDate")}:{" "}
                        <Text style={tw("text-zinc-700")}>{"placeholder"}</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default BillTitle;
