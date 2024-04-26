import type { FC } from "react";
import { Text, View, Image } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { useTranslation } from "react-i18next";
import { dateFormat } from "@/lib/time";

type Tprops = {
    companyName: string;
    companyAddr: string;
    companyPhone: string;
    payslipID: string;
    issueDate: string;
    logo: string;
};

const tw = createTw({});

const Title: FC<Tprops> = ({
    companyName,
    companyAddr,
    companyPhone,
    payslipID,
    issueDate,
    logo,
}) => {
    const { t } = useTranslation();

    return (
        <View
            style={tw(
                "flex flex-row gap-2 w-[523pt] border-b-4 border-teal-200 pb-3"
            )}
            fixed
        >
            <Image src={logo} style={tw("rounded-lg h-20 w-20")} />
            {/* company */}
            <View style={tw("flex justify-center")}>
                <Text style={tw("font-bold text-base")}>{companyName}</Text>
                <Text style={tw("text-xs text-gray-600")}>
                    {t("label.address") + ":"}
                    {companyAddr}
                </Text>
                <Text style={tw("text-xs text-gray-600")}>
                    {t("label.tel") + ":"}
                    {companyPhone}
                </Text>
            </View>
            {/* invoice */}
            <View style={tw("ml-auto flex justify-center items-end")}>
                <Text style={tw("font-bold text-base")}>
                    {t("label.payslip")}
                    {" " + "#" + payslipID}
                </Text>
                <Text style={tw("text-xs text-gray-600")}>
                    {t("label.issuedDate")}: {dateFormat(issueDate, "au")}
                </Text>
            </View>
        </View>
    );
};

export default Title;
