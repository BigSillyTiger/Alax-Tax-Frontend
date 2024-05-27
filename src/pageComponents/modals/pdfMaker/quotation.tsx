import { memo, useEffect, useState } from "react";
import type { FC } from "react";
import { useAtom } from "jotai";
import { useSubmit } from "react-router-dom";
import Template from "@/pageComponents/pdfTemplates/template1";
import { useTranslation } from "react-i18next";
import { Toggle } from "@/components/disclosure";
import {
    ClientInfoCard,
    OrderDescCard,
    OrderDetailsCard,
} from "@/pageComponents/cards";
import { Nbtn } from "@/components/btns";
import CompanyInfoCard from "@/pageComponents/cards/CompanyInfoCard";
import { dateFormat } from "@/lib/time";
import { dateMax, dateMin } from "@/configs/utils/date";
import { atCompany, atLogo, atOrder, atClient } from "@/configs/atoms";

const DatePicker = ({
    oid,
    cid,
    date,
    setDate,
    defaultDate,
}: {
    oid: string;
    cid: string;
    date: string;
    setDate: (v: string) => void;
    defaultDate: string;
}) => {
    const { t } = useTranslation();
    const [newDate, setNewDate] = useState(date);
    const submit = useSubmit();

    const onSubmit = async (date: string) => {
        //const result = await API_ORDER.updateInvoiceIssue(date, oid);
        submit(
            { date, oid, req: "updateQuotation" },
            {
                method: "PUT",
                action: `/clients/${cid}`,
            }
        );
    };

    return (
        /* current date */
        <div
            className={`flex flex-col h-[18dvh] border-t-2 border-dotted border-indigo-400 my-3 py-2`}
        >
            <div className="grid grid-cols-2 gap-2 my-2">
                <div className="col-span-1">
                    <div className="col-span-1">
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
                            defaultValue={dateFormat(new Date())}
                            onChange={(e) => {
                                setNewDate(e.target.value);
                            }}
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                        />
                    </div>
                </div>
                <div className="col-span-1 mt-3.5">
                    <Nbtn
                        onClick={() => {
                            setDate(newDate);
                            onSubmit(newDate);
                        }}
                        className={`h-[4dvh] mt-[1dvh]`}
                    >
                        {t("btn.updateIssueDate")}
                    </Nbtn>
                </div>
            </div>
            {/* default issued date */}
            <div className="grid grid-cols-2 gap-2 my-2 ">
                <div className="col-span-1">
                    <div>
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
                            defaultValue={dateFormat(new Date(defaultDate))}
                            disabled
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                    </div>
                </div>
                <div className="col-span-1 mt-3.5">
                    <Nbtn
                        onClick={() => {
                            setDate(defaultDate);
                            onSubmit(defaultDate);
                        }}
                        className={`h-[4dvh] mt-[1dvh]`}
                    >
                        {t("btn.resetIssue")}
                    </Nbtn>
                </div>
            </div>
        </div>
    );
};

const QuoContent: FC = memo(() => {
    const [date, setDate] = useState(dateFormat(new Date()));
    const { t } = useTranslation();
    const [client] = useAtom(atClient);
    const [clientOrder] = useAtom(atOrder);
    const [company] = useAtom(atCompany);
    const [logo] = useAtom(atLogo);

    useEffect(() => {
        if (clientOrder.invoice_date) {
            setDate(dateFormat(new Date(clientOrder.invoice_date)));
        }
    }, [clientOrder.invoice_date]);

    const detailContent = (
        <div className={`h-[64dvh] overflow-y-auto`}>
            <Toggle defaultOpen={true} title={t("label.companyInfo")}>
                <CompanyInfoCard company={company} className="" />
            </Toggle>
            <Toggle defaultOpen={true} title={t("label.clientInfo")}>
                <ClientInfoCard client={client} className="" />
            </Toggle>
            <Toggle defaultOpen={true} title={t("label.orderInfo")}>
                <OrderDetailsCard order={clientOrder} className="" />
            </Toggle>
            <Toggle defaultOpen={true} title={t("label.orderServices")}>
                <OrderDescCard
                    data={clientOrder.order_services}
                    readonly={true}
                />
            </Toggle>
        </div>
    );

    return (
        <main
            className={`grid grid-cols-1 md:grid-cols-8 gap-x-2 overflow-y-auto h-[83dvh]`}
        >
            <div className="col-span-1 md:col-span-3 ">
                {detailContent}
                <DatePicker
                    oid={clientOrder.oid}
                    cid={clientOrder.fk_cid}
                    date={date}
                    setDate={setDate}
                    defaultDate={
                        clientOrder.invoice_date
                            ? clientOrder.invoice_date
                            : new Date().toISOString()
                    }
                />
            </div>
            <div className="col-span-1 md:col-span-5">
                <Template
                    type="Q"
                    client={client}
                    order={clientOrder}
                    company={company}
                    unit="$"
                    date={date}
                    logo={logo}
                />
            </div>
        </main>
    );
});

export default QuoContent;
