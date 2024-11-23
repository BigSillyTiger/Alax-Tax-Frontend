import { useState, useEffect, useDeferredValue, memo } from "react";
import type { FC, FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import type { Tservice, Tunit } from "@/configs/schema/settingSchema";
import {
    newServiceSchema,
    newUnitSchema,
} from "@/configs/schema/settingSchema";
import { isServiceType } from "@/lib/literals";
import { MTemplate } from "@/components/modal";
import { SubmitBtn } from "@/components/form";
import { atModalOpen, atSUInitData } from "@/configs/atoms";
import { mOpenOps } from "@/configs/utils/modal";

type Tprops = {
    serviceList: Tservice[] | null; // duplication check
    unitList: Tunit[] | null; // duplication check
};

const MUniForm: FC<Tprops> = memo(({ unitList, serviceList }) => {
    const [isConflict, setIsConflict] = useState(false);
    // service
    const [service, setService] = useState("");
    const [unit, setUnit] = useState("");
    const [unitPrice, setUnitPrice] = useState(0);
    // unit
    const [unitName, setUnitName] = useState("");

    const [uniData] = useAtom(atSUInitData);
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);

    const defService = useDeferredValue(service);
    const defUnitName = useDeferredValue(unitName);
    const { t } = useTranslation();
    const submit = useSubmit();
    const navigation = useNavigation();
    const schema = isServiceType(uniData) ? newServiceSchema : newUnitSchema;
    const {
        //formState: { errors },
        getValues,
        register,
        reset,
        trigger,
    } = useForm<Tservice | Tunit>({ resolver: zodResolver(schema) });

    const UnitList = () => (
        <datalist id="unit_list">
            {unitList?.length &&
                unitList.map((item) => (
                    <option key={item.id} value={item.unit_name}>
                        {item.unit_name}
                    </option>
                ))}
        </datalist>
    );

    useEffect(() => {
        if (isServiceType(uniData)) {
            setService(uniData.service);
            setUnit(uniData.unit);
            setUnitPrice(uniData.unit_price);
        } else {
            setUnitName(uniData.unit_name);
        }
        reset();
    }, [
        reset,
        uniData,
        isServiceType(uniData) ? uniData.service : uniData.unit_name,
        modalOpen,
    ]);

    useEffect(() => {
        if (isServiceType(uniData) && defService) {
            const isDup = serviceList?.some(
                (item) => item.service === defService && item.id !== uniData.id
            );
            setIsConflict(isDup ? true : false);
        } else if (defUnitName) {
            const isDup = unitList?.some(
                (item) =>
                    item.unit_name === defUnitName && item.id !== uniData.id
            );
            setIsConflict(isDup ? true : false);
        }
    }, [
        uniData,
        serviceList,
        unitList,
        defService,
        defUnitName,
        isServiceType(uniData) ? defService : defUnitName,
    ]);

    const onSubmit = async (e: FormEvent) => {
        const isValid = await trigger();
        e.preventDefault();
        const method = modalOpen === "Add" ? "POST" : "PUT";
        if (isValid) {
            const values = getValues();
            submit(
                { ...values, id: uniData.id },
                { method, action: "/setting" }
            );
        }
        setModalOpen(mOpenOps.default);
    };

    const onClose = () => {
        setModalOpen(mOpenOps.default);
        reset();
    };

    const mainContent = (
        <Form onSubmit={onSubmit}>
            {/* conditional form */}
            {isServiceType(uniData) ? (
                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                        <label
                            htmlFor="service"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            {t("label.service")}
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                                {...register("service")}
                                type="service"
                                name="service"
                                id="service"
                                required
                                className={`
                                    outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-2
                                    ${
                                        isConflict
                                            ? "ring-2 ring-red-500 focus:ring-red-600"
                                            : "ring-1 ring-gray-300 focus:ring-indigo-600"
                                    }
                                `}
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="unit"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            {t("label.unit")}
                        </label>
                        <div className="mt-1">
                            <input
                                {...register("unit")}
                                type="text"
                                name="unit"
                                id="unit"
                                required
                                list="unit_list"
                                className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                value={unit}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setUnit(e.target.value);
                                }}
                            />
                            <UnitList />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="unit_price"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            {t("label.uPrice")}
                        </label>
                        <div className="mt-1">
                            <input
                                {...register("unit_price", {
                                    // use this to convert value into number
                                    valueAsNumber: true,
                                })}
                                type="text"
                                name="unit_price"
                                id="unit_price"
                                step="0.01"
                                min={0}
                                required
                                className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                defaultValue={unitPrice}
                                onChange={(e) => {
                                    e.preventDefault();
                                    setUnitPrice(parseFloat(e.target.value));
                                }}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                        <label
                            htmlFor="unit_name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            {t("label.unit")}
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                                {...register("unit_name")}
                                type="unit_name"
                                name="unit_name"
                                id="unit_name"
                                required
                                className={`
                                    outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-2
                                    ${
                                        isConflict
                                            ? " ring-2 ring-red-500 focus:ring-red-600 "
                                            : " ring-1 ring-gray-300 focus:ring-indigo-600 "
                                    }
                                `}
                                value={unitName}
                                onChange={(e) => setUnitName(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            )}

            <SubmitBtn
                onClick={() => trigger()}
                onClose={onClose}
                navState={navigation.state}
            />
        </Form>
    );

    return (
        <MTemplate
            open={!!(modalOpen === mOpenOps.add || modalOpen === mOpenOps.edit)}
            onClose={onClose}
            title={
                isServiceType(uniData)
                    ? modalOpen === mOpenOps.add
                        ? t("modal.title.addService")
                        : t("modal.title.editService")
                    : modalOpen === mOpenOps.edit
                      ? t("modal.title.editUnit")
                      : t("modal.title.addUnit")
            }
            mQuit={true}
        >
            {mainContent}
        </MTemplate>
    );
});

export default MUniForm;
