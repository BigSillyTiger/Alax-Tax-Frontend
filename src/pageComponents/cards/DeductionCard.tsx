import type { ComponentPropsWithoutRef, FC, FormEvent } from "react";
import Card from "@/components/card";
import { useTranslation } from "react-i18next";
import { XBtn } from "@/components/btns";
import { useNavigation, Form, useSubmit } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDeductStore, useRouterStore } from "@/configs/zustore";
import { genAction } from "@/lib/literals";
import { useTodayWLStore } from "@/configs/zustore/todayWLStore";

type Tprops = ComponentPropsWithoutRef<"div"> & {
    withSubmitBtn?: boolean;
};

/**
 * @description DeductionCard component
 *              - display deduction card
 *              - add, remove deduction
 *              - this component is used in worklog page / job edit modal
 *              - this component is used in dashboard page / time tracker modal
 *
 * @param param0
 * @returns
 */
const DeductionCard: FC<Tprops> = ({ withSubmitBtn = false, className }) => {
    const [t] = useTranslation();
    const navigation = useNavigation();
    const submit = useSubmit();
    const currentWlid = useTodayWLStore((state) => state.currentWlid);
    const currentRouter = useRouterStore((state) => state.currentRouter);
    const deduction = useDeductStore((state) => state.deduction);
    const removeDeduction = useDeductStore((state) => state.removeDeduction);
    const appendDeduction = useDeductStore((state) => state.appendDeduction);
    const setDeductionAmount = useDeductStore(
        (state) => state.setDeductionAmount
    );
    const setDeductionNote = useDeductStore((state) => state.setDeductionNote);

    const handleAddDeduction = () => {
        appendDeduction({ amount: 0, note: "" });
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        submit(
            {
                wlid: currentWlid,
                deduction: JSON.stringify(deduction),
                req: "wlDeduct",
            },
            { method: "POST", action: genAction(currentRouter) }
        );
    };

    const AddBtn = () => {
        return (
            <div className="w-full flex justify-center mt-2">
                <Button
                    className="bg-indigo-400 text-slate-50 text-xl hover:bg-slate-50 hover:text-indigo-500 border-2 border-indigo-600"
                    onClick={handleAddDeduction}
                >
                    {t("btn.addNewDeduction")}
                </Button>
            </div>
        );
    };

    const SubmitBtn = () => (
        <Form onSubmit={onSubmit} className="flex justify-around gap-x-2 mt-3">
            <Button
                className="bg-indigo-400 text-slate-50 text-xl hover:bg-slate-50 hover:text-indigo-500 border-2 border-indigo-600"
                onClick={handleAddDeduction}
            >
                {t("btn.addNewDeduction")}
            </Button>
            <Button
                name="intent"
                value="add"
                type="submit"
                className="bg-indigo-400 text-slate-50 text-xl hover:bg-slate-50 hover:text-indigo-500 border-2 border-indigo-600"
                disabled={
                    navigation.state === "submitting" ||
                    navigation.state === "loading"
                }
                onClick={() => {}}
            >
                {navigation.state === "submitting"
                    ? t("btn.submitting")
                    : t("btn.submit")}
            </Button>
        </Form>
    );

    const deductionList = deduction.map((d, i) => {
        return (
            <div key={i} className="flex  justify-start gap-x-2 gap-y-2 ">
                {/* x btn */}
                <div className="col-span-1 m-auto grow-0">
                    <XBtn
                        onClick={() => {
                            removeDeduction(i);
                        }}
                    />
                </div>
                <Card className="grid grid-cols-6 gap-x-4 grow-1">
                    <div className="col-span-2">
                        <label
                            htmlFor="amount"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            {t("label.amount")}
                        </label>
                        <input
                            id="amount"
                            type="number"
                            step="0.01"
                            min={0}
                            value={d.amount}
                            onChange={(e) =>
                                setDeductionAmount(
                                    i,
                                    parseFloat(
                                        parseFloat(e.target.value).toFixed(2)
                                    )
                                )
                            }
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                    </div>
                    <div className="col-span-4">
                        <label
                            htmlFor="note"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            {t("label.note")}
                        </label>
                        <textarea
                            id="note"
                            rows={1}
                            value={d?.note ? d.note : ""}
                            onChange={(e) =>
                                setDeductionNote(i, e.target.value)
                            }
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                    </div>
                </Card>
            </div>
        );
    });

    return (
        <>
            {deductionList.length ? (
                <Card
                    className={`max-h-[21dvh] m-3 flex flex-col pl-1 pr-3 pb-3 gap-x-6 gap-y-2 overflow-y-auto ${className}`}
                >
                    {deductionList}
                </Card>
            ) : (
                <Card className="text-center mt-2">
                    {t("tips.noDeduction")}
                </Card>
            )}

            {withSubmitBtn ? <SubmitBtn /> : <AddBtn />}
        </>
    );
};

export default DeductionCard;
