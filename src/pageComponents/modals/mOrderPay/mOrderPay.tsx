import { useEffect, useState, memo, useMemo } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useForm, useFieldArray } from "react-hook-form";
import { useAtom } from "jotai";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tpayment, orderPaymentSchema } from "@/configs/schema/orderSchema";
import { MTemplate } from "@/components/modal";
import { plusAB } from "@/lib/calculations";
import { dateFormat } from "@/lib/time";
import { mOpenOps } from "@/configs/utils/modal";
import { atOrder, atModalOpen } from "@/configs/atoms";
import FormContent from "./Form";

const MOrderPay: FC = memo(() => {
    const [clientOrder] = useAtom(atOrder);
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [totalPaid, setTotalPaid] = useState(0);

    const { t } = useTranslation();

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

    const onClose = () => {
        setModalOpen("");
        reset();
    };

    return (
        <>
            <MTemplate
                open={!!(modalOpen === mOpenOps.pay)}
                onClose={onClose}
                title={t("modal.title.payments") + ` #${clientOrder.oid}`}
                mode={"full"}
                mQuit={true}
            >
                <FormContent
                    register={register}
                    getValues={getValues}
                    prepend={prepend}
                    fields={fields}
                    trigger={trigger}
                    remove={remove}
                    onClose={onClose}
                    totalPaid={totalPaid}
                />
            </MTemplate>
        </>
    );
});

export default MOrderPay;
