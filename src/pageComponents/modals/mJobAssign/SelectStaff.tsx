import { useEffect } from "react";
import type { FC } from "react";
import CheckBox from "@/components/CheckBox";
import Fieldset from "@/components/form/fieldset";
import { useTranslation } from "react-i18next";
import { useJobAssignStore } from "@/configs/zustore";
import { Tstaff } from "@/configs/schema/staffSchema";
import { isSameDay } from "date-fns";
import { atAllStaff, atOrder } from "@/configs/atoms";
import { useAtom } from "jotai";
import { TassignedWork } from "@/configs/schema/workSchema";
import { dateFormatISO } from "@/utils/utils";

const genWorkLogWithStaff = (
    staff: Tstaff,
    oid: string,
    date: string
): TassignedWork => {
    return {
        wlid: "",
        fk_oid: oid,
        fk_uid: staff.uid,
        wl_date: date,
        s_time: "",
        e_time: "",
        b_time: "",
        wl_status: "ongoing",
        wl_note: "",
        first_name: staff.first_name,
        last_name: staff.last_name,
        phone: staff.phone,
        email: staff.email,
        role: staff.role,
    };
};

const SelectStaff: FC = () => {
    const { t } = useTranslation();
    const allStaff: (Tstaff & { selected: boolean })[] = useJobAssignStore(
        (state) => state.allStaff
    );
    const [atomAllStaff] = useAtom(atAllStaff);
    // jotai atoms
    const clientOrder = useAtom(atOrder);
    // zustand states and actions
    //const selectStaff = useJobAssignStore((state) => state.selectStaff);
    const selectedDate = useJobAssignStore((state) => state.selectedDate);
    const currentWorkLogs = useJobAssignStore((state) => state.currentWorkLogs);
    const setAllStaff = useJobAssignStore((state) => state.setAllStaff);
    const appendAssignedWork = useJobAssignStore(
        (state) => state.appendAssignedWork
    );
    const removeAssignedWork = useJobAssignStore(
        (state) => state.removeAssignedWork
    );

    /* update staff selected status when selected date changed */
    useEffect(() => {
        console.log("-> select staff useEffect: ", currentWorkLogs);
        let newAllStaff;
        const workLog =
            selectedDate &&
            currentWorkLogs.filter((work) => {
                return isSameDay(new Date(work.wl_date), selectedDate);
            });
        if (selectedDate && workLog && workLog.length > 0) {
            newAllStaff = atomAllStaff.map((staff) => {
                return {
                    ...staff,
                    ["selected"]: workLog.some((work) => {
                        return work.assigned_work.some(
                            (log) => log.fk_uid === staff.uid
                        );
                    }),
                };
            });
        } else {
            newAllStaff = atomAllStaff.map((staff) => {
                return { ...staff, ["selected"]: false };
            });
        }
        setAllStaff(newAllStaff);
    }, [selectedDate, currentWorkLogs, atomAllStaff, setAllStaff]);

    return (
        <Fieldset
            title={t("label.selectStaff")}
            sFieldset="col-span-full lg:col-span-5 my-2 mx-1 h-[28vh] px-2 overflow-y-auto gap-x-2 gap-y-3 flex flex-wrap justify-start content-start"
        >
            {allStaff.length ? (
                allStaff.map((staff) => {
                    return (
                        <CheckBox
                            key={staff.uid}
                            onClick={(e) => {
                                if (!selectedDate) return;
                                console.log(
                                    "--> check box onClick, date: ",
                                    selectedDate
                                );
                            }}
                            onChange={(e) => {
                                if (!selectedDate) return;
                                const date = selectedDate
                                    ? dateFormatISO(selectedDate)
                                    : "";
                                const newWork = genWorkLogWithStaff(
                                    staff,
                                    clientOrder[0].oid
                                        ? clientOrder[0].oid
                                        : "",
                                    date
                                );

                                if (e.target.checked) {
                                    appendAssignedWork(newWork, date);
                                } else {
                                    removeAssignedWork(newWork, date);
                                }
                            }}
                            uid={staff.uid}
                            name={staff.first_name + " " + staff.last_name}
                            checked={staff.selected}
                        />
                    );
                })
            ) : (
                <></>
            )}
        </Fieldset>
    );
};

export default SelectStaff;
