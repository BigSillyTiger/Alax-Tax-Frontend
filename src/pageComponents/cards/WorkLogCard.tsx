import UserIcon from "@/components/UserIcon";
import { Amail, Atel } from "@/components/aLinks";
import Card from "@/components/card";
import Fieldset from "@/components/form/fieldset";
import { TassignedWork } from "@/configs/schema/workSchema";
import { useTranslation } from "react-i18next";

type Tprops<T extends TassignedWork> = {
    item: T;
};

const WorkLogCard = <T extends TassignedWork>({ item }: Tprops<T>) => {
    const { t } = useTranslation();
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
                    sFieldset="p-2 justify-evenly"
                >
                    <div className="col-span-2 row-span-1">
                        <label htmlFor="s_time" className="mx-2">
                            {t("label.start")}
                        </label>
                        <input
                            id="s_time"
                            type="time"
                            step="60"
                            className="text-bold text-indigo-500"
                        />
                    </div>
                    <div className="col-span-3 row-span-1">
                        <label htmlFor="e_time" className="mx-2">
                            {t("label.end")}
                        </label>
                        <input
                            id="e_time"
                            type="time"
                            step="60"
                            className="text-bold text-indigo-500"
                        />
                    </div>
                    <div className="col-span-3 row-span-1">
                        <label htmlFor="b_time" className="mx-2">
                            {t("label.break")}
                        </label>
                        <input className="text-bold text-indigo-500" />
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
