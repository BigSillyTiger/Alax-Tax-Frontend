import { useStore } from "zustand";
import { createStore } from "zustand/vanilla";
import { TassignedWork, TwlUnion } from "../schema/workSchema";
import { Tstaff } from "../schema/staffSchema";
import { isSameDay } from "date-fns";

type TallStaff = Tstaff & { selected: boolean };

type Tstate = {
    selectedDate: Date | undefined;
    currentWorkLogs: TwlUnion[];
    allStaff: TallStaff[];
};

type Taction = {
    setWorkLogs: (workLogs: TwlUnion[]) => void;
    setAllStaff: (staff: TallStaff[]) => void;
    appendAssignedWork: (assignedWork: TassignedWork, date: string) => void;
    removeAssignedWork: (assignedWork: TassignedWork, date: string) => void;
    selectStaff: (index: number, selected: boolean) => void;
    setDate: (date: Date | undefined) => void;
};

export const jobAssignStore = createStore<Tstate & Taction>((set) => ({
    selectedDate: new Date(),
    currentWorkLogs: [],
    allStaff: [],
    setWorkLogs: (workLogs: TwlUnion[]) =>
        set((state) => ({ ...state, currentWorkLogs: [...workLogs] })),
    // assignedWork - the work log to add
    appendAssignedWork: (assignedWork, date) =>
        set((state) => {
            // filter by wl_date of work_logs
            const filteredWorkLogs = state.currentWorkLogs.filter((work) => {
                return isSameDay(new Date(work.wl_date), new Date(date));
            });
            // check if assigned_work of the staff with uid exists on this date
            const workExists =
                filteredWorkLogs.length > 0
                    ? filteredWorkLogs[0].assigned_work.some(
                          (work) => work.fk_uid === assignedWork.fk_uid
                      )
                    : false;

            // work_logs not exists on the date
            if (!filteredWorkLogs.length) {
                const newWorkLogs = [
                    ...state.currentWorkLogs,
                    {
                        fk_oid: assignedWork.fk_oid,
                        wl_date: date,
                        assigned_work: [assignedWork],
                    },
                ];
                return {
                    ...state,
                    currentWorkLogs: [...newWorkLogs],
                };
            }
            // work_logs exists on the date, but the assigned_work of the staff with the uid not exists
            else if (filteredWorkLogs.length && !workExists) {
                const newWorkLogs = state.currentWorkLogs.map((work) =>
                    isSameDay(new Date(work.wl_date), new Date(date))
                        ? {
                              ...work,
                              assigned_work: [
                                  ...work.assigned_work,
                                  assignedWork,
                              ],
                          }
                        : { ...work }
                );
                return { ...state, currentWorkLogs: [...newWorkLogs] };
            }
            return { ...state };
        }),
    // assignedWork - the work log to remove
    removeAssignedWork: (assignedWork, date) =>
        set((state) => {
            const filteredWorkLogs = state.currentWorkLogs.filter((work) => {
                return isSameDay(new Date(work.wl_date), new Date(date));
            });

            const newWorkLogs = state.currentWorkLogs.map((work) =>
                isSameDay(new Date(work.wl_date), new Date(date))
                    ? {
                          ...work,
                          assigned_work:
                              filteredWorkLogs[0].assigned_work.filter(
                                  (work) => work.fk_uid !== assignedWork.fk_uid
                              ),
                      }
                    : work
            );

            return {
                ...state,
                currentWorkLogs: newWorkLogs,
            };
        }),
    setAllStaff: (staff: TallStaff[]) =>
        set((state) => ({ ...state, allStaff: staff })),
    selectStaff: (index: number, selected: boolean) =>
        set((state) => ({
            allStaff: state.allStaff.map((staff, i) =>
                i === index ? { ...staff, selected: selected } : staff
            ),
        })),
    setDate: (date: Date | undefined) =>
        set((state) => ({ ...state, selectedDate: date })),
}));

export const useJobAssignStore = <T>(
    selector: (state: Tstate & Taction) => T
) => useStore(jobAssignStore, selector);
