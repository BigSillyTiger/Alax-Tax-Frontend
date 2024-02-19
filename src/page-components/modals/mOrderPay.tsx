import { useEffect, useState, memo } from "react";
import type { FC, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { useAtom } from "jotai";
import { zodResolver } from "@hookform/resolvers/zod";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
    TorderPayment,
    orderPaymentSchema,
} from "@/configs/schema/orderSchema";
import Card from "@/components/card";
import { MTemplate } from "@/components/modal";
import { SubmitBtn } from "@/components/form";
import { plusAB } from "@/utils/calculations";
import { toastError } from "@/utils/toaster";
import {
    ClientInfoCard,
    OrderInfoCard,
    OrderDescCard,
} from "@/components/customized";
import { newDateFormat } from "@/utils/utils";
import { dateMax, dateMin, mOpenOps } from "@/configs/utils";
import { atClient, atOrderWithPayments, atModalOpen } from "@/configs/atoms";

type Tpayment = {
    payments: TorderPayment[];
};

const MOrderPay: FC = memo(() => {
    const navigation = useNavigation();
    const [client] = useAtom(atClient);
    const [clientOrder] = useAtom(atOrderWithPayments);
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [payment, setPayment] = useState<TorderPayment>({
        fk_order_id: 0,
        paid: 0,
        paid_date: newDateFormat(new Date()),
    });
    const [totalPaid, setTotalPaid] = useState(0);
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
                fk_order_id: true,
            }) */
        ),
        defaultValues: { payments: clientOrder.payments },
    });

    const { fields, prepend, remove } = useFieldArray({
        name: "payments",
        control,
    });

    /**
     * this is essential for reseting data while opening the modal
     * if this operation is missing, the data that useForm read will
     * always be the initial one, which is empty
     */
    useEffect(() => {
        if (clientOrder) {
            reset({
                // this is the essential part of reading data from payments fields
                payments: clientOrder.payments
                    ? clientOrder.payments.map((item) => {
                          return {
                              ...item,
                              paid_date: newDateFormat(
                                  new Date(item.paid_date)
                              ),
                          };
                      })
                    : [],
            });
        }
    }, [clientOrder, reset]);

    useEffect(() => {
        setTotalPaid(
            fields.reduce(
                (accumulator, item) => plusAB(accumulator, item.paid),
                0
            )
        );
    }, [fields]);

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
                fk_order_id: clientOrder.order_id,
                paid: totalPaid,
            });
            submit(
                { values, req },
                {
                    method: "PUT",
                    action: `/clients/${clientOrder.fk_client_id}`,
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
            plusAB(totalPaid, payment.paid) <= clientOrder.order_total;
        !overPaidCheck && toastError(t("toastF.overPaid"));
        inputCheck && overPaidCheck && prepend(payment);
    };

    const paymentsContent = fields.length ? (
        <Card className=" my-2 mx-1 text-sm lg:h-[45vh] overflow-y-auto">
            {fields.map((field, index) => {
                return (
                    <section
                        key={field.id}
                        className="col-span-6 row-span-2 grid grid-cols-10 gap-x-2 gap-y-2"
                    >
                        <div className="col-span-1 m-auto">
                            {/* x btn */}
                            <button
                                type="button"
                                className="inline-flex w-full justify-center rounded-md bg-red-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                                onClick={() => remove(index)}
                            >
                                <span className="sr-only">
                                    {t("btn.close")}
                                </span>
                                <XMarkIcon
                                    className="h-4 w-3"
                                    aria-hidden="true"
                                />
                            </button>
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
                    </section>
                );
            })}
        </Card>
    ) : (
        <Card className="my-2 mx-1 text-indigo-300 text-bold lg:h-[45vh]">
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
                        defaultValue={newDateFormat(new Date())}
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
                        className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
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
            <section className="grid grid-cols-1 lg:grid-cols-8 gap-y-3 gap-x-4 overflow-y-auto h-[74vh] sm:h-[77vh] lg:h-auto">
                <section className="col-span-1 lg:col-span-3 grid grid-cols-1">
                    {/* client info */}
                    <fieldset className="col-span-full">
                        <legend className="text-indigo-500 text-bold">
                            <b>{t("label.clientInfo")}:</b>
                        </legend>
                        <ClientInfoCard
                            client={client}
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
                </section>
                <section className="col-span-1 lg:col-span-5 grid grid-cols-1">
                    <fieldset className="col-span-full">
                        <legend className="text-indigo-500 text-bold">
                            <b>{t("label.serviceList")}:</b>
                        </legend>
                        <Card className="my-2 mx-1 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 lg:h-[60vh] overflow-y-auto">
                            <section className="col-span-full">
                                <OrderDescCard
                                    data={clientOrder.order_services}
                                />
                            </section>
                        </Card>
                    </fieldset>
                    {/* payment section */}
                    {payOperation}
                    {/* submit btns */}
                    <section className="col-span-full row-span-2">
                        {/* btns */}
                        <SubmitBtn
                            onClick={() => trigger()}
                            onClose={onClose}
                            navState={navigation.state}
                        />
                    </section>
                </section>
            </section>
        </Form>
    );

    return (
        <>
            <MTemplate
                open={!!(modalOpen === mOpenOps.pay)}
                onClose={onClose}
                title={t("modal.title.payments") + ` #${clientOrder.order_id}`}
                mode={"full"}
                mQuit={true}
            >
                {mainContent}
            </MTemplate>
        </>
    );
});

export default MOrderPay;
