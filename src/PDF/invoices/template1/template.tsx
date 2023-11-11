import React from "react";
import type { FC, ReactNode } from "react";
import { PDFViewer, Page, View, Document, Text } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { Tclient } from "@/configs/schema/clientSchema";
import {
    TorderDesc,
    TorderPayment,
    TorderWithDetails,
} from "@/configs/schema/orderSchema";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import BillTitle from "./BillTitle";
import Title from "./Title";
import TableFooter from "./TableFooter";
import PageFooter from "./PageFooter";
import PayHeader from "./PayHeader";
import PayRows from "./PayRows";
import { Tcompany } from "@/configs/schema/manageSchema";
import { useTranslation } from "react-i18next";

const tw = createTw({});

type Tprops = {
    client: Tclient;
    order: TorderWithDetails;
    company: Tcompany;
    unit?: "$" | "AUD";
    date: string;
};

const PDFTemplate: FC<Tprops> = ({
    client,
    order,
    company,
    unit = "$",
    date,
}) => {
    const { t } = useTranslation();

    const Services = ({ order }: { order: TorderDesc[] }) => {
        return (
            <View style={tw("flex w-[523pt] py-3")}>
                <Text style={tw("text-lg")}>
                    {t("label.servicesDetails")}:{" "}
                </Text>
                <TableHeader />
                <TableRows data={order} unit={unit} />
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
                <PayHeader />
                <PayRows data={payments} unit={unit} />
            </View>
        );
    };

    const mainContent = (
        <View style={tw("flex flex-col")}>
            <Title
                company={company}
                invoiceID={order.order_id}
                issueDate={date}
            />
            <BillTitle company={company} client={client} />
            <Services order={order.order_desc} />
            <Payments payments={order.payments} />
            <TableFooter
                company={company}
                order={order.order_desc}
                paid={order.order_paid}
                unit={unit}
            />
        </View>
    );

    return (
        <PDFViewer style={tw("h-[85vh] w-full")}>
            <Document
                creator={"SRC"}
                producer={"SRC"}
                title={"invoice-template"}
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

export default PDFTemplate;