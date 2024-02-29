import UserIcon from "@/components/UserIcon";
import { Amail, Atel } from "@/components/aLinks";
import Card from "@/components/card";
import { TassignedWork } from "@/configs/schema/workSchema";
import { useTranslation } from "react-i18next";

type Tprops<T extends TassignedWork> = {
    item: T;
};

const WorkLogCard = <T extends TassignedWork>({ item }: Tprops<T>) => {
    const { t } = useTranslation();
    return (
        /* self-11 content-8 */
        <Card className="col-span-11 mt-3 grid grid-cols-1 gap-x-4 sm:grid-cols-8 bg-indigo-50 py-2">
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
                <div className="col-span-2 row-span-1">
                    <label htmlFor="s_time">{t("label.timeEnd")}</label>
                    <input
                        id="s_time"
                        type="time"
                        className="text-bold text-indigo-500"
                    >
                        {item.s_time}
                    </input>
                </div>
                <div className="col-span-3 row-span-1">
                    <label htmlFor="e_time">{t("label.timeStart")}</label>
                    <input
                        id="e_time"
                        type="time"
                        className="text-bold text-indigo-500"
                    >
                        {item.e_time}
                    </input>
                </div>
                <div className="col-span-3 row-span-1">
                    <label htmlFor="b_time">{t("label.break")}</label>
                    <span className="text-bold text-indigo-500">
                        {item.b_time}
                    </span>
                </div>
                <div className="col-span-full">
                    <label htmlFor="wl_note">{t("label.workNote")}</label>
                    <textarea id="wl_note">{item.wl_note}</textarea>
                </div>
            </div>
        </Card>
    );
};

export default WorkLogCard;
