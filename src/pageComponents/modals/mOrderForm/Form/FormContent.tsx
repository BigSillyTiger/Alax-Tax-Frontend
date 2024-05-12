import { FormEvent, useMemo, type FC } from "react";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import { Form, useSubmit } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { plusAB } from "@/lib/calculations";
import {
    FieldArrayWithId,
    FieldErrors,
    UseFieldArrayAppend,
    UseFieldArrayRemove,
    UseFieldArraySwap,
    UseFormReturn,
    useWatch,
} from "react-hook-form";
import { TorderForm, TorderService } from "@/configs/schema/orderSchema";
import { toastError } from "@/lib/toaster";
import { atOrder } from "@/configs/atoms";
import { useAtom } from "jotai";
import { useRouterStore } from "@/configs/zustore";
import { genAction } from "@/lib/literals";

type Tprops = {
    register: UseFormReturn<TorderForm>["register"];
    setValue: UseFormReturn<TorderForm>["setValue"];
    watch: UseFormReturn<TorderForm>["watch"];
    fields: FieldArrayWithId<TorderService>[];
    trigger: UseFormReturn<TorderForm>["trigger"];
    getValues: UseFormReturn<TorderForm>["getValues"];
    append: UseFieldArrayAppend<TorderForm, "order_services">;
    remove: UseFieldArrayRemove;
    swap: UseFieldArraySwap;
    errors: FieldErrors<TorderForm>;
    control: UseFormReturn<TorderForm>["control"];
    onClose: () => void;
};

const FormContent: FC<Tprops> = ({
    register,
    control,
    errors,
    setValue,
    watch,
    getValues,
    fields,
    trigger,
    append,
    remove,
    swap,
    onClose,
}) => {
    const { t } = useTranslation();

    const submit = useSubmit();
    const currentRouter = useRouterStore((state) => state.currentRouter);

    const [clientOrder] = useAtom(atOrder);

    const values = useWatch({ control, name: "order_services" });

    const calTotal = useMemo(() => {
        let total = 0;
        for (const item of values) {
            total = plusAB(total, item.netto);
            total = plusAB(total, item.gst);
        }
        return total;
    }, [values]);

    const calTotalGst = useMemo(() => {
        let gst = 0;
        for (const item of values) {
            gst = plusAB(gst, item.gst);
        }
        return gst;
    }, [values]);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!fields.length) {
            toastError(t("toastW.addOrderService"));
            return;
        }
        console.log("-> mOrderForm click submit err: ", errors);
        const isValid = await trigger();
        if (isValid) {
            const req = !clientOrder.oid ? "orderCreate" : "orderUpdate";
            const values = JSON.stringify({
                ...getValues(),
                cid: clientOrder.client_info.cid,
                // these 3 the value has be manually calculated or registered
                // therefore, they are not in the form
                // we need to manually add them to the values
                oid: clientOrder.oid,
                gst: calTotalGst,
                total: calTotal,
            });
            const method = !clientOrder.oid ? "POST" : "PUT";
            submit(
                { values, req },
                {
                    // this action need to be modified
                    method,
                    action:
                        currentRouter === "client"
                            ? genAction(currentRouter, clientOrder.fk_cid)
                            : genAction(currentRouter),
                }
            );
        } else {
            toastError(t("toastW.triggerCheckFails"));
            return;
        }
    };

    return (
        <Form
            onSubmit={onSubmit}
            className="grid grid-cols-1 lg:grid-cols-8 gap-y-3 gap-x-4 overflow-y-auto h-[77dvh] lg:h-auto"
        >
            <LeftColumn
                register={register}
                errors={errors}
                calTotalGst={calTotalGst}
                calTotal={calTotal}
            />
            <RightColumn
                register={register}
                setValue={setValue}
                watch={watch}
                fields={fields}
                trigger={trigger}
                append={append}
                remove={remove}
                swap={swap}
                onClose={onClose}
            />
        </Form>
    );
};

export default FormContent;
