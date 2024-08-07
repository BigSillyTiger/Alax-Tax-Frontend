import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { useTranslation } from "react-i18next";

const tw = createTw({});

const PayHeader: FC = () => {
    const { t } = useTranslation();

    return (
        <View style={tw("flex flex-row gap-x-1 w-[523pt] bg-teal-200")}>
            <Text style={tw("text-base w-[120pt] pl-5 mt-2")}>
                {t("label.wlid")}
            </Text>
            <Text style={tw("text-base w-[120pt] pl-5 mt-2")}>
                {t("label.workDate")}
            </Text>
            <Text style={tw("text-base w-[90pt] text-center mt-2")}>
                {t("label.units")}
            </Text>
            <Text style={tw("text-base w-[90pt] text-center mt-2")}>
                {t("label.rate")}
            </Text>
            <Text style={tw("text-base w-[103pt] text-center mt-2")}>
                {t("label.thisPay")}
            </Text>
        </View>
    );
};

export default PayHeader;
