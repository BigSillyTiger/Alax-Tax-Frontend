import { useEffect, useState, memo, useMemo } from "react";
import type { FC, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { useAtom } from "jotai";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    TorderPayment,
    orderPaymentSchema,
} from "@/configs/schema/orderSchema";
import Card from "@/components/Card";
import { MTemplate } from "@/components/modal";
import { SubmitBtn } from "@/components/form";
import { plusAB } from "@/lib/calculations";
import { toastError } from "@/lib/toaster";
import {
    ClientInfoCard,
    OrderInfoCard,
    OrderDescCard,
} from "@/pageComponents/cards";
import { genAction } from "@/lib/literals";
import { dateFormat } from "@/lib/time";
import { mOpenOps } from "@/configs/utils/modal";
import { dateMax, dateMin } from "@/configs/utils/date";
import { atOrder, atModalOpen } from "@/configs/atoms";
import { useRouterStore } from "@/configs/zustore";
import { XBtn } from "@/components/btns";

type Tpayment = {
    payments: TorderPayment[];
};

const MOrderPay: FC = memo(() => {
    const navigation = useNavigation();
    const [clientOrder] = useAtom(atOrder);
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [payment, setPayment] = useState<TorderPayment>({
        pid: "",
        fk_oid: "",
        paid: 0,
        paid_date: dateFormat(new Date()),
    });
    const [totalPaid, setTotalPaid] = useState(0);
    const currentRouter = useRouterStore((state) => state.currentRouter);
    const { t } = useTranslation();
    const submit = useSubmit();

    const {
        control,
        //formState: { errors },
        getValues,
        register,
        reset,
        //setValue,
        trigger,
        //watch,
    } = useForm<Tpayment>({
        resolver: zodResolver(
            orderPaymentSchema
            /* orderPaymentSchema.omit({
                fk_oid: true,
            }) */
        ),
        defaultValues: { payments: clientOrder.payments },
    });

    const { fields, prepend, remove } = useFieldArray({
        name: "payments",
        control,
    });

    const newPayments = useMemo(() => {
        if (clientOrder && clientOrder.payments) {
            return clientOrder.payments.map((item) => ({
                ...item,
                paid_date: dateFormat(new Date(item.paid_date)),
            }));
        }
        return [];
    }, [clientOrder]);

    const newTotalPaid = useMemo(() => {
        return fields.reduce(
            (accumulator, item) => plusAB(accumulator, item.paid),
            0
        );
    }, [fields]);

    /**
     * this is essential for reseting data while opening the modal
     * if this operation is missing, the data that useForm read will
     * always be the initial one, which is empty
     */
    useEffect(() => {
        reset({ payments: newPayments });
    }, [reset, newPayments]);

    useEffect(() => {
        setTotalPaid(newTotalPaid);
    }, [newTotalPaid]);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!fields.length) {
            toastError("Please add one payment at least.");
            return;
        }
        //console.log("-> click submit err: ", errors);
        const isValid = await trigger("payments");
        if (isValid) {
            const req = "paymentUpdate";
            const values = JSON.stringify({
                ...getValues(),
                fk_oid: clientOrder.oid,
                paid: totalPaid,
            });
            submit(
                { values, req },
                {
                    method: "PUT",
                    action:
                        currentRouter === "client"
                            ? genAction(currentRouter, clientOrder.fk_cid)
                            : genAction(currentRouter),
                }
            );
        }
    };

    const onClose = () => {
        setModalOpen("");
        reset();
    };

    const handlePayment = () => {
        const inputCheck = payment.paid > 0 && payment.paid_date.length > 0;
        !inputCheck && toastError(t("toastF.invalidPayment"));
        const overPaidCheck =
            plusAB(totalPaid, payment.paid) <= clientOrder.total;
        !overPaidCheck && toastError(t("toastF.overPaid"));
        inputCheck && overPaidCheck && prepend(payment);
    };

    const paymentsContent = fields.length ? (
        <Card className={`my-2 mx-1 text-sm lg:h-[45dvh] overflow-y-auto`}>
            {fields.map((field, index) => {
                return (
                    <div
                        key={field.id}
                        className="col-span-6 row-span-2 grid grid-cols-10 gap-x-2 gap-y-2"
                    >
                        {/* x btn */}
                        <div className="col-span-1 m-auto">
                            <XBtn onClick={() => remove(index)} />
                        </div>
                        {/* content */}
                        <Card className="col-span-9 mt-3 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-8 bg-indigo-50 py-2">
                            {/* paid amount */}
                            <div className="col-span-4">
                                <label
                                    htmlFor="paid"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {t("label.service")}
                                </label>
                                <input
                                    {...register(`payments.${index}.paid`, {
                                        valueAsNumber: true,
                                        min: 0,
                                    })}
                                    id="paid"
                                    name="paid"
                                    type="number"
                                    min={0}
                                    step="0.01"
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                />
                            </div>
                            <div className="col-span-4">
                                <label
                                    htmlFor="paid_date"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {t("label.service")}
                                </label>
                                <input
                                    {...register(`payments.${index}.paid_date`)}
                                    id="paid_date"
                                    name="paid_date"
                                    type="date"
                                    min={dateMin}
                                    max={dateMax}
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                />
                            </div>
                        </Card>
                    </div>
                );
            })}
        </Card>
    ) : (
        <Card className={`my-2 mx-1 text-indigo-300 text-bold lg:h-[45dvh]`}>
            {t("tips.noPayments")}
        </Card>
    );

    const payOperation = (
        <fieldset className="col-span-full mt-4 pt-3 border-t-2 border-indigo-300 border-dashed">
            <div className="grid grid-cols-6 gap-x-3">
                <div className="col-span-2">
                    <label
                        htmlFor="payAmount"
                        className="text-indigo-500 text-bold"
                    >
                        {t("label.payAmount")}
                    </label>
                    <input
                        id="payAmount"
                        name="payAmount"
                        type="number"
                        min={0}
                        step="0.01"
                        defaultValue={0}
                        onChange={(e) => {
                            setPayment({
                                ...payment,
                                paid: e.target.valueAsNumber,
                            });
                        }}
                        className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    />
                </div>
                <div className="col-span-3">
                    <label
                        htmlFor="payDate"
                        className="text-indigo-500 text-bold"
                    >
                        {t("label.payDate")}
                    </label>
                    <input
                        id="payDate"
                        name="payDate"
                        type="date"
                        min={dateMin}
                        max={dateMax}
                        defaultValue={dateFormat(new Date())}
                        onChange={(e) => {
                            setPayment({
                                ...payment,
                                paid_date: e.target.value,
                            });
                        }}
                        className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    />
                </div>
                <div className="col-span-1 mt-6">
                    <button
                        type="button"
                        className="w-full rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600"
                        onClick={handlePayment}
                    >
                        {t("btn.pay")}
                    </button>
                </div>
            </div>
        </fieldset>
    );

    const mainContent = (
        <Form onSubmit={onSubmit}>
            <div
                className={`grid grid-cols-1 lg:grid-cols-8 gap-y-3 gap-x-4 overflow-y-auto h-[77dvh] lg:h-auto`}
            >
                <div className="col-span-1 lg:col-span-3 grid grid-cols-1">
                    {/* client info */}
                    <fieldset className="col-span-full">
                        <legend className="text-indigo-500 text-bold">
                            <b>{t("label.clientInfo")}:</b>
                        </legend>
                        <ClientInfoCard
                            client={clientOrder.client_info}
                            className="my-2 mx-1 text-sm"
                        />
                    </fieldset>
                    {/* order info */}
                    <fieldset className="col-span-full">
                        <legend className="text-indigo-500 text-bold">
                            <b>{t("label.orderInfo")}:</b>
                        </legend>
                        <OrderInfoCard
                            order={clientOrder}
                            paid={totalPaid}
                            className="my-2 mx-1 text-sm"
                        />
                    </fieldset>
                    <fieldset className="col-span-full">
                        <legend className="text-indigo-500 text-bold">
                            <b>{t("label.payments")}</b>
                        </legend>
                        {paymentsContent}
                    </fieldset>
                </div>
                <div className="col-span-1 lg:col-span-5 grid grid-cols-1">
                    <fieldset className="col-span-full">
                        <legend className="text-indigo-500 text-bold">
                            <b>{t("label.serviceList")}:</b>
                        </legend>
                        <Card
                            className={`my-2 mx-1 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 lg:h-[60dvh] overflow-y-auto`}
                        >
                            <div className="col-span-full">
                                <OrderDescCard
                                    data={clientOrder.order_services}
                                />
                            </div>
                        </Card>
                    </fieldset>
                    {/* payment section */}
                    {payOperation}
                    {/* submit btns */}
                    <div className="col-span-full row-span-2">
                        {/* btns */}
                        <SubmitBtn
                            onClick={() => trigger()}
                            onClose={onClose}
                            navState={navigation.state}
                        />
                    </div>
                </div>
            </div>
        </Form>
    );

    return (
        <>
            <MTemplate
                open={!!(modalOpen === mOpenOps.pay)}
                onClose={onClose}
                title={t("modal.title.payments") + ` #${clientOrder.oid}`}
                mode={"full"}
                mQuit={true}
            >
                {mainContent}
            </MTemplate>
        </>
    );
});

export default MOrderPay;
