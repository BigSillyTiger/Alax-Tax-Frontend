import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { useTranslation } from "react-i18next";
import { Tcompany } from "@/configs/schema/settingSchema";
import { Tstaff } from "@/configs/schema/staffSchema";

type Tprops = {
    company: Tcompany;
    staff: Tstaff;
};

const tw = createTw({});

const BillTitle: FC<Tprops> = ({ company, staff }) => {
    const { t } = useTranslation();
    return (
        <View
            style={tw(
                "flex flex-row flex-wrap gap-x-4 w-[523pt] border-b-4 border-orange-200 py-3"
            )}
        >
            <View style={tw("flex-1")} wrap={false}>
                <Text style={tw("text-sm text-orange-600")}>
                    {t("label.from")}
                </Text>
                <Text style={tw("text-lg leading-6")}>{company.name}</Text>
                <Text style={tw("text-base leading-5 text-orange-700")}>
                    {t("label.tel")}::{" "}
                    <Text style={tw("text-zinc-700")}>{company.phone}</Text>
                </Text>
                <Text style={tw("text-base leading-5 text-orange-700")}>
                    {t("label.email1")}:{" "}
                    <Text style={tw("text-zinc-700")}>{company.email}</Text>
                </Text>
            </View>
            <View style={tw("flex-1 items-end")}>
                <Text style={tw("text-sm text-orange-600")}>
                    {t("label.billTo")}
                </Text>
                <Text style={tw("text-lg leading-6")}>
                    {staff.first_name + " " + staff.last_name}
                </Text>
                <Text style={tw("text-base leading-5 text-orange-700")}>
                    {t("label.tel")}:
                    <Text style={tw("text-zinc-700")}>{staff.phone}</Text>
                </Text>
                <Text style={tw("text-base leading-5 text-orange-700")}>
                    {t("label.email1")}:{" "}
                    <Text style={tw("text-zinc-700")}>{staff.email}</Text>
                </Text>
            </View>
        </View>
    );
};

export default BillTitle;
