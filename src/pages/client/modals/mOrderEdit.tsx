import React, { Fragment, useEffect } from "react";
import type {
    FC,
    FormEvent,
    MouseEvent,
    TouchEvent,
    ChangeEvent,
    ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Card from "@/components/card";
import {
    TorderWithDesc,
    orderWithDescSchema,
} from "@/utils/schema/orderSchema";
import ModalFrame from "@/components/modal";

type Tprops = {
    order: TorderWithDesc;
    setOpen: (order: TorderWithDesc) => void;
};

const MOrderEdit: FC<Tprops> = ({ order, setOpen }) => {
    const submit = useSubmit();
    const { t } = useTranslation();

    const {
        register,
        trigger,
        reset,
        getValues,
        formState: { errors },
        control,
        handleSubmit,
    } = useForm<TorderWithDesc>({
        resolver: zodResolver(orderWithDescSchema),
        //defaultValues: { order_desc: [initOrderDesc] },
    });

    const { fields, append, remove } = useFieldArray({
        name: "order_desc",
        control,
    });

    useEffect(() => {
        if (order) {
            reset({
                order_address: order.order_address ?? undefined,
                order_suburb: order.order_suburb ?? undefined,
                order_city: order.order_city ?? undefined,
                order_state: order.order_state ?? undefined,
                order_country: order.order_country ?? undefined,
                order_pc: order.order_pc ?? undefined,
                order_desc: order.order_desc ?? undefined,
            });
        }
    }, [order, reset]);

    const onClose = () => {
        setOpen({ ...order, fk_client_id: 0 });
        reset();
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const isValid = await trigger();
        if (isValid) {
            const values = JSON.stringify({
                ...getValues(),
                client_id: order.fk_client_id,
            });
            submit(
                { values },
                {
                    // this action need to be modified
                    action: `/clients/${order.fk_client_id}`,
                    method: "POST",
                }
            );
        }
    };

    const mainContent = <></>;

    return (
        <ModalFrame
            open={!!open}
            onClose={onClose}
            title={t("modal.title.editOrder")}
        >
            {mainContent}
        </ModalFrame>
    );
};

export default MOrderEdit;
