import type { FC } from "react";
import { PDFViewer, Page, View, Document, Text } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { TorderService, TorderPayment } from "@/configs/schema/orderSchema";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import BillTitle from "./BillTitle";
import Title from "./Title";
import TableFooter from "./TableFooter";
import PageFooter from "./PageFooter";
import PayHeader from "./PayHeader";
import PayRows from "./PayRows";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { atCompany, atLogo, atStaff } from "@/configs/atoms";
import { usePayslipStore, useStaffWLStore } from "@/configs/zustore";

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

    const Services = () => {
        return (
            <View style={tw("flex w-[523pt] py-3")}>
                <Text style={tw("text-lg")}>
                    {t("label.servicesDetails")}:{" "}
                </Text>
                <TableHeader />
                <TableRows data={staffWL} unit={unit} />

                {/* <TableFooter data={staffWL} unit={unit} /> */}
            </View>
        );
    };

    /* const Payments = ({ payments }: { payments: TorderPayment[] }) => {
        if (!payments) {
            return null;
        }
        return (
            <View style={tw("flex w-[523pt] py-3")}>
                <Text style={tw("text-lg")}>{t("label.payments")}: </Text>
                <PayHeader />
                <PayRows data={payments} unit={unit} />
            </View>
        );
    }; */

    const mainContent = (
        <View style={tw("flex flex-col")}>
            <Title
                company={company}
                invoiceID={"---"}
                issueDate={date}
                logo={logo}
            />
            <BillTitle company={company} staff={staff} />

            <Services />
            {/* <Payments payments={order.payments} /> */}
            {/* <TableFooter
                company={company}
                order={order.order_services}
                paid={order.paid}
                unit={unit}
            /> */}
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
