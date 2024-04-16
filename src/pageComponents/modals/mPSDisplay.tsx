import type { FC } from "react";
import MTemplate from "@/components/modal/modalTemplate";
import { useAtom } from "jotai";
import { atModalOpen, atStaff } from "@/configs/atoms";
import { useTranslation } from "react-i18next";
import { mOpenOps } from "@/configs/utils/modal";
import { PayslipTemplate } from "@/pageComponents/pdfTemplates/payslip";
import { usePayslipStore } from "@/configs/zustore";
import { NormalBtn } from "@/components/btns";

const MPSDisplay: FC = () => {
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const { t } = useTranslation();
    const [staff] = useAtom(atStaff);
    const payslip = usePayslipStore((state) => state.payslip);

    const pdfName = `${staff?.first_name + staff?.last_name}_${payslip?.psid}.pdf`;

    const onClose = () => {
        setModalOpen(mOpenOps.default);
    };

    const DownloadLink = () => (
        <PayslipTemplate
            date={new Date().toISOString()}
            isDlLink={{
                isLink: true,
                pdfTitle: pdfName,
                btnTitle: t("btn.download"),
            }}
        />
    );

    const MainContent = () => (
        <main className={`overflow-y-auto h-[83dvh] grid grid-cols-6 gap-x-4`}>
            <div className="col-span-1 flex flex-col justify-center gap-y-5">
                <NormalBtn>
                    <DownloadLink />
                </NormalBtn>
                <NormalBtn onClick={onClose}>{t("btn.close")}</NormalBtn>
            </div>
            <div className="col-span-5">
                <PayslipTemplate date={new Date().toISOString()} />
            </div>
        </main>
    );

    return (
        <MTemplate
            open={!!(modalOpen === mOpenOps.display)}
            onClose={onClose}
            title={t("modal.title.payslip")}
            mode="full"
            mQuit={true}
        >
            <MainContent />
        </MTemplate>
    );
};

export default MPSDisplay;
