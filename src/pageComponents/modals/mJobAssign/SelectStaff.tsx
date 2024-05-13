import { useEffect } from "react";
import type { FC } from "react";
import CheckBox from "@/components/CheckBox";
import Fieldset from "@/components/Fieldset";
import { useTranslation } from "react-i18next";
import { useJobAssignStore } from "@/configs/zustore";
import { Tstaff } from "@/configs/schema/staffSchema";
import { isSameDay } from "date-fns";
import { atAllStaff, atOrder } from "@/configs/atoms";
import { useAtom } from "jotai";
import { assignedWorkSchema } from "@/configs/schema/workSchema";
import { dateFormat } from "@/lib/time";
import { toastWarning } from "@/lib/toaster";
import { WL_DELETABLE_STATUS } from "@/configs/utils/setting";

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
    const currentWLUnion = useJobAssignStore((state) => state.currentWLUnion);
    const setAllStaff = useJobAssignStore((state) => state.setAllStaff);
    const appendAssignedWork = useJobAssignStore(
        (state) => state.appendAssignedWork
    );
    const removeAssignedWork = useJobAssignStore(
        (state) => state.removeAssignedWork
    );

    /* update staff selected status when selected date changed */
    useEffect(() => {
        if (!selectedDate || !currentWLUnion) return;

        const workLog = currentWLUnion.filter((work) => {
            return isSameDay(new Date(work.wl_date), selectedDate);
        });

        if (!workLog || workLog.length === 0) {
            setAllStaff(
                atomAllStaff.map((staff) => ({ ...staff, selected: false }))
            );
            return;
        }

        const newAllStaff = atomAllStaff.map((staff) => {
            return {
                ...staff,
                selected: workLog.some((work) => {
                    return work.assigned_work.some(
                        (log) => log.fk_uid === staff.uid
                    );
                }),
            };
        });

        setAllStaff(newAllStaff);
    }, [selectedDate, currentWLUnion, atomAllStaff, setAllStaff]);

    return (
        <Fieldset
            title={t("label.selectStaff")}
            sFieldset={`col-span-full h-[28dvh] gap-x-2 gap-y-3 flex flex-wrap justify-start content-start overflow-y-auto`}
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
                                /* react nothing if no date selected */
                                if (!selectedDate) {
                                    e.preventDefault();
                                    return;
                                }
                                /* toast warning if wl_status of selected staff is un-deletable */
                                // find the work log of selected staff
                                const wl = currentWLUnion
                                    .filter((work) => {
                                        return isSameDay(
                                            new Date(work.wl_date),
                                            selectedDate
                                        );
                                    })
                                    .flatMap((work) => work.assigned_work)
                                    .find((item) => item.fk_uid === staff.uid);
                                // if the work log is un-deletable, prevent the checkbox from being checked
                                if (
                                    wl &&
                                    wl.wl_status &&
                                    !WL_DELETABLE_STATUS.includes(wl.wl_status)
                                ) {
                                    toastWarning(t("toastW.cantDelWLUnion"));
                                    e.preventDefault();
                                    return;
                                }

                                /* normal selecting logic*/
                                const date = selectedDate
                                    ? dateFormat(selectedDate)
                                    : "";
                                const newWork = assignedWorkSchema.parse({
                                    fk_oid: clientOrder.oid
                                        ? clientOrder.oid
                                        : "",
                                    fk_uid: staff.uid,
                                    wl_date: selectedDate
                                        ? dateFormat(selectedDate)
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
