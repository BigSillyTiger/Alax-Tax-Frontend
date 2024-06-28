import type { FC } from "react";
import { PDFViewer, Page, View, Document, Text } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { Tclient } from "@/configs/schema/clientSchema";
import {
    TorderService,
    TorderPayment,
    Torder,
} from "@/configs/schema/orderSchema";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import BillTitle from "./BillTitle";
import Title from "./Title";
import TableFooter from "./TableFooter";
import PageFooter from "./PageFooter";
import PayHeader from "./PayHeader";
import PayRows from "./PayRows";
import { Tcompany } from "@/configs/schema/settingSchema";
import { useTranslation } from "react-i18next";

const tw = createTw({});

type Tprops = {
    type?: "I" | "Q";
    client: Tclient;
    order: Torder;
    company: Tcompany;
    unit?: "$" | "AUD";
    date: string;
    logo: string;
};

/**
 * @description Template for invoice and quotation
 * @param type - type of the template: I or Q
 * @param client - client details
 * @param order - order details
 * @param company - company details
 * @param unit - currency unit
 * @param date - date of the invoice
 * @param logo - company logo
 * @returns
 */
const Template: FC<Tprops> = ({
    type = "I",
    client,
    order,
    company,
    unit = "$",
    date,
    logo,
}) => {
    const { t } = useTranslation();

    const borderC = type === "I" ? "border-orange-200" : "border-indigo-200";
    const textC = type === "I" ? "text-orange-700" : "text-indigo-700";
    const bgC1 = type === "I" ? "bg-orange-200" : "bg-indigo-200";
    const bgC2 = type === "I" ? "bg-orange-100" : "bg-indigo-100";
    const bgC3 = type === "I" ? "bg-orange-50" : "bg-indigo-50";

    const Services = ({ order }: { order: TorderService[] }) => {
        return (
            <View style={tw("flex w-[523pt] py-3")}>
                <Text style={tw("text-lg")}>
                    {t("label.servicesDetails")}:{" "}
                </Text>
                <TableHeader bgC={bgC1} />
                <TableRows bgC={bgC2} data={order} unit={unit} />
            </View>
        );
    };

    const Payments = ({ payments }: { payments: TorderPayment[] }) => {
        if (!payments) {
            return null;
        }
        return (
            <View style={tw("flex w-[523pt] py-3")}>
                <Text style={tw("text-lg")}>{t("label.payments")}: </Text>
                <PayHeader bgC={bgC1} />
                <PayRows bgC={bgC2} data={payments} unit={unit} />
            </View>
        );
    };

    const mainContent = (
        <View style={tw("flex flex-col")}>
            <Title
                type={type}
                company={company}
                orderID={order.oid}
                issueDate={date}
                logo={logo}
                borderC={borderC}
            />
            <BillTitle
                company={company}
                client={client}
                borderC={borderC}
                textC={textC}
            />
            <Services order={order.order_services} />
            {type === "I" && <Payments payments={order.payments} />}
            <TableFooter
                type={type}
                order={order.order_services}
                paid={order.paid}
                unit={unit}
                dRate={company.deposit_rate}
                bgC={bgC3}
                bgC2={bgC2}
                textC={textC}
                borderC={borderC}
            />
        </View>
    );

    return (
        <PDFViewer style={tw(`h-[83dvh] w-full`)}>
            <Document
                creator={"SRC"}
                producer={"SRC"}
                title={
                    type === "I"
                        ? t("label.templateInvoice")
                        : t("label.templateQuotation")
                }
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

export default Template;
