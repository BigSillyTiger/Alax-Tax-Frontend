import type { FC } from "react";
import { PDFViewer, Page, View, Document, Text } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { Tclient } from "@/configs/schema/clientSchema";
import { TorderService, Torder } from "@/configs/schema/orderSchema";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import BillTitle from "./BillTitle";
import Title from "./Title";
import TableFooter from "./TableFooter";
import PageFooter from "./PageFooter";
import { Tcompany } from "@/configs/schema/settingSchema";
import { useTranslation } from "react-i18next";

const tw = createTw({});

type Tprops = {
    client: Tclient;
    order: Torder;
    company: Tcompany;
    unit?: "$" | "AUD";
    date: string;
    logo: string;
};

const QuoTemplate: FC<Tprops> = ({
    client,
    order,
    company,
    unit = "$",
    date,
    logo,
}) => {
    const { t } = useTranslation();

    const Services = ({ order }: { order: TorderService[] }) => {
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

    const mainContent = (
        <View style={tw("flex flex-col")}>
            <Title
                company={company}
                orderID={order.order_id}
                issueDate={date}
                logo={logo}
            />
            <BillTitle company={company} client={client} />
            <Services order={order.order_services} />

            <TableFooter
                company={company}
                order={order.order_services}
                unit={unit}
            />
        </View>
    );

    return (
        <PDFViewer style={tw("h-[85vh] w-full")}>
            <Document
                creator={"SRC"}
                producer={"SRC"}
                title={t("label.templateQuotation")}
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

export default QuoTemplate;
