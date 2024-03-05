import type { FC } from "react";
import CheckBox from "@/components/CheckBox";
import Fieldset from "@/components/form/fieldset";
import { useTranslation } from "react-i18next";
import { useJobAssignStore } from "@/configs/zustore";
import { Tstaff } from "@/configs/schema/staffSchema";

const SelectStaff: FC = () => {
    const { t } = useTranslation();
    const allStaff: (Tstaff & { selected: boolean })[] = useJobAssignStore(
        (state) => state.allStaff
    );
    const selectStaff = useJobAssignStore((state) => state.selectStaff);

    return (
        <Fieldset
            title={t("label.selectStaff")}
            sFieldset="col-span-full lg:col-span-5 my-2 mx-1 h-[28vh] px-2 overflow-y-auto gap-x-2 gap-y-3 flex flex-wrap justify-start content-start"
        >
            {allStaff.length ? (
                allStaff.map((staff, index) => {
                    return (
                        <CheckBox
                            key={staff.uid}
                            onChange={(e) => {
                                selectStaff(index, e.target.checked);
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
