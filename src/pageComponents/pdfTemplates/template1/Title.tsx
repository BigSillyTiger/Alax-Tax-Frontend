import type { FC } from "react";
import { Text, View, Image } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { useTranslation } from "react-i18next";
import { Tcompany } from "@/configs/schema/settingSchema";
import { dateFormat } from "@/lib/time";

type Tprops = {
    type?: "I" | "Q";
    company: Tcompany;
    orderID: string; // quotation or invoice ID
    issueDate: string;
    logo: string;
};

const tw = createTw({});

const Title: FC<Tprops> = ({
    type = "I",
    company,
    orderID,
    issueDate,
    logo,
}) => {
    const { t } = useTranslation();

    return (
        <View
            style={tw(
                "flex flex-row gap-2 w-[523pt] border-b-4 border-orange-200 pb-3"
            )}
            fixed
        >
            <Image src={logo} style={tw("rounded-lg h-20 w-20")} />
            {/* company */}
            <View style={tw("flex justify-center")}>
                <Text style={tw("font-bold text-base")}>{company.name}</Text>
                <Text style={tw("text-xs text-gray-600")}>
                    <Text style={tw("text-zinc-900")}>
                        {type === "I"
                            ? t("label.invoice")
                            : t("label.quotation")}
                        :{" "}
                    </Text>
                    {" " + "#" + orderID}
                </Text>
                <Text style={tw("text-xs text-gray-600")}>
                    <Text style={tw("text-zinc-900")}>
                        {t("label.issuedDate")}:{" "}
                    </Text>
                    {dateFormat(issueDate, "au")}
                </Text>
            </View>
            {/* invoice */}
            <View style={tw("ml-auto flex justify-center items-end")}>
                <Text style={tw("text-xs text-gray-600")}>
                    <Text style={tw("text-zinc-900")}>{t("label.bld")}: </Text>
                    {company.bld}
                </Text>
                <Text style={tw("text-xs text-gray-600")}>
                    <Text style={tw("text-zinc-900")}>{t("label.abn")}: </Text>
                    {company.abn}
                </Text>
                <Text style={tw("text-xs text-gray-600")}>
                    <Text style={tw("text-zinc-900")}>{t("label.bsb")}: </Text>
                    {company.bsb}
                </Text>
                <Text style={tw("text-xs text-gray-600")}>
                    <Text style={tw("text-zinc-900")}>{t("label.acc")}: </Text>
                    {company.acc}
                </Text>
            </View>
        </View>
    );
};

export default Title;
