import type { FC } from "react";
import Card from "@/components/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { usePayslipStore } from "@/configs/zustore";
import { XBtn } from "@/components/btns";

const Bonus: FC = () => {
    const [t] = useTranslation();
    const bonus = usePayslipStore((state) => state.bonus);
    const removeBonus = usePayslipStore((state) => state.removeBonus);
    const appendBonus = usePayslipStore((state) => state.appendBonus);
    const setBonusAmount = usePayslipStore((state) => state.setBonusAmount);
    const setBonusNote = usePayslipStore((state) => state.setBonusNote);
    let timeoutAID: NodeJS.Timeout | null = null;
    let timeoutNID: NodeJS.Timeout | null = null;

    const handleAddBonus = () => {
        appendBonus({ amount: 0, note: "" });
    };

    const AddBtn = () => {
        return (
            <div className="w-full flex justify-center mt-2">
                <Button
                    className="bg-indigo-600 text-slate-50 text-xl hover:bg-slate-50 hover:text-indigo-600 border-2 border-indigo-700"
                    onClick={handleAddBonus}
                >
                    {t("btn.addNewBonus")}
                </Button>
            </div>
        );
    };

    const bonusList = bonus.map((b, i) => {
        return (
            <div
                key={i}
                className="col-span-full grid grid-cols-10 gap-x-2 gap-y-2 "
            >
                {/* x btn */}
                <div className="col-span-1 m-auto">
                    <XBtn
                        onClick={() => {
                            removeBonus(i);
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
                            defaultValue={b.amount}
                            onChange={(e) => {
                                timeoutAID && clearTimeout(timeoutAID);
                                timeoutAID = setTimeout(() => {
                                    setBonusAmount(
                                        i,
                                        parseFloat(
                                            parseFloat(e.target.value).toFixed(
                                                2
                                            )
                                        )
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
                            defaultValue={b?.note ? b.note : ""}
                            onChange={(e) => {
                                timeoutNID && clearTimeout(timeoutNID);
                                timeoutNID = setTimeout(() => {
                                    setBonusNote(i, e.target.value);
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
            {bonusList.length ? (
                <Card className="max-h-[40dvh] overflow-y-auto flex flex-col gap-y-3">
                    {bonusList}
                </Card>
            ) : null}
            <AddBtn />
        </>
    );
};

export default Bonus;
