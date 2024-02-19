import { memo, useEffect, useState } from "react";
import type { FC } from "react";
import { useAtom } from "jotai";
import { useSubmit } from "react-router-dom";
import { InvTemplate } from "@/utils/pdf-templates/invoices";
import { useTranslation } from "react-i18next";
import { Toggle } from "@/components/disclosure";
import {
    ClientInfoCard,
    OrderDescCard,
    OrderDetailsCard,
} from "@/components/customized";
import { NormalBtn } from "@/components/btns";
import CompanyInfoCard from "@/components/customized/CompanyInfoCard";
import { newDateFormat } from "@/utils/utils";
import { dateMax, dateMin } from "@/configs/utils";
import {
    atCompany,
    atLogo,
    atOrderWithPayments,
    atClient,
} from "@/configs/atoms";

const DatePicker = ({
    order_id,
    client_id,
    date,
    setDate,
    defaultDate,
}: {
    order_id: string;
    client_id: string;
    date: string;
    setDate: (v: string) => void;
    defaultDate: string;
}) => {
    const { t } = useTranslation();
    const [newDate, setNewDate] = useState(date);
    const submit = useSubmit();

    const onSubmit = async (date: string) => {
        //const result = await API_ORDER.updateInvoiceIssue(date, order_id);
        submit(
            { date, order_id, req: "updateInvoiceIssue" },
            {
                method: "PUT",
                action: `/clients/${client_id}`,
            }
        );
    };

    return (
        <div className="flex flex-col h-[18vh] border-t-2 border-dotted border-indigo-400 my-3 py-2">
            <div className="grid grid-cols-2 gap-2 my-2">
                <div className="col-span-1">
                    <section className="col-span-1">
                        <label
                            htmlFor="issuedDate"
                            className="text-indigo-500 text-bold"
                        >
                            {t("label.newIssueDate")}
                        </label>
                        <input
                            id="issuedDate"
                            name="issuedDate"
                            type="date"
                            min={dateMin}
                            max={dateMax}
                            defaultValue={newDateFormat(new Date())}
                            onChange={(e) => {
                                setNewDate(e.target.value);
                            }}
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                        />
                    </section>
                </div>
                <div className="col-span-1 mt-3.5">
                    <NormalBtn
                        name={t("btn.updateIssueDate")}
                        onClick={() => {
                            setDate(newDate);
                            onSubmit(newDate);
                        }}
                        className="h-[4vh] mt-[1vh]"
                    />
                </div>
            </div>
            {/* default issued date */}
            <div className="grid grid-cols-2 gap-2 my-2 ">
                <div className="col-span-1">
                    <section>
                        <label
                            htmlFor="issuedDate"
                            className="text-indigo-500 text-bold"
                        >
                            {t("label.defaultIssueDate")}
                        </label>
                        <input
                            id="issuedDate"
                            name="issuedDate"
                            type="date"
                            min={dateMin}
                            max={dateMax}
                            defaultValue={newDateFormat(new Date(defaultDate))}
                            disabled
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                    </section>
                </div>
                <div className="col-span-1 mt-3.5">
                    <NormalBtn
                        name={t("btn.resetIssue")}
                        onClick={() => {
                            setDate(defaultDate);
                            onSubmit(defaultDate);
                        }}
                        className="h-[4vh] mt-[1vh]"
                    />
                </div>
            </div>
        </div>
    );
};

const InvContent: FC = memo(() => {
    const [date, setDate] = useState(newDateFormat(new Date()));
    const { t } = useTranslation();
    const [client] = useAtom(atClient);
    const [clientOrder] = useAtom(atOrderWithPayments);
    const [company] = useAtom(atCompany);
    const [logo] = useAtom(atLogo);

    useEffect(() => {
        if (clientOrder.invoice_issue_date) {
            setDate(newDateFormat(new Date(clientOrder.invoice_issue_date)));
        }
    }, [clientOrder.invoice_issue_date]);

    const detailContent = (
        <section className="h-[67vh] overflow-y-auto">
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
                content={<OrderDetailsCard order={clientOrder} className="" />}
            />
            <Toggle
                defaultOpen={true}
                title={t("label.orderServices")}
                content={<OrderDescCard data={clientOrder.order_services} />}
            />
        </section>
    );

    return (
        <main className="grid grid-cols-1 md:grid-cols-8 gap-x-2 overflow-y-auto h-[93vh]">
            <section className="col-span-1 md:col-span-3 ">
                {detailContent}
                <DatePicker
                    order_id={clientOrder.order_id}
                    client_id={clientOrder.fk_client_id}
                    date={date}
                    setDate={setDate}
                    defaultDate={clientOrder.invoice_issue_date}
                />
            </section>
            <section className="col-span-1 md:col-span-5">
                <InvTemplate
                    client={client}
                    order={clientOrder}
                    company={company}
                    unit="$"
                    date={date}
                    logo={logo}
                />
            </section>
        </main>
    );
});

export default InvContent;
