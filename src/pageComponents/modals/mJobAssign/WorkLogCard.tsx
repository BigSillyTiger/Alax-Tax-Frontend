import UserIcon from "@/components/UserIcon";
import { Amail, Atel } from "@/components/aLinks";
import Card from "@/components/card";
import Fieldset from "@/components/form/fieldset";
import { Input } from "@/components/ui/input";
import { TassignedWork } from "@/configs/schema/workSchema";
import { useJobAssignStore } from "@/configs/zustore";
import { calWorkTime } from "@/lib/time";
import { useTranslation } from "react-i18next";

type Tprops<T extends TassignedWork> = {
    item: T;
};

const WorkLogCard = <T extends TassignedWork>({ item }: Tprops<T>) => {
    const { t } = useTranslation();
    const currentWorkLogs = useJobAssignStore((state) => state.currentWorkLogs);
    const setWorkLogs = useJobAssignStore((state) => state.setWorkLogs);

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newWL = currentWorkLogs.map((wl) => {
            if (wl.fk_oid === item.fk_oid) {
                return {
                    ...wl,
                    assigned_work: wl.assigned_work.map((aw) => {
                        if (aw.fk_uid === item.fk_uid) {
                            return {
                                ...aw,
                                [e.target.id]: e.target.value,
                            };
                        } else {
                            return aw;
                        }
                    }),
                };
            } else {
                return wl;
            }
        });
        setWorkLogs(newWL);
    };

    return (
        /* self-11 content-8 */
        <Card className="col-span-full mt-3 grid grid-cols-1 gap-x-4 sm:grid-cols-8 bg-indigo-50 py-2">
            {/* 3 col */}
            <div className="col-span-3">
                <div className="col-span-full row-span-2">
                    <UserIcon
                        fName={item.first_name}
                        lName={item.last_name}
                        size="xl"
                    />
                </div>
                <p className="col-span-full row-span-1 text-bold text-indigo-500">
                    {item.first_name + " " + item.last_name}
                </p>
                <p className="col-span-full row-span-1 text-bold text-indigo-500">
                    {item.fk_uid}
                </p>
                <p className="col-span-3 row-span-1 text-bold text-indigo-500">
                    <Atel href={item.phone} />
                </p>
                <p className="col-span-3 row-span-1 text-bold text-indigo-500">
                    <Amail href={item.email} />
                </p>
            </div>
            {/* 5 col */}
            <div className="col-span-5">
                {/* time area */}
                <Fieldset
                    title={t("label.workTime")}
                    sFieldset="p-2 justify-evenly grid grid-cols-4 gap-x-2 gap-y-2"
                >
                    <div className="col-span-2 row-span-1">
                        <label htmlFor="s_time" className="mx-2">
                            {t("label.start")}
                        </label>
                        <Input
                            id="s_time"
                            type="time"
                            step="60"
                            onChange={handleTimeChange}
                            value={item.s_time ? item.s_time : "00:00"}
                            className="text-bold text-indigo-500 text-2xl"
                        />
                    </div>
                    <div className="col-span-2 row-span-1">
                        <label htmlFor="e_time" className="mx-2">
                            {t("label.end")}
                        </label>
                        <Input
                            id="e_time"
                            type="time"
                            step="60"
                            onChange={handleTimeChange}
                            value={item.e_time ? item.e_time : "00:00"}
                            className="text-bold text-indigo-500 text-2xl"
                        />
                    </div>
                    <div className="col-span-2 row-span-1">
                        <label htmlFor="b_hour" className="mx-2">
                            {t("label.break")}
                        </label>
                        <Input
                            id="b_hour"
                            type="time"
                            step="60"
                            value={item.b_hour ? item.b_hour : "00:00"}
                            onChange={handleTimeChange}
                            className="text-bold text-amber-600 text-2xl"
                        />
                    </div>
                    <div className="col-span-2 row-span-1">
                        <label htmlFor="total_time" className="mx-2">
                            {t("label.workTime")}
                        </label>
                        <Input
                            id="total_time"
                            type="time"
                            step="60"
                            readOnly
                            value={calWorkTime(
                                item.s_time,
                                item.e_time,
                                item.b_hour
                            )}
                            className="text-bold text-lime-600 text-2xl"
                        />
                    </div>
                </Fieldset>
                {/* note area */}
                <div className="col-span-full">
                    <label htmlFor="wl_note" className="mx-2">
                        {t("label.workNote")}
                    </label>
                    <textarea id="wl_note" className="w-full" />
                </div>
            </div>
        </Card>
    );
};

export default WorkLogCard;
