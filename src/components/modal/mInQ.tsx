import React, { memo, useState } from "react";
import type { FC } from "react";
import { MTemplate } from ".";
import { Tclient } from "@/configs/schema/clientSchema";
import { TclientOrderModal } from "@/utils/types";
import { TorderWithDetails } from "@/configs/schema/orderSchema";
import PDFTemplate from "@/PDF/invoices/template1";
import { useTranslation } from "react-i18next";
import { Toggle } from "../disclosure";
import { ClientInfoCard, OrderDescCard, OrderDetailsCard } from "../customized";
import { NormalBtn } from "../btns";
import { Tcompany } from "@/configs/schema/manageSchema";
import CompanyInfoCard from "../customized/CompanyInfoCard";
import { newDateFormat } from "@/utils/utils";

type Tprops = {
    open: TclientOrderModal;
    setOpen: (order: TclientOrderModal) => void;
    client: Tclient;
    order: TorderWithDetails;
    company: Tcompany;
};

const MInQ: FC<Tprops> = ({ open, setOpen, client, order, company }) => {
    const [date, setDate] = useState(newDateFormat(new Date())); // [0] is date, [1] is time
    const { t } = useTranslation();
    const onClose = () => {
        setOpen("");
    };

    const detailContent = (
        <section className="h-[75vh] overflow-y-auto">
            <Toggle
                defaultOpen={true}
                title={t("label.companyInfo")}
                content={<CompanyInfoCard company={company} className="" />}
            />
            <Toggle
                defaultOpen={true}
                title={t("label.clientInfo")}
                content={<ClientInfoCard client={client} className="" />}
            />
            <Toggle
                defaultOpen={true}
                title={t("label.orderInfo")}
                content={<OrderDetailsCard order={order} className="" />}
            />
            <Toggle
                defaultOpen={true}
                title={t("label.orderServices")}
                content={<OrderDescCard data={order.order_desc} />}
            />
        </section>
    );

    const datePicker = (
        <div className="grid grid-cols-2 gap-x-3 h-[10vh]">
            <div className="col-span-1 my-auto">
                <label
                    htmlFor="issuedDate"
                    className="text-indigo-500 text-bold"
                >
                    {t("label.issuedDate")}
                </label>
                <input
                    id="issuedDate"
                    name="issuedDate"
                    type="date"
                    defaultValue={newDateFormat(new Date())}
                    onChange={(e) => {
                        setDate(e.target.value);
                    }}
                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                />
            </div>
            <div className="col-span-1 mt-7">
                <NormalBtn
                    name={t("btn.updateIssueDate")}
                    onClick={() => {
                        123;
                    }}
                    className="h-[4vh] mt-[1vh]"
                />
            </div>
        </div>
    );

    const mainContent = (
        <main className="grid grid-cols-1 sm:grid-cols-8 gap-x-2">
            <section className="col-span-1 sm: col-span-3 ">
                {detailContent}
                {datePicker}
            </section>
            <section className="col-span-1 sm: col-span-5">
                <PDFTemplate
                    client={client}
                    order={order}
                    company={company}
                    unit="$"
                />
            </section>
        </main>
    );

    return (
        <>
            <MTemplate
                open={!!(open === "Invoice")}
                onClose={onClose}
                title={t("modal.title.invoice")}
                mode="full"
                mQuit={true}
            >
                {mainContent}
            </MTemplate>
        </>
    );
};

export default memo(MInQ);
