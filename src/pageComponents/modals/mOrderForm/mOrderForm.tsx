import type { FC } from "react";
import { useEffect, memo } from "react";
import { useTranslation } from "react-i18next";
import { useForm, useFieldArray } from "react-hook-form";
import { useAtom } from "jotai";
import { zodResolver } from "@hookform/resolvers/zod";
import { TorderForm, orderFormSchema } from "@/configs/schema/orderSchema";
import { MTemplate } from "@/components/modal";
import { atModalOpen, atOrder, atSUData } from "@/configs/atoms";
import { mOpenOps } from "@/configs/utils/modal";
import FormContent from "./Form";

const MOrderForm: FC = memo(() => {
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [clientOrder] = useAtom(atOrder);
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
            const {
                address,
                suburb,
                city,
                state,
                country,
                postcode,
                status,
                deposit,
                order_services,
            } = clientOrder;
            reset({
                address: address ?? undefined,
                suburb: suburb ?? undefined,
                city: city ?? undefined,
                state: state ?? undefined,
                country: country ?? undefined,
                postcode: postcode ?? undefined,
                status: status ?? t("label.pending"),
                deposit: deposit ?? 0,
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
