import { memo } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSubmit } from "react-router-dom";
import Card from "@/components/card";
import { Tservice, Tunit } from "@/configs/schema/manageSchema";
import { isServiceType } from "@/utils/utils";
import { MTemplate } from "@/components/modal";
import { DelBtn } from "@/components/form";
import { TclientOrderModal } from "@/utils/types";

type Tprops = {
    uni: Tservice | Tunit;
    open: TclientOrderModal;
    setOpen: (value: TclientOrderModal) => void;
};

// this component is about building a modal with transition to delete a client
const UniDel: FC<Tprops> = ({ uni, open, setOpen }) => {
    const submit = useSubmit();
    const { t } = useTranslation();

    const handleDeleteClient = async (id: number) => {
        const type = isServiceType(uni) ? "service" : "unit";
        submit({ id, type }, { method: "DELETE", action: "/management" });
    };

    const uniDisplay = (
        <Card className="mt-2">
            <div className="m-3 grid grid-cols-6 gap-x-4 gap-y-4 text-left">
                {isServiceType(uni) ? (
                    <>
                        <div className="col-span-6">
                            <p>
                                <b className="text-indigo-600">
                                    {t("label.service")}:{" "}
                                </b>{" "}
                                {uni.service}
                            </p>
                        </div>
                        <div className="col-span-3">
                            <p>
                                <b className="text-indigo-600">
                                    {t("label.unit")}:{" "}
                                </b>{" "}
                                {uni.unit}
                            </p>
                        </div>
                        <div className="col-span-3">
                            <p>
                                <b className="text-indigo-600">
                                    {" "}
                                    {t("label.uPrice")}:{" "}
                                </b>{" "}
                                {uni.unit_price}
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="col-span-5">
                        <p>
                            <b className="text-indigo-600">
                                {t("label.unit")}:{" "}
                            </b>{" "}
                            {uni.unit_name}
                        </p>
                    </div>
                )}
            </div>
        </Card>
    );

    const onClose = () => {
        setOpen("");
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
                    uni && handleDeleteClient(uni.id);
                    setOpen("");
                }}
                onClose={onClose}
            />
        </>
    );

    return (
        <MTemplate
            open={!!(open === "Del")}
            onClose={onClose}
            title={t("modal.title.delete")}
            isMajor={true}
            mode={"md"}
            mQuit={false}
        >
            {mainContent}
        </MTemplate>
    );
};

const MUniDel = memo(UniDel);

export default MUniDel;
