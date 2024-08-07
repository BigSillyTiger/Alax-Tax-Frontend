import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { useTranslation } from "react-i18next";

type Tprops = {
    bgC: string;
};

const tw = createTw({});

const PayHeader: FC<Tprops> = ({ bgC }) => {
    const { t } = useTranslation();

    return (
        <View style={tw(`flex flex-row gap-x-1 w-[523pt] ${bgC}`)}>
            <Text style={tw("text-base w-[260pt] text-center mt-2")}>
                {t("label.paidAmount")}
            </Text>
            <Text style={tw("text-base w-[263pt] text-center mt-2")}>
                {t("label.paidDate")}
            </Text>
        </View>
    );
};

export default PayHeader;
