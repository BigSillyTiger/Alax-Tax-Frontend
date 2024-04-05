import type { FC } from "react";
import { useState } from "react";
import Card from "@/components/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { usePayslipStore } from "@/configs/zustore";
import { XBtn } from "@/components/btns";

const Deduction: FC = () => {
    const [t] = useTranslation();
    const dedcution = usePayslipStore((state) => state.dedcution);
    const removeDeduction = usePayslipStore((state) => state.removeDeduction);
    const appendDeduction = usePayslipStore((state) => state.appendDeduction);
    const setDeductionAmount = usePayslipStore(
        (state) => state.setDeductionAmount
    );
    const setDeductionNote = usePayslipStore((state) => state.setDeductionNote);
    const [amount, setAmount] = useState<number>(0);
    const [note, setNote] = useState("");
    let timeoutID: NodeJS.Timeout | null = null;

    const handleAddDeduction = () => {
        appendDeduction({ amount: 0, note: "" });
    };

    const AddBtn = () => {
        return (
            <section className="w-full flex justify-center mt-2">
                <Button
                    className="bg-indigo-600 text-slate-50 text-xl hover:bg-slate-50 hover:text-indigo-600 border-2 border-indigo-700"
                    onClick={handleAddDeduction}
                >
                    {t("btn.addNewDeduction")}
                </Button>
            </section>
        );
    };

    const deductionList = dedcution.map((d, i) => {
        return (
            <section
                key={i}
                className="col-span-full grid grid-cols-10 gap-x-2 gap-y-2 "
            >
                {/* x btn */}
                <section className="col-span-1 m-auto">
                    <XBtn
                        onClick={() => {
                            removeDeduction(i);
                        }}
                    />
                </section>
                <Card className="col-span-9 grid grid-cols-6 gap-x-4">
                    <section className="col-span-2">
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
                            defaultValue={d.amount}
                            onChange={(e) => {
                                setAmount(parseInt(e.target.value));
                                timeoutID && clearTimeout(timeoutID);
                                timeoutID = setTimeout(() => {
                                    setDeductionAmount(
                                        i,
                                        parseInt(e.target.value)
                                    );
                                }, 1500);
                            }}
                            onBlur={() => {
                                if (timeoutID) {
                                    clearTimeout(timeoutID);
                                    setDeductionAmount(i, amount);
                                }
                            }}
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                    </section>
                    <section className="col-span-4">
                        <label
                            htmlFor="note"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            {t("label.note")}
                        </label>
                        <textarea
                            id="note"
                            rows={1}
                            defaultValue={d?.note ? d.note : ""}
                            onChange={(e) => {
                                setNote(e.target.value);
                                timeoutID && clearTimeout(timeoutID);
                                timeoutID = setTimeout(() => {
                                    setDeductionNote(i, e.target.value);
                                }, 1500);
                            }}
                            onBlur={() => {
                                if (timeoutID) {
                                    clearTimeout(timeoutID);
                                    setDeductionNote(i, note);
                                }
                            }}
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                    </section>
                </Card>
            </section>
        );
    });

    return (
        <>
            {deductionList.length ? (
                <Card className="max-h-[40dvh] overflow-y-auto flex flex-col gap-y-3">
                    {deductionList}
                </Card>
            ) : null}
            <AddBtn />
        </>
    );
};

export default Deduction;
