import type { FC } from "react";
import {
    PDFViewer,
    Page,
    View,
    Document,
    Text,
    PDFDownloadLink,
    Font,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import Title from "./Title";
import BillTitle from "./BillTitle";
import PayHeader from "./PayHeader";
import PayRows from "./PayRows";
import PageFooter from "./PageFooter";
import PayFooter from "./PayFooter";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { atLogo } from "@/configs/atoms";
import { usePayslipStore } from "@/configs/zustore";
import BDRows from "./BDRows";
import BDHeader from "./BHeader";
import BDFooter from "./BDFooter";
import DHeader from "./DHeader";
import DRows from "./DRows";
import Footer from "./Footer";
import { hyphenationCallback } from "@/lib/utils";

Font.registerHyphenationCallback(hyphenationCallback);

const tw = createTw({});

type Tprops = {
    unit?: "$" | "AUD";
    date: string;
    isDlLink?: {
        isLink: boolean;
        pdfTitle: string;
        btnTitle: string;
    };
};

const PayslipTemplate: FC<Tprops> = ({
    unit = "$",
    date,
    isDlLink = {
        isLink: false,
        pdfTitle: "",
        btnTitle: "",
    },
}) => {
    const { t } = useTranslation();
    const [logo] = useAtom(atLogo);
    const payslip = usePayslipStore((state) => state.payslip);
    const staffWL = usePayslipStore((state) => state.staffWL);
    const bonus = usePayslipStore((state) => state.bonus);
    const deduction = usePayslipStore((state) => state.deduction);

    const Pay = () => {
        return (
            <View style={tw("flex w-[523pt] py-3")}>
                <Text style={tw("text-lg")}>{t("label.thisPay")}: </Text>
                <PayHeader />
                <PayRows data={staffWL} unit={unit} />
                <PayFooter
                    data={staffWL}
                    unit={unit}
                    rate={payslip.hr ? payslip.hr : 25}
                />
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
                companyName={payslip.company_name ? payslip.company_name : ""}
                companyAddr={payslip.company_addr ? payslip.company_addr : ""}
                companyPhone={
                    payslip.company_phone ? payslip.company_phone : ""
                }
                payslipID={payslip.psid!}
                issueDate={date}
                logo={logo}
            />
            <BillTitle
                staffName={payslip.staff_name ? payslip.staff_name : ""}
                staffPhone={payslip.staff_phone ? payslip.staff_phone : ""}
                staffEmail={payslip.staff_email ? payslip.staff_email : ""}
                staffBSB={payslip.staff_bsb ? payslip.staff_bsb : ""}
                staffACC={payslip.staff_acc ? payslip.staff_acc : ""}
                startP={payslip.s_date ? payslip.s_date : ""}
                endP={payslip.e_date ? payslip.e_date : ""}
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

    const DocumentContent = () => (
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
    );

    if (isDlLink.isLink) {
        return (
            <PDFDownloadLink
                document={
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
                }
                fileName={`${isDlLink.pdfTitle}.pdf`}
            >
                {isDlLink.btnTitle}
            </PDFDownloadLink>
        );
    }
    return (
        <PDFViewer style={tw(`h-[83dvh] w-full`)}>
            <DocumentContent />
        </PDFViewer>
    );
};

export default PayslipTemplate;
