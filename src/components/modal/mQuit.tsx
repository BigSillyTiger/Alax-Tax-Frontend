import React, { memo } from "react";
import type { FC } from "react";
import { ModalFrame } from "@/components/modal";
import { useTranslation } from "react-i18next";
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
            <div className="mt-4 mb-3 px-4 py-2 text-center ">
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

export default memo(MQuit);
