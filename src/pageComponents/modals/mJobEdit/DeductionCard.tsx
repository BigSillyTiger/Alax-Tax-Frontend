import type { ComponentPropsWithoutRef, FC } from "react";
import Card from "@/components/card";
import { useTranslation } from "react-i18next";
import { useWorklogStore } from "@/configs/zustore/worklogStore";
import { XBtn } from "@/components/btns";
import { Button } from "@/components/ui/button";

type Tprops = ComponentPropsWithoutRef<"div">;

const DeductionCard: FC<Tprops> = ({ className }) => {
    const [t] = useTranslation();
    const deduction = useWorklogStore((state) => state.deduction);
    const removeDeduction = useWorklogStore((state) => state.removeDeduction);
    const appendDeduction = useWorklogStore((state) => state.appendDeduction);
    const setDeductionAmount = useWorklogStore(
        (state) => state.setDeductionAmount
    );
    const setDeductionNote = useWorklogStore((state) => state.setDeductionNote);

    const handleAddDeduction = () => {
        appendDeduction({ amount: 0, note: "" });
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
                                setDeductionAmount(i, parseInt(e.target.value))
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
                    className={`max-h-[25dvh] m-3 flex flex-col pl-1 pr-3 pb-3 gap-x-6 gap-y-2 overflow-y-auto ${className}`}
                >
                    {deductionList}
                </Card>
            ) : (
                <Card className="text-center mt-2">
                    {t("tips.noDeduction")}
                </Card>
            )}

            <AddBtn />
        </>
    );
};

export default DeductionCard;
