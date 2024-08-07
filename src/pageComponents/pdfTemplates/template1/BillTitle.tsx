import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { Tclient } from "@/configs/schema/clientSchema";
import { useTranslation } from "react-i18next";
import { Tcompany } from "@/configs/schema/settingSchema";

type Tprops = {
    company: Tcompany;
    client: Tclient;
    borderC: string;
    textC: string;
};

const tw = createTw({});

const BillTitle: FC<Tprops> = ({ borderC, textC, company, client }) => {
    const { t } = useTranslation();
    return (
        <View
            style={tw(
                `flex flex-row flex-wrap gap-x-4 w-[523pt] border-b-4 py-3 ${borderC}`
            )}
        >
            <View style={tw("flex-1")} wrap={false}>
                <Text style={tw(`text-sm ${textC}`)}>{t("label.from")}</Text>
                <Text style={tw("text-lg leading-6")}>{company.name}</Text>
                <Text style={tw(`text-base leading-5 ${textC}`)}>
                    {t("label.tel")}::{" "}
                    <Text style={tw("text-zinc-700")}>{company.phone}</Text>
                </Text>
                <Text style={tw(`text-base leading-5 ${textC}`)}>
                    {t("label.email1")}:{" "}
                    <Text style={tw("text-zinc-700")}>{company.email}</Text>
                </Text>
            </View>
            <View style={tw("flex-1 items-end")}>
                <Text style={tw(`text-sm ${textC}`)}>{t("label.billTo")}</Text>
                <Text style={tw("text-lg leading-6")}>
                    {client.first_name + " " + client.last_name}
                </Text>
                <Text style={tw(`text-base leading-5 ${textC}`)}>
                    {t("label.tel")}:
                    <Text style={tw("text-zinc-700")}>{client.phone}</Text>
                </Text>
                <Text style={tw(`text-base leading-5 ${textC}`)}>
                    {t("label.email1")}:{" "}
                    <Text style={tw("text-zinc-700")}>{client.email}</Text>
                </Text>
            </View>
        </View>
    );
};

export default BillTitle;
