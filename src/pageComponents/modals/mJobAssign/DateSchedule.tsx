import type { FC } from "react";
import { DateBtn } from "@/components/btns";
import Card from "@/components/Card";
import Fieldset from "@/components/Fieldset";
import { useTranslation } from "react-i18next";
import { JADayPicker } from "@/pageComponents/DayPicker";
import "react-day-picker/dist/style.css";
import { useJobAssignStore } from "@/configs/zustore";
import { dateFormat } from "@/lib/time";
import { sortWorkLogs } from "@/lib/literals";
import { toastWarning } from "@/lib/toaster";
import { WL_DELETABLE_STATUS } from "@/configs/utils/setting";
import { useScreenST } from "@/lib/hooks";

const DateSchedule: FC = () => {
    const { t } = useTranslation();
    const selectedDate = useJobAssignStore((state) => state.selectedDate);
    const setDate = useJobAssignStore((state) => state.setDate);
    const currentWLUnion = useJobAssignStore((state) => state.currentWLUnion);
    const setWorkLogs = useJobAssignStore((state) => state.setWorkLogs);
    const isTooSmallScreen = useScreenST();

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
                    {t("label.scheduleDate") + ": "}
                    {/* click today to jump back to today */}
                    {selectedDate != undefined ? (
                        <span className="text-green-700 font-bold">
                            {selectedDate.toDateString()}
                        </span>
                    ) : (
                        t("modal.tips.noDateSelected")
                    )}
                </>
            }
            sFieldset={`flex flex-col sm:flex-row gap-y-2 lg:justify-center items-center px-2 h-[80dvh] sm:h-[50dvh] overflow-y-hidden overflow-x-hidden`}
        >
            {/* date picker area */}
            <div className="">
                {/* <div className="flex justify-center h-auto w-auto"> */}
                <div>
                    {isTooSmallScreen ? <InputDatePicker /> : <JADayPicker />}
                </div>
            </div>

            {/* assigned dates area */}

            <Card
                className={`h-full w-full mx-1 overflow-y-auto flex flex-col gap-y-2`}
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
        </Fieldset>
    );
};

export default DateSchedule;
