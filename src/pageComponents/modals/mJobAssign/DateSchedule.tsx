import { DateBtn } from "@/components/btns";
import Card from "@/components/card";
import Fieldset from "@/components/form/fieldset";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import DatePicker from "@/components/DatePicker";
import "react-day-picker/dist/style.css";
import { useJobAssignStore } from "@/configs/zustore";

type Tprop = {
    appendSchedule: () => void;
};

const DateSchedule: FC<Tprop> = ({ appendSchedule }) => {
    const { t } = useTranslation();
    //const [selectedDate] = useAtom(atSelectedDate);
    const selectedDate = useJobAssignStore((state) => state.selectedDate);
    //const [workLogs, setWorkLogs] = useAtom(atWorkLogs);
    const currentWorkLogs = useJobAssignStore((state) => state.currentWorkLogs);

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
            sFieldset={`justify-evenly m-3 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8 my-2 mx-1 text-sm p-4`}
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
                <Card className=" flex justify-center lg:h-[35vh]">
                    <DatePicker />
                </Card>
            </div>
            {/* append btn */}
            <button
                className="col-span-full sm:col-span-1 inline-flex w-full justify-center rounded-md bg-indigo-200 my-auto text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:w-auto"
                onClick={(e) => {
                    e.preventDefault();
                    appendSchedule();
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
                    {currentWorkLogs.map((item, index) => {
                        return (
                            <div key={index} className="my-1 w-full flex">
                                <DateBtn
                                    name={item.wl_date}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        console.log("-> click date btn");
                                    }}
                                    className="grow"
                                    onDelete={(e) => {
                                        e.preventDefault();
                                        console.log("-> click delete btn");
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
