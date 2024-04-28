import { TwlTableRow } from "@/configs/schema/workSchema";
import { useEffect, type FC } from "react";
import DutyCard from "./DutyCard";
import { useTodayWLStore } from "@/configs/zustore/todayWLStore";
import { useAsyncValue } from "react-router-dom";
import { dateFormat, hmsTohm } from "@/lib/time";
import ChartCard from "./OrderChart/ChartCard";
import { TctPayment } from "@/configs/types";
import { useAdminStore, useCtPaymentStore } from "@/configs/zustore";
import { TorderArrangement } from "@/configs/schema/orderSchema";
import OrderArrangement from "./OrderArrangement";
import { useOrderArrangementStore } from "@/configs/zustore/orderArrangeStore";
import { ROLES } from "@/configs/utils/staff";

const MainContent: FC = () => {
    const [todayWls, ctPayment, orderAllArrangement] = useAsyncValue() as [
        TwlTableRow[],
        {
            allYears: string[];
            paymentAll: TctPayment;
            orderAll: TctPayment;
            unpaidAll: TctPayment;
        },
        TorderArrangement[],
    ];

    const setCtPaymentAll = useCtPaymentStore((state) => state.setPamentAll);
    const setOrderall = useCtPaymentStore((state) => state.setOrderall);
    const setUnpaidAll = useCtPaymentStore((state) => state.setUnpaidAll);
    const setYearAll = useCtPaymentStore((state) => state.setYearAll);
    const setTodayWorklogs = useTodayWLStore((state) => state.setWorklogs);
    const setOrderArrangement = useOrderArrangementStore(
        (state) => state.setOrderArrangement
    );
    const currentAdmin = useAdminStore((state) => state.currentAdmin);

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

    useEffect(() => {
        // set for today duty
        setTodayWorklogs(newTodayWLs);
        // set for order chart
        setCtPaymentAll(ctPayment.paymentAll);
        setOrderall(ctPayment.orderAll);
        setUnpaidAll(ctPayment.unpaidAll);
        setYearAll(ctPayment.allYears);
        // set for order arrangement card
        setOrderArrangement(orderAllArrangement);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newTodayWLs]);

    return (
        <div className="flex flex-col gap-4">
            <div className="h-screen lg:h-[45dvh] flex flex-col md:flex-row px-2 gap-4">
                <DutyCard
                    worklogs={newTodayWLs}
                    className={
                        "h-[100dvh] lg:h-[45dvh] md:w-full lg:w-[40dvw] xl:w-[30dvw]"
                    }
                />

                <OrderArrangement className="h-[100dvh] lg:h-[45dvh] md:w-full lg:w-[45vw]" />
            </div>
            {currentAdmin.role === ROLES.manager && (
                <div className="px-2">
                    <ChartCard />
                </div>
            )}
        </div>
    );
};

export default MainContent;
