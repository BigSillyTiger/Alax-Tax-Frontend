import React from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSubmit } from "react-router-dom";
import Card from "@/components/card";
import { Tservice, Tunit } from "@/utils/schema/manageSchema";
import { isServiceType } from "@/utils/utils";
import ModalFrame from "@/components/modal/modalFrame";
import { DelBtn } from "@/components/form";

type Tprops = {
    uni: Tservice | Tunit;
    setOpen: (value: Tservice | Tunit) => void;
};

// this component is about building a modal with transition to delete a client
const MUniDel: FC<Tprops> = ({ uni, setOpen }) => {
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
        setOpen({ ...uni, id: 0 });
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
                    setOpen({ ...uni, id: 0 });
                }}
                onClose={onClose}
            />
        </>
    );

    return (
        <ModalFrame
            open={!!uni.id}
            onClose={onClose}
            title={t("modal.title.delete")}
            isMajor={true}
        >
            {mainContent}
        </ModalFrame>
    );
};

export default MUniDel;
