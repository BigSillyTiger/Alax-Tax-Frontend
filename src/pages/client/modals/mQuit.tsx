import React from "react";
import type { FC } from "react";
import ModalFrame from "@/components/modal";
import { useTranslation, Trans } from "react-i18next";
import { ConfirmBtn } from "@/components/form";

type Tprops = {
    open: boolean;
    setOpen: (v: boolean) => void;
    closeMainModal: () => void;
};

const MQuit: FC<Tprops> = ({ open, setOpen, closeMainModal }) => {
    const { t } = useTranslation();

    const onClose = () => {
        setOpen(false);
    };

    const mainContent = (
        <>
            <div className="mt-4 mb-2 px-4 text-center ">
                <p className="">{t("modal.tips.quit")}</p>
                <p className="">{t("modal.tips.dataLost")}</p>
            </div>
            <ConfirmBtn
                onClick={() => {
                    onClose();
                    closeMainModal();
                }}
                onClose={onClose}
            />
        </>
    );

    return (
        <ModalFrame
            open={open}
            onClose={onClose}
            title={t("modal.title.alert")}
            mode={"sm"}
            isMajor={true}
        >
            {mainContent}
        </ModalFrame>
    );
};

export default MQuit;
