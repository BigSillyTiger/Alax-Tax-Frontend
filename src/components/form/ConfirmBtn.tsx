import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Cbtn, Nbtn } from "../btns";

type Tprops = {
    onClick: () => void;
    onClose: () => void;
    btnTitle?: string;
    dividers?: boolean;
};

const ConfirmBtn: FC<Tprops> = ({
    onClick,
    onClose,
    btnTitle = "",
    dividers = true,
}) => {
    const { t } = useTranslation();
    return (
        <div
            className={` pt-4 grid grid-flow-row-dense grid-cols-2 gap-3 ${
                dividers
                    ? "mt-5 sm:mt-4 border-t border-indigo-100 border-dashed"
                    : ""
            }`}
        >
            <Cbtn
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    onClose();
                }}
            >
                {t("btn.cancel")}
            </Cbtn>
            <Nbtn name="intent" value="add" type="submit" onClick={onClick}>
                {btnTitle ? btnTitle : t("btn.confirm")}
            </Nbtn>
        </div>
    );
};

export default ConfirmBtn;
