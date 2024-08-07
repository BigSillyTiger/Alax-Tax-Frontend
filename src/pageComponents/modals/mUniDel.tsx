import { memo } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSubmit } from "react-router-dom";
import { useAtom } from "jotai";
import Card from "@/components/Card";
import { isServiceType } from "@/lib/literals";
import { MTemplate } from "@/components/modal";
import { DelBtn } from "@/components/form";
import { atModalOpen, atSUInitData } from "@/configs/atoms";
import { mOpenOps } from "@/configs/utils/modal";
import { Btext } from "@/components/Btext";

// this component is about building a modal with transition to delete a client
const MUniDel: FC = memo(() => {
    const submit = useSubmit();
    const { t } = useTranslation();
    const [uniData] = useAtom(atSUInitData);
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);

    const handleDeleteClient = async (id: number) => {
        const type = isServiceType(uniData) ? "service" : "unit";
        submit({ id, type }, { method: "DELETE", action: "/setting" });
    };

    const uniDisplay = (
        <Card className="mt-2">
            <div className="m-3 grid grid-cols-6 gap-x-4 gap-y-4 text-left">
                {isServiceType(uniData) ? (
                    <>
                        <div className="col-span-6">
                            <p>
                                <Btext>{t("label.service")}: </Btext>{" "}
                                {uniData.service}
                            </p>
                        </div>
                        <div className="col-span-3">
                            <p>
                                <Btext>{t("label.unit")}: </Btext>{" "}
                                {uniData.unit}
                            </p>
                        </div>
                        <div className="col-span-3">
                            <p>
                                <Btext> {t("label.uPrice")}: </Btext>{" "}
                                {uniData.unit_price}
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="col-span-5">
                        <p>
                            <Btext>{t("label.unit")}: </Btext>{" "}
                            {uniData.unit_name}
                        </p>
                    </div>
                )}
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
                    {t("modal.tips.delData")}
                </p>
                {uniDisplay}
            </div>
            {/* del btn */}
            <DelBtn
                onClick={() => {
                    uniData && handleDeleteClient(uniData.id);
                    setModalOpen(mOpenOps.default);
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

export default MUniDel;
