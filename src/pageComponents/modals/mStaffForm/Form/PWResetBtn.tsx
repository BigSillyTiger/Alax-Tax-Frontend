import type { FC } from "react";
import { Nbtn } from "@/components/btns";
import { at2ndModalOpen } from "@/configs/atoms";
import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";

type Tprops = {
    onClose: () => void;
};

const PWResetBtn: FC<Tprops> = ({ onClose }) => {
    const { t } = useTranslation();
    const [, setSecModalOpen] = useAtom(at2ndModalOpen);
    const handleClickPWReset = () => {
        setSecModalOpen("ResetPW");
        onClose();
    };

    return (
        <Nbtn
            onClick={handleClickPWReset}
            className="w-full mt-4 grow-0 py-4 text-xl"
        >
            {t("btn.resetPW")}
        </Nbtn>
    );
};

export default PWResetBtn;
