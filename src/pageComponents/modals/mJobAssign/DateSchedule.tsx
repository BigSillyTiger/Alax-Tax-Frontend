import type { FC } from "react";
import { DateBtn } from "@/components/btns";
import Card from "@/components/card";
import Fieldset from "@/components/Fieldset";
import { useTranslation } from "react-i18next";
import { JADayPicker } from "@/pageComponents/DayPicker";
import "react-day-picker/dist/style.css";
import { useJobAssignStore } from "@/configs/zustore";
import { dateFormat } from "@/lib/time";
import { sortWorkLogs } from "@/lib/literals";
import { toastWarning } from "@/lib/toaster";
import { WL_DELETABLE_STATUS } from "@/configs/utils/setting";
import { useScreenSize } from "@/lib/hooks";

const DateSchedule: FC = () => {
    const { t } = useTranslation();
    const selectedDate = useJobAssignStore((state) => state.selectedDate);
    const setDate = useJobAssignStore((state) => state.setDate);
    const currentWLUnion = useJobAssignStore((state) => state.currentWLUnion);
    const setWorkLogs = useJobAssignStore((state) => state.setWorkLogs);
    const isTooSmallScreen = useScreenSize();

    // remove work log from the current work log list
    // should only be deletable when all the work log status is pending or cancelled
    const handleDelete = (indexToRemove: number) => {
        if (
            currentWLUnion[indexToRemove].assigned_work.some(
                (item) => !WL_DELETABLE_STATUS.includes(item.wl_status)
            )
        ) {
            toastWarning(t("toastW.cantDelWLUnion"));
            return;
        }
        setWorkLogs(
            currentWLUnion.filter((_, index) => index !== indexToRemove)
        );
    };

    const InputDatePicker = () => {
        return (
            <input
                type="date"
                onChange={(e) => setDate(new Date(e.target.value))}
                value={selectedDate?.toDateString()}
                placeholder="DD/MM/YYYY" // Placeholder text
            />
        );
    };

    return (
        <Fieldset
            title={
                <>
                    {t("label.today") + ": "}
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
            <div className="col-span-full md:col-span-5 lg:col-span-full xl:col-span-5">
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
                <Card className="flex justify-center h-auto w-auto">
                    {isTooSmallScreen ? <InputDatePicker /> : <JADayPicker />}
                </Card>
            </div>

            {/* assigned dates area */}
            <div className="col-span-full md:col-span-3 lg:col-span-full xl:col-span-3">
                <div className="font-semibold text-indigo-500 text-bold my-2 ml-2">
                    {t("modal.tips.scheduledWork")}
                </div>
                <Card
                    className={`overflow-y-auto flex flex-col justify-stretch max-h-[40dvh]`}
                >
                    {sortWorkLogs("dsc", currentWLUnion).map((item, index) => {
                        return (
                            <div key={index} className="my-1 w-full flex">
                                <DateBtn
                                    name={dateFormat(item.wl_date, "au")}
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
