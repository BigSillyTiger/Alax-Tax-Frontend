import type { FC } from "react";
import { Suspense, useEffect } from "react";
import { Await, useActionData, useLoaderData } from "react-router-dom";
import SpinningEle from "@/components/loadingEle/SpinningEle";
import { TwlTableRow } from "@/configs/schema/workSchema";
import MTimeTracker from "@/pageComponents/modals/mTimeTracker";
import { RES_STATUS } from "@/configs/types";
import { atModalOpen } from "@/configs/atoms";
import { useAtom } from "jotai";
import { mOpenOps } from "@/configs/utils/modal";
import { toastError, toastSuccess } from "@/lib/toaster";
import { useTranslation } from "react-i18next";
import { dateFormat, hmsTohm } from "@/lib/time";
import ErrorTips from "@/components/ErrorTips";
import MainContent from "./MainContent";

const Dashboard: FC = () => {
    const [t] = useTranslation();
    const actionData = useActionData() as Tresponse;
    const { allPromise } = useLoaderData() as {
        allPromise: Promise<[Tresponse]>;
    };
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);

    useEffect(() => {
        if (!actionData) return;

        const { status } = actionData;
        switch (status) {
            case RES_STATUS.SUC_UPDATE_WORKLOG:
                if (modalOpen === mOpenOps.edit) {
                    setModalOpen(mOpenOps.default);
                    toastSuccess(t("toastS.updateWL"));
                }
                break;
            case RES_STATUS.FAILED_UPDATE_WORKLOG:
                if (modalOpen === mOpenOps.edit) {
                    setModalOpen(mOpenOps.default);
                    toastError(t("toastF.updateWL"));
                }
                break;
            default:
                break;
        }

        actionData.status = RES_STATUS.DEFAULT;
    }, [actionData, modalOpen, setModalOpen, t]);

    return (
        <div className="mx-2 px-0">
            <Suspense fallback={<SpinningEle />}>
                <Await resolve={allPromise} errorElement={<ErrorTips />}>
                    {(result) => {
                        const [todayWLs] = result;
                        const today = !todayWLs.data
                            ? []
                            : todayWLs.data.map((wl: TwlTableRow) => {
                                  return {
                                      ...wl,
                                      // convert the date format stored in mysql: yyyy-mm-dd to au: dd-mm-yyyy
                                      // this format is related to date searching in the table
                                      wl_date: dateFormat(wl.wl_date, "au"),
                                      s_time: hmsTohm(wl.s_time as string),
                                      e_time: hmsTohm(wl.e_time as string),
                                      b_time: hmsTohm(wl.b_time as string),
                                      b_hour: hmsTohm(wl.b_hour as string),
                                  };
                              });
                        return <MainContent todayWLs={today} />;
                    }}
                </Await>
            </Suspense>

            {/* modals */}
            <MTimeTracker />
        </div>
    );
};

export default Dashboard;
