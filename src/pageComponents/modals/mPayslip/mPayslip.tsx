import { useEffect, type FC } from "react";
import MTemplate from "@/components/modal/modalTemplate";
import { useAtom } from "jotai";
import { atModalOpen } from "@/configs/atoms";
import { useTranslation } from "react-i18next";
import { mOpenOps } from "@/configs/utils/modal";
import FormContent from "./FormContent";
import { PayslipTemplate } from "@/pageComponents/pdfTemplates/payslip";
import { usePayslipStore } from "@/configs/zustore";

const MPayslip: FC = () => {
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const { t } = useTranslation();
    const resetAll = usePayslipStore((state) => state.resetAll);

    // this is used to make sure the reset fn is called when the modal is closed/open
    useEffect(() => {
        modalOpen === mOpenOps.default && resetAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalOpen]);

    const onClose = () => {
        setModalOpen(mOpenOps.default);
    };

    const MainContent = () => (
        <main
            className={`grid grid-cols-1 md:grid-cols-8 gap-x-4 overflow-y-auto h-[83dvh]`}
        >
            <div className="col-span-1 md:col-span-4 flex flex-col justify-center gap-y-4">
                <FormContent title="" onClose={onClose} />
            </div>
            <div className="col-span-1 md:col-span-4">
                <PayslipTemplate date={new Date().toISOString()} />
            </div>
        </main>
    );

    return (
        <MTemplate
            open={!!(modalOpen === mOpenOps.pay)}
            onClose={onClose}
            title={t("modal.title.payslip")}
            mode="full"
            mQuit={true}
        >
            <MainContent />
        </MTemplate>
    );
};

export default MPayslip;
