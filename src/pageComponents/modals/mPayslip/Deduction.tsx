import type { FC } from "react";
import Card from "@/components/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { usePayslipStore } from "@/configs/zustore";
import { XBtn } from "@/components/btns";

const Deduction: FC = () => {
    const [t] = useTranslation();
    const dedcution = usePayslipStore((state) => state.deduction);
    const removeDeduction = usePayslipStore((state) => state.removeDeduction);
    const appendDeduction = usePayslipStore((state) => state.appendDeduction);
    const setDeductionAmount = usePayslipStore(
        (state) => state.setDeductionAmount
    );
    const setDeductionNote = usePayslipStore((state) => state.setDeductionNote);
    let timeoutAID: NodeJS.Timeout | null = null;
    let timeoutNID: NodeJS.Timeout | null = null;

    const handleAddDeduction = () => {
        appendDeduction({ amount: 0, note: "" });
    };

    const AddBtn = () => {
        return (
            <div className="w-full flex justify-center mt-2">
                <Button
                    className="bg-red-400 text-slate-50 text-xl hover:bg-slate-50 hover:text-red-500 border-2 border-red-600"
                    onClick={handleAddDeduction}
                >
                    {t("btn.addNewDeduction")}
                </Button>
            </div>
        );
    };

    const deductionList = dedcution.map((d, i) => {
        return (
            <div
                key={i}
                className="col-span-full grid grid-cols-10 gap-x-2 gap-y-2 "
            >
                {/* x btn */}
                <div className="col-span-1 m-auto">
                    <XBtn
                        onClick={() => {
                            removeDeduction(i);
                        }}
                    />
                </div>
                <Card className="col-span-9 grid grid-cols-6 gap-x-4">
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
                            defaultValue={d.amount}
                            onChange={(e) => {
                                timeoutAID && clearTimeout(timeoutAID);
                                timeoutAID = setTimeout(() => {
                                    setDeductionAmount(
                                        i,
                                        parseInt(e.target.value)
                                    );
                                }, 1500);
                            }}
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
                            defaultValue={d?.note ? d.note : ""}
                            onChange={(e) => {
                                timeoutNID && clearTimeout(timeoutNID);
                                timeoutNID = setTimeout(() => {
                                    setDeductionNote(i, e.target.value);
                                }, 1500);
                            }}
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
                <Card className="max-h-[40dvh] overflow-y-auto flex flex-col gap-y-3">
                    {deductionList}
                </Card>
            ) : null}
            <AddBtn />
        </>
    );
};

export default Deduction;
