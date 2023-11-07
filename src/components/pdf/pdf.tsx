import React from "react";
import type { FC } from "react";
import {
    PDFViewer,
    Page,
    Text,
    View,
    Document,
    StyleSheet,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { Tclient } from "@/configs/schema/clientSchema";
import { TorderWithDetails } from "@/configs/schema/orderSchema";
import { Tcompany } from "@/configs/schema/company";

const tw = createTw({});

type Tprops = {
    clientData: Tclient;
    orderData: TorderWithDetails;
    companyData: Tcompany;
};

const PDFCreator: FC = () => {
    const mainContent = <></>;

    return (
        <main>
            <PDFViewer style={tw("h-[80vh] w-full")}>
                <Document>
                    <Page
                        size="A4"
                        style={tw("p-4 flex flex-row flex-wrap gap-4")}
                    >
                        {mainContent}
                    </Page>
                </Document>
            </PDFViewer>
        </main>
    );
};

export default PDFCreator;
