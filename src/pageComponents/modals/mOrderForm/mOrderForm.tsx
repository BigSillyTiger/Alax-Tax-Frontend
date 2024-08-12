import type { FC } from "react";
import { useEffect, memo } from "react";
import { useTranslation } from "react-i18next";
import { useForm, useFieldArray } from "react-hook-form";
import { useAtom } from "jotai";
import { zodResolver } from "@hookform/resolvers/zod";
import { TorderForm, orderFormSchema } from "@/configs/schema/orderSchema";
import { MTemplate } from "@/components/modal";
import { atModalOpen, atOrderWithClient, atSUData } from "@/configs/atoms";
import { mOpenOps } from "@/configs/utils/modal";
import FormContent from "./Form";
import { ORDER_STATUS } from "@/configs/utils/setting";

const MOrderForm: FC = memo(() => {
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [clientOrder] = useAtom(atOrderWithClient);
    const [uniData] = useAtom(atSUData);

    const {
        control,
        formState: { errors },
        getValues,
        register,
        reset,
        setValue,
        trigger,
        watch,
    } = useForm<TorderForm>({
        resolver: zodResolver(orderFormSchema),
        defaultValues: clientOrder,
    });

    const { fields, append, remove, swap } = useFieldArray({
        name: "order_services",
        control,
    });

    useEffect(() => {
        if (clientOrder && uniData?.services) {
            const { status, q_deposit, q_valid, q_date, order_services, note } =
                clientOrder;
            reset({
                // quote
                status: status.toLowerCase() ?? ORDER_STATUS[0], // pending
                q_deposit: q_deposit ?? 0,
                q_valid: q_valid ?? 15,
                q_date: q_date ?? new Date().toISOString().slice(0, 10),
                // note
                note: note,
                // services list
                // notice this is the major operation for fields to read data
                // from the order_services field
                order_services: order_services ?? undefined,
            });
        }
    }, [clientOrder, reset, uniData, t]);

    const onClose = () => {
        setModalOpen(mOpenOps.default);
        reset();
    };

    return (
        <MTemplate
            open={!!(modalOpen === mOpenOps.edit || modalOpen === mOpenOps.add)}
            onClose={onClose}
            title={
                !clientOrder.oid
                    ? t("modal.title.addOrder")
                    : t("modal.title.editOrder") + ` #${clientOrder.oid}`
            }
            mode={"full"}
            mQuit={true}
            noX={true}
            noTitle={true}
            className="overflow-y-hidden"
        >
            <FormContent
                register={register}
                control={control}
                errors={errors}
                getValues={getValues}
                setValue={setValue}
                watch={watch}
                fields={fields}
                trigger={trigger}
                append={append}
                remove={remove}
                swap={swap}
                onClose={onClose}
            />
        </MTemplate>
    );
});

export default MOrderForm;
