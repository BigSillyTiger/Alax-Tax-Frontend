import type { FC } from "react";
import { DateBtn } from "@/components/btns";
import Card from "@/components/card";
import Fieldset from "@/components/form/fieldset";
import { useTranslation } from "react-i18next";
import DatePicker from "@/components/DatePicker";
import "react-day-picker/dist/style.css";
import { useJobAssignStore } from "@/configs/zustore";
import { dateFormatAU, sortWorkLogs } from "@/utils/utils";

const DateSchedule: FC = () => {
    const { t } = useTranslation();
    const selectedDate = useJobAssignStore((state) => state.selectedDate);
    const currentWorkLogs = useJobAssignStore((state) => state.currentWorkLogs);
    const setDate = useJobAssignStore((state) => state.setDate);
    const setWorkLogs = useJobAssignStore((state) => state.setWorkLogs);

    // remove work log from the current work log list
    const handleDelete = (indexToRemove: number) => {
        setWorkLogs(
            currentWorkLogs.filter((_, index) => index !== indexToRemove)
        );
    };

    return (
        <Fieldset
            title={
                <>
                    {t("label.date") + ": "}
                    {/* click today to jump back to today */}
                    <button
                        className="text-green-600"
                        onClick={() => setDate(new Date())}
                    >
                        {new Date().toDateString()}
                    </button>
                </>
            }
            sFieldset={`justify-evenly m-3 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-8 my-2 mx-1 text-sm p-4`}
            sLegend={`text-lg`}
        >
            {/* date picker area */}
            <div className="col-span-full sm:col-span-4">
                <div className="font-semibold text-indigo-500 text-bold my-2 ml-2">
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
                <Card className=" flex justify-center">
                    <DatePicker />
                </Card>
            </div>

            {/* assigned dates area */}
            <div className="col-span-full sm:col-span-4 ">
                <div className="font-semibold text-indigo-500 text-bold my-2 ml-2">
                    {t("modal.tips.scheduledWork")}
                </div>
                <Card className="overflow-y-auto flex flex-col justify-stretch">
                    {sortWorkLogs("dsc", currentWorkLogs).map((item, index) => {
                        return (
                            <div key={index} className="my-1 w-full flex">
                                <DateBtn
                                    name={dateFormatAU(item.wl_date)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setDate(new Date(item.wl_date));
                                    }}
                                    className="grow"
                                    onDelete={() => {
                                        handleDelete(index);
                                    }}
                                />
                            </div>
                        );
                    })}
                </Card>
            </div>
        </Fieldset>
    );
};

export default DateSchedule;
