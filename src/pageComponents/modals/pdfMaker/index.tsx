import { FC } from "react";
import MTemplate from "@/components/modal/modalTemplate";
import { useAtom } from "jotai";
import { atModalOpen } from "@/configs/atoms";
import { useTranslation } from "react-i18next";
import InvContent from "./invoice";
import { mOpenOps } from "@/configs/utils/modal";
import QuoContent from "./quotation";

const MpdfMaker: FC = () => {
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const { t } = useTranslation();

    const onClose = () => {
        setModalOpen(mOpenOps.default);
    };

    return (
        <MTemplate
            open={
                !!(
                    modalOpen === mOpenOps.invoice ||
                    modalOpen === mOpenOps.quotation
                )
            }
            onClose={onClose}
            title={
                modalOpen === mOpenOps.invoice
                    ? t("modal.title.invoice")
                    : t("modal.title.quotation")
            }
            mode="full"
            mQuit={true}
        >
            {modalOpen === mOpenOps.invoice ? <InvContent /> : <QuoContent />}
        </MTemplate>
    );
};

export default MpdfMaker;
