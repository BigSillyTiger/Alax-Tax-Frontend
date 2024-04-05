import { memo } from "react";
import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { useTranslation } from "react-i18next";
import { plusAB } from "@/lib/calculations";
import { Tbonus } from "@/configs/schema/payslipSchema";

type Tprops = {
    data: Partial<Tbonus>[];
    unit: "AUD" | "$";
    bd?: "b" | "d";
};

const tw = createTw({});

const BDFooter: FC<Tprops> = memo(({ data, unit: u, bd = "b" }) => {
    const { t } = useTranslation();

    const total = data.reduce((accumulator, currentItem) => {
        return plusAB(currentItem.amount ? currentItem.amount : 0, accumulator);
    }, 0);

    return (
        <View
            style={tw("flex flex-row w-[523pt] justify-end mt-3")}
            wrap={false}
        >
            <View
                style={tw("flex flex-col bg-teal-50 w-[220pt] px-2 leading-6")}
            >
                <View style={tw("flex flex-row h-7 justify-between")}>
                    <Text style={tw("text-base my-auto")}>
                        {t("label.total")}:
                    </Text>
                    <Text style={tw("text-base my-auto text-right")}>
                        {bd === "b" ? "" : "- "}
                        {u + " "}
                        {total}
                    </Text>
                </View>
            </View>
        </View>
    );
});

export default BDFooter;
