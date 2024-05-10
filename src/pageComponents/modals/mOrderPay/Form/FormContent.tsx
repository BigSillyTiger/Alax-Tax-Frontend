import type { FC, FormEvent } from "react";
import { useSubmit, Form } from "react-router-dom";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import {
    FieldArrayWithId,
    UseFieldArrayPrepend,
    UseFieldArrayRemove,
    UseFormReturn,
} from "react-hook-form";
import { TorderPayment } from "@/configs/schema/orderSchema";
import { toastError } from "@/lib/toaster";
import { atOrder } from "@/configs/atoms";
import { useAtom } from "jotai";
import { useRouterStore } from "@/configs/zustore";
import { genAction } from "@/lib/literals";

type Tpayment = {
    payments: TorderPayment[];
};

type Tprops = {
    fields: FieldArrayWithId<Tpayment>[];
    getValues: UseFormReturn<Tpayment>["getValues"];
    prepend: UseFieldArrayPrepend<Tpayment>;
    register: UseFormReturn<Tpayment>["register"];
    trigger: UseFormReturn<Tpayment>["trigger"];
    remove: UseFieldArrayRemove;
    onClose: () => void;
    totalPaid: number;
};

const FormContent: FC<Tprops> = ({
    getValues,
    fields,
    prepend,
    register,
    remove,
    trigger,
    onClose,
    totalPaid,
}) => {
    const submit = useSubmit();
    const [clientOrder] = useAtom(atOrder);
    const currentRouter = useRouterStore((state) => state.currentRouter);

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

    return (
        <Form
            onSubmit={onSubmit}
            className={`grid grid-cols-1 lg:grid-cols-8 gap-y-3 gap-x-4 overflow-y-auto h-[77dvh] lg:h-auto`}
        >
            <LeftColumn
                totalPaid={totalPaid}
                fields={fields}
                register={register}
                remove={remove}
            />
            <RightColumn
                totalPaid={totalPaid}
                trigger={trigger}
                prepend={prepend}
                onClose={onClose}
            />
        </Form>
    );
};

export default FormContent;
