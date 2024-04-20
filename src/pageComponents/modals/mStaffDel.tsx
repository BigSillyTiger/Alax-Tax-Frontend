import { memo } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { MTemplate } from "@/components/modal";
import { useSubmit } from "react-router-dom";
import { useAtom } from "jotai";
import Card from "@/components/card";
import { DelBtn } from "@/components/form";
import { atStaff, atModalOpen } from "@/configs/atoms";
import { mOpenOps } from "@/configs/utils/modal";
import { useRouterStore } from "@/configs/zustore";
import { genAction } from "@/lib/literals";
import { toastWarning } from "@/lib/toaster";

// this component is about building a modal with transition to delete a staff
const MStaffDel: FC = memo(() => {
    const submit = useSubmit();
    const { t } = useTranslation();

    const [staff] = useAtom(atStaff);
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const currentRouter = useRouterStore((state) => state.currentRouter);

    const handleDeleteStaff = async (uid: string) => {
        if (uid === "M001" || uid === "M002") {
            toastWarning(t("toastW.cantDelManager"));
            return;
        }
        submit(
            { uid, req: "delStaff" },
            { method: "DELETE", action: genAction(currentRouter) }
        );
    };

    const clientDisplay = (
        <Card className="mt-2">
            <div className="m-3 grid grid-cols-6 gap-x-4 gap-y-4 text-left">
                <div className="col-span-5">
                    <p>
                        <b className="text-indigo-600">{t("label.staff")}: </b>{" "}
                        {staff.first_name}&nbsp;{staff.last_name}
                    </p>
                </div>
                <div className="col-span-3">
                    <p>
                        <b className="text-indigo-600">{t("label.phone1")}: </b>{" "}
                        {staff?.phone}
                    </p>
                </div>
                <div className="col-span-3">
                    <p>
                        <b className="text-indigo-600">{t("label.pc")}: </b>
                        {staff?.postcode}
                    </p>
                </div>
                <div className="col-span-6">
                    <p>
                        <b className="text-indigo-600">{t("label.email1")}: </b>{" "}
                        {staff?.email}
                    </p>
                </div>
                <div className="col-span-6">
                    <p>
                        <b className="text-indigo-600">
                            {t("label.address")}:{" "}
                        </b>{" "}
                        {staff?.address}, {staff?.city}, {staff?.state},{" "}
                        {staff?.country}
                    </p>
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
                {clientDisplay}
            </div>

            <DelBtn
                onClick={() => {
                    handleDeleteStaff(staff.uid);
                    onClose();
                }}
                onClose={onClose}
            />
        </>
    );

    return (
        <MTemplate
            open={!!(modalOpen === mOpenOps.del)}
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

export default MStaffDel;
