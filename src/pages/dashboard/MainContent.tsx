import { TwlTableRow } from "@/configs/schema/workSchema";
import { useEffect, type FC } from "react";
import DutyCard from "./DutyCard";
import { useTodayWLStore } from "@/configs/zustore/todayWLStore";
import { useAsyncValue } from "react-router-dom";
import { dateFormat, hmsTohm } from "@/lib/time";
import ChartCard from "./OrderChart/ChartCard";
import { TctPayment } from "@/configs/types";
import { useCtPaymentStore } from "@/configs/zustore";

const MainContent: FC = () => {
    const [todayWls, tomorrowWLs, ctPayment] = useAsyncValue() as [
        TwlTableRow[],
        TwlTableRow[],
        {
            allYears: string[];
            paymentAll: TctPayment;
            orderAll: TctPayment;
            unpaidAll: TctPayment;
        },
    ];
    const setCtPaymentAll = useCtPaymentStore((state) => state.setPamentAll);
    const setOrderall = useCtPaymentStore((state) => state.setOrderall);
    const setUnpaidAll = useCtPaymentStore((state) => state.setUnpaidAll);
    const setYearAll = useCtPaymentStore((state) => state.setYearAll);
    const setTodayWorklogs = useTodayWLStore((state) => state.setWorklogs);

    const newTodayWLs = todayWls.map((wl: TwlTableRow) => {
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

    const newTomorrowWLs = tomorrowWLs.map((wl: TwlTableRow) => {
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

    useEffect(() => {
        setTodayWorklogs(newTodayWLs);
        setCtPaymentAll(ctPayment.paymentAll);
        setOrderall(ctPayment.orderAll);
        setUnpaidAll(ctPayment.unpaidAll);
        setYearAll(ctPayment.allYears);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newTodayWLs]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row px-2 gap-4">
                <div
                    className={`grid grid-cols-1 w-screen h-[40dvh] sm:w-[50vw] sm:h-[50dvh] lg:w-[30vw] lg:h-[50dvh] gap-y-2 overflow-y-auto overflow-x-hidden`}
                >
                    <DutyCard worklogs={newTodayWLs} />
                </div>
                <div
                    className={`grid grid-cols-1 w-screen h-[40dvh] sm:w-[50vw] sm:h-[50dvh] lg:w-[30vw] lg:h-[50dvh] gap-y-2 overflow-y-auto overflow-x-hidden`}
                >
                    <DutyCard worklogs={newTomorrowWLs} type="tomorrow" />
                </div>
            </div>
            <div className="px-2">
                <ChartCard />
            </div>
        </div>
    );
};

export default MainContent;
