import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { useTranslation } from "react-i18next";

const tw = createTw({});

const TableHeader: FC = () => {
    const { t } = useTranslation();

    return (
        <View style={tw("flex flex-row gap-x-1 w-[523pt] bg-orange-200")}>
            <Text style={tw("text-base w-[260pt] pl-3 mt-2")}>
                {t("label.services")}
            </Text>
            <Text style={tw("left-[5pt] text-base w-[40pt] text-center mt-2")}>
                {t("label.qty")}
            </Text>
            <Text style={tw("text-base w-[70pt] text-center mt-2")}>
                {t("label.gst")}
            </Text>
            <Text style={tw("text-base w-[70pt] text-center mt-2")}>
                {t("label.netto")}
            </Text>
            <Text style={tw("text-base w-[73pt] text-center mt-2")}>
                {t("label.totalLine")}
            </Text>
        </View>
    );
};

export default TableHeader;
