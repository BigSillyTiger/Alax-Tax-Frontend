import { memo } from "react";
import type { FC } from "react";
import { useSubmit } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ConfirmBtn } from "@/components/form";
import ModalFrame from "@/components/modal/modalFrame";
import { useRouterStore } from "@/configs/zustore";
import { genAction } from "@/utils/utils";

type Tprops = {
    open: boolean;
    setOpen: (v: boolean) => void;
    wlid: string;
    //closeMainModal: () => void;
};

const MResetTimer: FC<Tprops> = memo(({ open, setOpen, wlid }) => {
    const { t } = useTranslation();
    const submit = useSubmit();
    const currentRouter = useRouterStore((state) => state.currentRouter);

    const onClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        submit(
            {
                wlid,
                req: "reset_timer",
            },
            { method: "POST", action: genAction(currentRouter) }
        );
    };

    const mainContent = (
        <>
            <div className="mt-4 mb-3 px-4 py-2 text-center ">
                <p className="">{t("modal.tips.resetTimer")}</p>
                <p className="">{t("modal.tips.timerLost")}</p>
            </div>
            <ConfirmBtn
                onClick={() => {
                    handleConfirm();
                    onClose();
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
});

export default MResetTimer;
