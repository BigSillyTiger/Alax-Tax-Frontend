import { memo } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { MTemplate } from "@/components/modal";
import { useSubmit } from "react-router-dom";
import { useAtom } from "jotai";
import Card from "@/components/card";
import { DelBtn } from "@/components/form";
import { atModalOpen, atWorkLogTableRow } from "@/configs/atoms";
import { mOpenOps } from "@/configs/utils.ts";
import Fieldset from "@/components/form/fieldset";
import { calWorkTime } from "@/utils/utils";

const MWorkLogDel: FC = memo(() => {
    const submit = useSubmit();
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [worklog] = useAtom(atWorkLogTableRow);

    const onClose = () => {
        setModalOpen(mOpenOps.default);
    };

    const handleDelWorkLog = async (wlid: string) => {
        submit({ wlid }, { method: "DELETE", action: "/worklogs" });
    };

    const worklogContent = (
        <Card className="mt-2">
            <div className="m-3 grid grid-cols-6 gap-x-3 text-left">
                <div className="col-span-full">
                    <p>
                        <b className="text-indigo-600">{t("label.staff")}: </b>
                        {worklog.first_name +
                            " " +
                            worklog.last_name +
                            " - " +
                            worklog.fk_uid}
                    </p>
                </div>
                <div className="col-span-full">
                    <p>
                        <b className="text-indigo-600">{t("label.addr")}: </b>{" "}
                        {worklog.address +
                            ", " +
                            worklog.suburb +
                            ", " +
                            worklog.city +
                            ", " +
                            worklog.state +
                            ", " +
                            worklog.postcode}
                    </p>
                </div>
                <Fieldset
                    title={t("label.timeInfo")}
                    sFieldset="col-span-full mt-3 p-3 grid grid-cols-2 gap-x-3 gap-y-2"
                >
                    <div className="col-span-full">
                        <p>
                            <b className="text-indigo-600">
                                {t("label.date")}:{" "}
                            </b>{" "}
                            {worklog.wl_date}
                        </p>
                    </div>
                    <div className="col-span-1">
                        <p>
                            <b className="text-indigo-600">
                                {t("label.timeStart")}:{" "}
                            </b>{" "}
                            {worklog.s_time}
                        </p>
                    </div>
                    <div className="col-span-1">
                        <p>
                            <b className="text-indigo-600">
                                {t("label.timeEnd")}:{" "}
                            </b>{" "}
                            {worklog.e_time}
                        </p>
                    </div>
                    <div className="col-span-1">
                        <p>
                            <b className="text-indigo-600">
                                {t("label.timeBreak")}:{" "}
                            </b>{" "}
                            {worklog.b_hour}
                        </p>
                    </div>
                    <div className="col-span-1">
                        <p>
                            <b className="text-indigo-600">
                                {t("label.workTime")}:{" "}
                            </b>{" "}
                            {calWorkTime(
                                worklog.s_time,
                                worklog.e_time,
                                worklog.b_hour
                            )}
                        </p>
                    </div>
                </Fieldset>
            </div>
        </Card>
    );

    const mainContent = (
        <>
            <div className="mt-2">
                <p className="text-gray-700 text-lg">{t("modal.tips.delWL")}</p>
                {worklogContent}
            </div>
            <DelBtn
                onClick={() => {
                    handleDelWorkLog(worklog.wlid);
                    onClose();
                }}
                onClose={onClose}
            />
        </>
    );

    return (
        <MTemplate
            open={!!(modalOpen === mOpenOps.del)}
            onClose={onClose}
            title={t("modal.title.delete")}
            isMajor={true}
            mode={"md"}
            mQuit={false}
        >
            {mainContent}
        </MTemplate>
    );
});

export default MWorkLogDel;
