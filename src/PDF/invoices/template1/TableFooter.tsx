import { memo } from "react";
import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { TorderDesc } from "@/configs/schema/orderSchema";
import { useTranslation } from "react-i18next";
import { minusAB, plusAB } from "@/utils/calculations";
import { Tcompany } from "@/configs/schema/manageSchema";

type Tprops = {
    company: Tcompany;
    order: TorderDesc[];
    paid: number;
    unit: "AUD" | "$";
};

const tw = createTw({});

const TableFooter: FC<Tprops> = memo(({ company, order, paid, unit: u }) => {
    const { t } = useTranslation();

    const gst = order.reduce(
        (acc, item) => plusAB(acc as number, item.gst as number),
        0
    );
    const netto = order.reduce(
        (acc, item) => plusAB(acc as number, item.netto as number),
        0
    );
    const total = plusAB(gst, netto);

    return (
        <View
            style={tw("flex flex-row w-[523pt] justify-center mt-3")}
            wrap={false}
        >
            <View style={tw("flex flex-col w-[220pt] px-2 leading-6 my-auto")}>
                <Text style={tw("text-sm text-orange-600")}>
                    {t("label.paymentTo")}
                </Text>
                <Text style={tw("text-base leading-6")}>{company.name}</Text>
                <Text style={tw("text-base leading-6 text-orange-700")}>
                    {t("label.bld")}:{" "}
                    <Text style={tw("text-zinc-700")}>{company.bld}</Text>
                </Text>
                <Text style={tw("text-base leading-6 text-orange-700")}>
                    {t("label.abn")}:{" "}
                    <Text style={tw("text-zinc-700")}>{company.abn}</Text>
                </Text>
                <Text style={tw("text-base leading-6 text-orange-700")}>
                    {t("label.bsb")}:{" "}
                    <Text style={tw("text-zinc-700")}>{company.bsb}</Text>
                </Text>
                <Text style={tw("text-base leading-6 text-orange-700")}>
                    {t("label.acc")}:{" "}
                    <Text style={tw("text-zinc-700")}>{company.acc}</Text>
                </Text>
            </View>
            <View
                style={tw(
                    "flex flex-col bg-orange-50 w-[220pt] px-2 leading-6"
                )}
            >
                <View style={tw("flex flex-row h-7 justify-between")}>
                    <Text style={tw("text-sm my-auto")}>
                        {t("label.totalGst")}:
                    </Text>

                    <Text style={tw("text-sm my-auto text-right")}>
                        {u + " "}
                        {gst}
                    </Text>
                </View>
                <View style={tw("flex flex-row h-7 justify-between")}>
                    <Text style={tw("text-sm my-auto")}>
                        {t("label.totalNetto")}:
                    </Text>
                    <Text style={tw("text-sm my-auto text-right")}>
                        {u + " "}
                        {netto}
                    </Text>
                </View>
                <View style={tw("flex flex-row h-7 justify-between")}>
                    <Text style={tw("text-sm my-auto")}>
                        {t("label.total")}:
                    </Text>
                    <Text style={tw("text-sm my-auto text-right")}>
                        {u + " "}
                        {total}
                    </Text>
                </View>
                <View
                    style={tw(
                        "flex flex-row h-9 border-t-2 border-dotted border-orange-200 justify-between py-1"
                    )}
                >
                    <Text style={tw("text-sm my-auto")}>
                        {t("label.totalPaid")}:
                    </Text>
                    <Text style={tw("text-sm my-auto text-right")}>
                        {u + " "}
                        {paid}
                    </Text>
                </View>
                <View
                    style={tw(
                        "flex flex-row justify-between border-t-2 border-orange-200 border-dotted pt-4"
                    )}
                >
                    <Text style={tw("text-xl my-auto")}>
                        {t("label.totalDue")}:
                    </Text>
                    <Text style={tw("text-xl my-auto text-right")}>
                        {u + " "}
                        {minusAB(total, paid)}
                    </Text>
                </View>
            </View>
        </View>
    );
});

export default TableFooter;
