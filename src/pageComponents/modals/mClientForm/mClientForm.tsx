import { useEffect, memo } from "react";
import type { FC } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useForm } from "react-hook-form";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Tclient } from "@/configs/schema/clientSchema";
import { clientNoIDSchema } from "@/configs/schema/clientSchema";
import { MTemplate } from "@/components/modal";
import { atClient, atInfoConflict, atModalOpen } from "@/configs/atoms";
import { mOpenOps } from "@/configs/utils/modal";
import { RES_STATUS } from "@/configs/types";
import FormContent from "./Form";

const MClientForm: FC = memo(() => {
    const { t } = useTranslation();
    const [client, setClient] = useAtom(atClient);
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [, setInfoConflict] = useAtom(atInfoConflict);

    const {
        formState: { errors },
        getValues,
        register,
        reset,
        trigger,
        control,
    } = useForm<Tclient>({
        resolver: zodResolver(clientNoIDSchema),
        defaultValues: client,
    });

    useEffect(() => {
        reset(client);
    }, [client, modalOpen, reset]);

    const onClose = () => {
        setInfoConflict(RES_STATUS.SUCCESS);
        setModalOpen(mOpenOps.default);
        setClient(RESET);
    };

    const mainContent = (
        <div className="">
            <p className="mt-1 text-sm leading-6 text-gray-600">
                <Trans
                    defaults={t("modal.tips.noDupAddr")}
                    components={{
                        b: <strong className="text-red-400" />,
                    }}
                />
            </p>
            <FormContent
                register={register}
                trigger={trigger}
                errors={errors}
                onClose={onClose}
                getValues={getValues}
                control={control}
            />
        </div>
    );

    return (
        <MTemplate
            open={!!(modalOpen === mOpenOps.add || modalOpen === mOpenOps.edit)}
            onClose={onClose}
            title={
                modalOpen === mOpenOps.add
                    ? t("modal.title.addClient")
                    : t("modal.title.updateClient")
            }
            mQuit={true}
        >
            {mainContent}
        </MTemplate>
    );
});

export default MClientForm;
