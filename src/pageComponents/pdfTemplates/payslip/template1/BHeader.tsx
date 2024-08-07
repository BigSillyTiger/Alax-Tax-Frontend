import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { useTranslation } from "react-i18next";

const tw = createTw({});
const BDHeader: FC = () => {
    const { t } = useTranslation();

    return (
        <View style={tw("flex flex-row gap-x-1 w-[523pt] bg-teal-200")}>
            <Text style={tw("text-base w-[200pt] pl-5 mt-2")}>
                {t("label.amount")}
            </Text>
            <Text style={tw("text-base w-[323pt] text-center mt-2")}>
                {t("label.note")}
            </Text>
        </View>
    );
};

export default BDHeader;
