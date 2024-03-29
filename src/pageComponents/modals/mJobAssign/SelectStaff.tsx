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
import { assignedWorkSchema } from "@/configs/schema/workSchema";
import { dateFormatISO } from "@/utils/utils";
import { toastWarning } from "@/utils/toaster";

const SelectStaff: FC = () => {
    const { t } = useTranslation();
    const allStaff: (Tstaff & { selected: boolean })[] = useJobAssignStore(
        (state) => state.allStaff
    );
    // jotai atoms
    const [atomAllStaff] = useAtom(atAllStaff);
    const [clientOrder] = useAtom(atOrder);
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
            sFieldset="col-span-full my-2 mx-1 h-[28vh] px-2 gap-x-2 gap-y-3 flex flex-wrap justify-start content-start overflow-y-auto"
        >
            {allStaff.length ? (
                allStaff.map((staff) => {
                    return (
                        <CheckBox
                            key={staff.uid}
                            onClick={(e) => {
                                // this if will not be triggered for now
                                // the selectedDate defined in daypicker is required
                                if (!selectedDate) {
                                    toastWarning(t("toastW.selectDate"));
                                    e.preventDefault();
                                    return;
                                }
                            }}
                            onChange={(e) => {
                                if (!selectedDate) return;
                                const date = selectedDate
                                    ? dateFormatISO(selectedDate)
                                    : "";
                                const newWork = assignedWorkSchema.parse({
                                    fk_oid: clientOrder.oid
                                        ? clientOrder.oid
                                        : "",
                                    fk_uid: staff.uid,
                                    wl_date: selectedDate
                                        ? dateFormatISO(selectedDate)
                                        : "",
                                    first_name: staff.first_name,
                                    last_name: staff.last_name,
                                    phone: staff.phone,
                                    email: staff.email,
                                    role: staff.role,
                                });

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
