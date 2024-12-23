import { memo } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
import { MTemplate } from "@/components/modal";
import { useSubmit } from "react-router-dom";
import Card from "@/components/Card";
import { DelBtn } from "@/components/form";
import { atOrder, atModalOpen } from "@/configs/atoms";
import { mOpenOps } from "@/configs/utils/modal";
import { useRouterStore } from "@/configs/zustore";
import { genAction } from "@/lib/literals";
import { Btext } from "@/components/Btext";

// this component is about building a modal with transition to delete a client
const MOrderDel: FC = memo(() => {
    const submit = useSubmit();
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [clientOrder] = useAtom(atOrder);
    const currentRouter = useRouterStore((state) => state.currentRouter);

    const handleDeleteClient = async (oid: string) => {
        await submit(
            { oid },
            {
                method: "DELETE",
                action:
                    currentRouter === "client"
                        ? genAction(currentRouter, clientOrder.fk_cid)
                        : genAction(currentRouter),
            }
        );
    };

    const clientDisplay = (
        <Card className="mt-2">
            <div className="m-3 grid grid-cols-6 gap-x-4 gap-y-4 text-left">
                <div className="col-span-3">
                    <p>
                        <Btext>{t("label.idOrder")}: </Btext> {clientOrder?.oid}
                    </p>
                </div>
                <div className="col-span-3">
                    <p>
                        <Btext>{t("label.pc")}: </Btext> {clientOrder?.postcode}
                    </p>
                </div>

                <div className="col-span-full">
                    <p>
                        <Btext>{t("label.address")}: </Btext>{" "}
                        {clientOrder?.address}, {clientOrder?.suburb},{" "}
                        {clientOrder?.city}, {clientOrder?.state},{" "}
                        {clientOrder?.country}
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
                    {t("modal.tips.delOrder")}
                </p>
                {clientDisplay}
            </div>

            <DelBtn
                onClick={() => {
                    handleDeleteClient(clientOrder.oid);
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

export default MOrderDel;
