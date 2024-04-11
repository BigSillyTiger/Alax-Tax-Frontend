import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { useTranslation } from "react-i18next";

const tw = createTw({});

const DHeader: FC = () => {
    const { t } = useTranslation();

    return (
        <View style={tw(`flex flex-row gap-x-1 w-[523pt] bg-red-200`)}>
            <Text style={tw("text-base w-[120pt] pl-5 mt-2")}>
                {t("label.wlid")}
            </Text>
            <Text style={tw("text-base w-[283pt] text-center mt-2")}>
                {t("label.note")}
            </Text>
            <Text style={tw("text-base w-[120pt] pl-5 mt-2")}>
                {t("label.amount")}
            </Text>
        </View>
    );
};

export default DHeader;
