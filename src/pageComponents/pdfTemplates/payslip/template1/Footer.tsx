import { memo } from "react";
import type { FC } from "react";
import { Text, View } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { useTranslation } from "react-i18next";
import { convertWorkHour, minusAB, plusAB, timesAB } from "@/lib/calculations";
import { calWorkTime } from "@/lib/time";
import { atStaff } from "@/configs/atoms";
import { useAtom } from "jotai";
import { Tdeduction, TwlTableRow } from "@/configs/schema/workSchema";
import { Tbonus } from "@/configs/schema/payslipSchema";

type Tprops = {
    unit?: "AUD" | "$";
    staffWL: TwlTableRow[];
    bonus: Partial<Tbonus>[];
    deduction: Partial<Tdeduction>[];
};

const tw = createTw({});

const Footer: FC<Tprops> = memo(
    ({ unit: u = "$", staffWL, bonus, deduction }) => {
        const { t } = useTranslation();
        const [staff] = useAtom(atStaff);

        const totalPay = staffWL.reduce((accumulator, currentItem) => {
            const workTime = convertWorkHour(
                calWorkTime(
                    currentItem.s_time,
                    currentItem.e_time,
                    currentItem.b_hour
                )
            );
            return plusAB(timesAB(workTime, staff.hr), accumulator);
        }, 0);

        const totalBonus =
            bonus && bonus.length
                ? bonus.reduce((accumulator, currentItem) => {
                      return plusAB(
                          currentItem.amount ? currentItem.amount : 0,
                          accumulator
                      );
                  }, 0)
                : 0;
        const totalDeduct =
            deduction && deduction.length
                ? deduction.reduce((accumulator, currentItem) => {
                      return plusAB(
                          currentItem.amount ? currentItem.amount : 0,
                          accumulator
                      );
                  }, 0)
                : 0;

        return (
            <View style={tw("flex w-[523pt] justify-center mt-3")} wrap={false}>
                {/* this pay */}
                <View style={tw("flex flex-row h-7 justify-between")}>
                    <Text style={tw("text-sm my-auto")}>
                        {t("label.thisPay")}:
                    </Text>

                    <Text style={tw("text-sm my-auto text-right")}>
                        {u + " " + totalPay}
                    </Text>
                </View>
                {/* bonus */}
                {totalBonus && (
                    <View style={tw("flex flex-row h-7 justify-between")}>
                        <Text style={tw("text-sm my-auto")}>
                            {t("label.bonus")}:
                        </Text>
                        <Text style={tw("text-sm my-auto text-right")}>
                            {u + " " + totalBonus}
                        </Text>
                    </View>
                )}
                {/* deduction */}
                {totalDeduct && (
                    <View style={tw("flex flex-row h-7 justify-between")}>
                        <Text style={tw("text-sm my-auto")}>
                            {t("label.deduction")}:
                        </Text>
                        <Text style={tw("text-sm my-auto text-right")}>
                            {"- " + u + " " + totalDeduct}
                        </Text>
                    </View>
                )}
                {/* total due */}
                <View
                    style={tw(
                        "flex flex-row justify-between border-t-2 border-teal-200 border-dotted pt-4"
                    )}
                >
                    <Text style={tw("text-xl my-auto")}>
                        {t("label.totalPay")}:
                    </Text>
                    <Text style={tw("text-xl my-auto text-right")}>
                        {u + " "}
                        {plusAB(minusAB(totalPay, totalDeduct), totalBonus)}
                    </Text>
                </View>
            </View>
        );
    }
);

export default Footer;
