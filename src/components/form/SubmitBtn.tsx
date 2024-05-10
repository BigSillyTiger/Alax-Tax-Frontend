import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Cbtn, Nbtn } from "../btns";

type Tprops = {
    onClose: () => void;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    navState: string;
    className?: string;
};

const SubmitBtn: FC<Tprops> = ({
    onClick,
    onClose,
    navState,
    className = "mt-5 sm:mt-4",
}) => {
    const { t } = useTranslation();
    return (
        <div
            className={`border-t border-gray-900/10 pt-3 grid grid-flow-row-dense grid-cols-2 gap-3 ${className}`}
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
            <Nbtn
                name="intent"
                value="add"
                type="submit"
                disabled={navState === "submitting" || navState === "loading"}
                onClick={onClick}
            >
                {navState === "submitting"
                    ? t("btn.submitting")
                    : t("btn.submit")}
            </Nbtn>
        </div>
    );
};

export default SubmitBtn;
