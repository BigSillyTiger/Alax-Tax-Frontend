import React from "react";
import type { FC } from "react";
import { Text, View, Image } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { Tcompany } from "@/configs/schema/manageSchema";

type Tprops = {
    company: Tcompany;
    invoiceID: number;
    issueDate: string;
};

const tw = createTw({});

const imgSrc =
    "https://pbs.twimg.com/media/F-T6w9SW8AEiITX?format=jpg&name=small";

const Title: FC<Tprops> = ({ company, invoiceID, issueDate }) => {
    const { t } = useTranslation();

    return (
        <View
            style={tw(
                "flex flex-row gap-2 w-[523pt] border-b-4 border-orange-200 pb-3"
            )}
            fixed
        >
            <Image src={imgSrc} style={tw("rounded-lg h-20 w-20")} />
            <View style={tw("flex justify-center")}>
                <Text style={tw("font-bold text-base")}>{company.name}</Text>
                <Text style={tw("text-xs text-gray-600")}>
                    {company.address}
                </Text>
                <Text style={tw("text-xs text-gray-600")}>{company.phone}</Text>
            </View>
            <View style={tw("ml-auto flex justify-center items-end")}>
                <Text style={tw("font-bold text-base")}>
                    {t("label.invoice")}
                    {" " + "#" + invoiceID}
                </Text>
                <Text style={tw("text-xs text-gray-600")}>
                    {t("label.issuedDate")}:{" "}
                    {format(Date.parse(issueDate), "MM-dd-yyyy")}
                </Text>
            </View>
        </View>
    );
};

export default Title;
