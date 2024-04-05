import React from "react";
import type { FC } from "react";
import { Switch } from "@headlessui/react";

import { useTranslation } from "react-i18next";

type Tprops = {
    direct: "v" | "h";
    isChecked: boolean;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
};

const VHSwitch: FC<Tprops> = ({ direct = "h", isChecked, setIsChecked }) => {
    const [t] = useTranslation();
    const transS = direct === "h" ? "translate-x-6" : "translate-y-6";
    const transE = direct === "h" ? "translate-x-0" : "translate-y-0";
    const size = direct === "h" ? `h-[29px] w-[53px]` : `h-[53px] w-[29px]`;
    return (
        <div className="py-2">
            <Switch
                checked={isChecked}
                onChange={setIsChecked}
                className={`${isChecked ? "bg-amber-500" : "bg-cyan-500"}
              relative inline-flex  shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75 ${size}`}
            >
                <span className="sr-only">{t("label.switch")}</span>
                <span
                    aria-hidden="true"
                    className={`${isChecked ? transS : transE}
                pointer-events-none inline-block h-[25px] w-[25px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
        </div>
    );
};

export default VHSwitch;
