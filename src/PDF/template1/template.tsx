import React from "react";
import type { FC } from "react";
import { PDFViewer, Page, View, Document } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { Tclient } from "@/configs/schema/clientSchema";
import { TorderWithDetails } from "@/configs/schema/orderSchema";
import { Tcompany } from "@/configs/schema/company";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import BillTitle from "./BillTitle";
import Title from "./Title";
import TableFooter from "./TableFooter";
import PageFooter from "./PageFooter";

const tw = createTw({});

type Tprops = {
    clientData?: Tclient;
    orderData?: TorderWithDetails;
    companyData?: Tcompany;
};

const servicesList = [
    {
        title: "service 1",
        qty: 1,
        gst: 10,
        netto: 100,
        total: 110,
        description: "12342",
    },
    {
        title: "service 2",
        qty: 2,
        gst: 10,
        netto: 100,
        total: 110,
        description: "fgeadf ",
    },
    {
        title: "service 3",
        qty: 1,
        gst: 10,
        netto: 100,
        total: 110,
    },
    {
        title: "service 4",
        qty: 6,
        gst: 10,
        netto: 100,
        total: 110,
        description: "12342",
    },
    {
        title: "service 5",
        qty: 10,
        gst: 10,
        netto: 100,
        total: 110,
    },
    {
        title: "service 5",
        qty: 10,
        gst: 10,
        netto: 100,
        total: 110,
    },
    {
        title: "service 5",
        qty: 10,
        gst: 10,
        netto: 100,
        total: 110,
    },
    {
        title: "service 5",
        qty: 10,
        gst: 10,
        netto: 100,
        total: 110,
    },
    {
        title: "service 5",
        qty: 10,
        gst: 10,
        netto: 100,
        total: 110,
    },
    {
        title: "service 5",
        qty: 10,
        gst: 10,
        netto: 100,
        total: 110,
    },
    {
        title: "service 5",
        qty: 10,
        gst: 10,
        netto: 100,
        total: 110,
    },
    {
        title: "service 5",
        qty: 10,
        gst: 10,
        netto: 100,
        total: 110,
    },
    {
        title: "service 5",
        qty: 10,
        gst: 10,
        netto: 100,
        total: 110,
    },
    {
        title: "service 5",
        qty: 10,
        gst: 10,
        netto: 100,
        total: 110,
    },
    {
        title: "service 5",
        qty: 10,
        gst: 10,
        netto: 100,
        total: 110,
    },
];

const PDFTemplate: FC<Tprops> = () => {
    const Services = () => {
        return (
            <View style={tw("flex w-[523pt] py-3")}>
                {/* table header */}
                <TableHeader />
                <TableRows data={servicesList} />
            </View>
        );
    };

    const mainContent = (
        <View style={tw("flex flex-col")}>
            <Title />
            <BillTitle />
            <Services />
            <TableFooter />
        </View>
    );

    return (
        <main>
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
        </main>
    );
};

export default PDFTemplate;
