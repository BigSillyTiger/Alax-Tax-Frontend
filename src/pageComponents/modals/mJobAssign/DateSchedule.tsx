import { DateBtn } from "@/components/btns";
import Card from "@/components/card";
import Fieldset from "@/components/form/fieldset";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDoubleRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import DatePicker from "@/components/DatePicker";
import "react-day-picker/dist/style.css";
import { FieldArrayWithId, UseFieldArrayRemove } from "react-hook-form";
import { TformWorkLogs, TworkLog } from "@/configs/schema/workSchema";
import { atSelectedDate } from "@/configs/atoms/atScheduleDate";
import { useAtom } from "jotai";
import { atWorkLogs } from "@/configs/atoms";

type Tprops = {
    fields: FieldArrayWithId<
        {
            work_logs: TworkLog[];
        },
        "work_logs",
        "id"
    >[];
    appendWorkLog: (data: TformWorkLogs) => void;
    remove: UseFieldArrayRemove;
};

const DateSchedule: FC<Tprops> = ({ fields, appendWorkLog, remove }) => {
    const { t } = useTranslation();
    const [selectedDate] = useAtom(atSelectedDate);
    const [workLogs, setWorkLogs] = useAtom(atWorkLogs);

    console.log("--> test 2 worklogs: ", workLogs);

    return (
        <Fieldset
            title={
                <>
                    {t("label.date") + ": "}
                    <span className="text-green-600">
                        {new Date().toDateString()}
                    </span>
                </>
            }
            sFieldset={`m-3 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8 my-2 mx-1 text-sm p-4`}
            sLegend={`text-lg`}
        >
            {/* date picker area */}
            <div className="col-span-full sm:col-span-4">
                <div className="font-semibold text-indigo-500 text-bold mb-2">
                    {selectedDate != undefined ? (
                        <>
                            {t("modal.tips.selectedDate")}
                            <span className="text-black">
                                {selectedDate.toDateString()}
                            </span>
                        </>
                    ) : (
                        t("modal.tips.noDateSelected")
                    )}
                </div>
                <Card className=" flex justify-center lg:h-[35vh]">
                    <DatePicker />
                </Card>
            </div>
            {/* add btn */}
            <button
                className="col-span-full sm:col-span-1 inline-flex w-full justify-center rounded-md bg-indigo-200 my-auto text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:w-auto"
                onClick={(e) => {
                    e.preventDefault();
                    console.log("--> click add date");
                }}
            >
                <span className="sr-only">{t("btn.addDate")}</span>
                <ChevronDoubleRightIcon />
            </button>
            {/* assigned dates area */}
            <div className="col-span-full sm:col-span-3 ">
                <div className="font-semibold text-indigo-500 text-bold mb-2">
                    {t("modal.tips.scheduledWork")}
                </div>
                <Card className="lg:h-[35vh] overflow-y-auto flex flex-col justify-stretch">
                    {fields.map((field, index) => {
                        return (
                            <div key={field.id} className="my-1">
                                <DateBtn
                                    name={field.wl_date}
                                    onClick={(e) => {
                                        e.preventDefault();
                                    }}
                                    className="grow"
                                />
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-red-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto mx-2"
                                    onClick={() => remove(index)}
                                >
                                    <span className="sr-only">
                                        {t("btn.close")}
                                    </span>
                                    <XMarkIcon
                                        className="h-4 w-3"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        );
                    })}
                </Card>
            </div>
        </Fieldset>
    );
};

export default DateSchedule;
