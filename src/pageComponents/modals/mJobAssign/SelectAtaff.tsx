import type { FC } from "react";
import CheckBox from "@/components/CheckBox";
import Fieldset from "@/components/form/fieldset";
import { useTranslation } from "react-i18next";

const SelectStaff: FC = () => {
    const { t } = useTranslation();
    return (
        <Fieldset
            title={t("label.selectStaff")}
            sFieldset="col-span-full lg:col-span-5 my-2 mx-1 overflow-y-auto flex flex-wrap justify-start"
        >
            {
                <CheckBox
                    onChange={(e) => {
                        //e.preventDefault();
                        console.log("-> click checkbox: ", e.target.checked);
                    }}
                    uid="E001"
                    name="Staff 1"
                />
            }
        </Fieldset>
    );
};

export default SelectStaff;
