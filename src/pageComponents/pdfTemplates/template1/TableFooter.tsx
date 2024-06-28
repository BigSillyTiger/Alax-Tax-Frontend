import { memo } from "react";
import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { TorderService } from "@/configs/schema/orderSchema";
import { useTranslation } from "react-i18next";
import { minusAB, plusAB, timesAB } from "@/lib/calculations";
import { convertToFloat, formMoney } from "@/lib/literals";
import Deposit from "./Deposit";

type Tprops = {
    type?: "I" | "Q"; // Invoice or Quotation
    paid?: number;
    unit?: "AUD" | "$";
    order: TorderService[];
    dRate: number;
    bgC: string;
    bgC2: string;
    borderC: string;
    textC: string;
};

const tw = createTw({});

const TableFooter: FC<Tprops> = memo(
    ({ type = "I", order, paid, dRate, bgC, bgC2, textC, borderC }) => {
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
        const deposit = timesAB(total, convertToFloat(dRate));

        return (
            <>
                <View
                    style={tw("flex flex-row w-[523pt] justify-end mt-3")}
                    wrap={false}
                >
                    <View
                        style={tw(
                            `flex flex-col w-[220pt] px-2 leading-6 ${bgC}`
                        )}
                    >
                        <View style={tw("flex flex-row h-7 justify-between")}>
                            <Text style={tw("text-sm my-auto")}>
                                {t("label.totalGst")}:
                            </Text>

                            <Text style={tw("text-sm my-auto text-right")}>
                                {formMoney(gst)}
                            </Text>
                        </View>
                        <View style={tw("flex flex-row h-7 justify-between")}>
                            <Text style={tw("text-sm my-auto")}>
                                {t("label.totalNetto")}:
                            </Text>
                            <Text style={tw("text-sm my-auto text-right")}>
                                {formMoney(netto)}
                            </Text>
                        </View>

                        {type === "I" ? (
                            <>
                                <View
                                    style={tw(
                                        "flex flex-row h-7 justify-between"
                                    )}
                                >
                                    <Text style={tw("text-sm my-auto")}>
                                        {t("label.total")}:
                                    </Text>
                                    <Text
                                        style={tw("text-sm my-auto text-right")}
                                    >
                                        {formMoney(total)}
                                    </Text>
                                </View>
                                <View
                                    style={tw(
                                        `flex flex-row h-9 border-t-2 border-dotted justify-between py-1 ${borderC}`
                                    )}
                                >
                                    <Text style={tw("text-sm my-auto")}>
                                        {t("label.totalPaid")}:
                                    </Text>
                                    <Text
                                        style={tw("text-sm my-auto text-right")}
                                    >
                                        {formMoney(paid ? paid : 0)}
                                    </Text>
                                </View>
                                <View
                                    style={tw(
                                        `flex flex-row justify-between border-t-2 border-dotted pt-4 ${borderC}`
                                    )}
                                >
                                    <Text style={tw("text-xl my-auto")}>
                                        {t("label.totalDue")}:
                                    </Text>
                                    <Text
                                        style={tw("text-xl my-auto text-right")}
                                    >
                                        {formMoney(minusAB(total, paid!))}
                                    </Text>
                                </View>
                            </>
                        ) : (
                            <View
                                style={tw(
                                    `flex flex-row justify-between border-t-2 border-dotted pt-4 ${borderC}`
                                )}
                            >
                                <Text style={tw("text-xl my-auto")}>
                                    {t("label.total")}:
                                </Text>
                                <Text style={tw("text-xl my-auto text-right")}>
                                    {formMoney(total)}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
                {type === "Q" && (
                    <Deposit bgC={bgC2} textC={textC} deposit={deposit} />
                )}
            </>
        );
    }
);

export default TableFooter;
