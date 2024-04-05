import type { FC } from "react";
import MTemplate from "@/components/modal/modalTemplate";
import { useAtom } from "jotai";
import { atModalOpen } from "@/configs/atoms";
import { useTranslation } from "react-i18next";
import { mOpenOps } from "@/configs/utils";
import FormContent from "./FormContent";

const MPayslip: FC = () => {
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const { t } = useTranslation();

    const onClose = () => {
        setModalOpen("");
    };

    const MainContent = () => (
        <main
            className={`grid grid-cols-1 md:grid-cols-8 gap-x-2 overflow-y-auto h-[83dvh]`}
        >
            <section className="col-span-1 md:col-span-4">
                <FormContent title="" />
            </section>
            <section className="col-span-1 md:col-span-4">
                placeholder for payslip pdf template
            </section>
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
