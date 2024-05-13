import { memo } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { MTemplate } from "@/components/modal";
import { useSubmit } from "react-router-dom";
import { useAtom } from "jotai";
import Card from "@/components/Card";
import { DelBtn } from "@/components/form";
import { atModalOpen } from "@/configs/atoms";
import { mOpenOps } from "@/configs/utils/modal";
import { usePayslipStore, useRouterStore } from "@/configs/zustore";
import { genAction } from "@/lib/literals";
import { StatusBadge } from "@/components/Badge";
import { Btext } from "@/components/Btext";

// this component is about building a modal with transition to delete a staff
const MPayslipDel: FC = memo(() => {
    const submit = useSubmit();
    const { t } = useTranslation();

    const payslip = usePayslipStore((state) => state.payslip);
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const currentRouter = useRouterStore((state) => state.currentRouter);

    const handleDeleteStaff = async (psid: string) => {
        submit(
            { psid, req: "delPayslip" },
            { method: "DELETE", action: genAction(currentRouter) }
        );
    };

    const payslipDisplay = (
        <Card className="mt-2">
            <div className="m-3 flex flex-col gap-x-4 gap-y-4 text-left">
                <div>
                    <Btext>{t("label.psid")}: </Btext> {payslip.psid}
                </div>
                <div className="flex flec-row justify-evenly gap-x-4">
                    <div>
                        <Btext>{t("label.start")}: </Btext> {payslip.s_date}
                    </div>
                    <div>
                        <Btext>{t("label.end")}: </Btext> {payslip.e_date}
                    </div>
                </div>
                <div className="flex flex-row gap-x-4 justify-evenly">
                    <div>
                        <Btext>{t("label.status")}: </Btext>{" "}
                        <StatusBadge value={payslip.status} />
                    </div>
                    <div>
                        <Btext>{t("label.hr")}: </Btext> ${payslip.hr}
                    </div>
                </div>
                <div>
                    <Btext>{t("label.thisPay")}: </Btext> ${payslip.paid}
                </div>
            </div>
        </Card>
    );

    const onClose = () => {
        setModalOpen(mOpenOps.default);
    };

    const mainContent = (
        <>
            <div className="mt-2">
                <p className="text-gray-700 text-lg">
                    {t("modal.tips.delStaff")}
                </p>
                {payslipDisplay}
            </div>

            <DelBtn
                onClick={() => {
                    handleDeleteStaff(payslip.psid as string);
                    onClose();
                }}
                onClose={onClose}
            />
        </>
    );

    return (
        <MTemplate
            // using del_2 because the del is occupied by staff del modal
            open={!!(modalOpen === mOpenOps.del_2)}
            onClose={onClose}
            title={t("modal.title.delete")}
            isMajor={true}
            mode={"md"}
            mQuit={false}
        >
            {mainContent}
        </MTemplate>
    );
});

export default MPayslipDel;
