import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Cbtn, Dbtn } from "../btns";

type Tprops = {
    onClick: () => void;
    onClose: () => void;
};

const DelBtn: FC<Tprops> = ({ onClick, onClose }) => {
    const { t } = useTranslation();
    return (
        <div className="border-t border-gray-900/10 pt-4 mt-5 sm:mt-4 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
            <Dbtn name="intent" value="add" type="submit" onClick={onClick}>
                {t("btn.del")}
            </Dbtn>
            <Cbtn
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    onClose();
                }}
            >
                {t("btn.cancel")}
            </Cbtn>
        </div>
    );
};

export default DelBtn;
