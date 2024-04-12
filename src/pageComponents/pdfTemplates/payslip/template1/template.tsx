import type { FC } from "react";
import { PDFViewer, Page, View, Document, Text } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import Title from "./Title";
import PayTitle from "./BillTitle";
import PayHeader from "./PayHeader";
import PayRows from "./PayRows";
import PageFooter from "./PageFooter";
import PayFooter from "./PayFooter";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { atCompany, atLogo, atStaff } from "@/configs/atoms";
import { usePayslipStore } from "@/configs/zustore";
import { dateFormat } from "@/lib/time";
import BDRows from "./BRows";
import BDHeader from "./BHeader";
import BDFooter from "./BDFooter";
import DHeader from "./DHeader";
import DRows from "./DRows";
import Footer from "./Footer";

const tw = createTw({});

type Tprops = {
    unit?: "$" | "AUD";
    date: string;
};

const PayslipTemplate: FC<Tprops> = ({ unit = "$", date }) => {
    const { t } = useTranslation();
    const [company] = useAtom(atCompany);
    const [logo] = useAtom(atLogo);
    const [staff] = useAtom(atStaff);
    const staffWL = usePayslipStore((state) => state.staffWL);
    const dayRange = usePayslipStore((state) => state.dayRange);
    const bonus = usePayslipStore((state) => state.bonus);
    const deduction = usePayslipStore((state) => state.deduction);

    const Pay = () => {
        return (
            <View style={tw("flex w-[523pt] py-3")}>
                <Text style={tw("text-lg")}>{t("label.thisPay")}: </Text>
                <PayHeader />
                <PayRows data={staffWL} unit={unit} />
                <PayFooter data={staffWL} unit={unit} rate={staff.hr} />
            </View>
        );
    };

    const Bonus = () => {
        return (
            <View style={tw("flex w-[523pt] py-3")}>
                <Text style={tw("text-lg")}>{t("label.bonus")}: </Text>
                <BDHeader />
                <BDRows data={bonus} unit={unit} />
                <BDFooter data={bonus} unit={unit} />
            </View>
        );
    };

    const Deduction = () => {
        return (
            <View style={tw("flex w-[523pt] py-3")}>
                <Text style={tw("text-lg")}>{t("label.deduction")}: </Text>
                <DHeader />
                <DRows data={deduction} unit={unit} />
                <BDFooter data={deduction} unit={unit} bd="d" />
            </View>
        );
    };

    const mainContent = (
        <View style={tw("flex flex-col")}>
            <Title
                company={company}
                payslipID={"---"}
                issueDate={date}
                logo={logo}
            />
            <PayTitle
                staff={staff}
                startP={dateFormat(dayRange?.from?.toISOString(), "au")}
                endP={dateFormat(dayRange?.to?.toISOString(), "au")}
            />

            <Pay />
            {bonus.length ? <Bonus /> : null}
            {deduction && deduction.length ? <Deduction /> : null}

            <Footer
                unit={"$"}
                staffWL={staffWL}
                bonus={bonus}
                deduction={deduction}
            />
        </View>
    );

    return (
        <PDFViewer style={tw(`h-[83dvh] w-full`)}>
            <Document
                creator={"SRC"}
                producer={"SRC"}
                title={t("label.templateInvoice")}
                author={"Areos"}
            >
                <Page
                    size="A4"
                    style={tw("px-12 py-8 flex flex-row flex-wrap")}
                    wrap
                >
                    {mainContent}
                    <PageFooter />
                </Page>
            </Document>
        </PDFViewer>
    );
};

export default PayslipTemplate;
