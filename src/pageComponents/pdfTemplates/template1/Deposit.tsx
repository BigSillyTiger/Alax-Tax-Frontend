import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { useTranslation } from "react-i18next";
import { formMoney } from "@/lib/literals";

type Tprops = {
    deposit: number;
    bgC: string;
    textC: string;
};

const tw = createTw({});

const Deposit: FC<Tprops> = ({ deposit, bgC, textC }) => {
    const { t } = useTranslation();

    return (
        <View
            style={tw(`flex flex-col w-[523pt] justify-start p-2 mt-5 ${bgC}`)}
            wrap={false}
        >
            <Text style={tw("text-xl my-auto px-2")}>
                {t("label.deposit")}:
            </Text>
            <Text style={tw("text-lg my-auto px-4")}>
                {t("tips.depositTips1")}
                <Text style={tw(`text-lg ${textC}`)}>{formMoney(deposit)}</Text>
                <Text style={tw("text-lg my-auto")}>
                    {t("tips.depositTips2")}
                </Text>
            </Text>
        </View>
    );
};

export default Deposit;
