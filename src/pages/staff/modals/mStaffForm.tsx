import { useEffect, memo } from "react";
import type { FC, FormEvent } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation, Form } from "react-router-dom";
import { useAtom } from "jotai";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { RES_STATUS } from "@/utils/types";
import { MTemplate } from "@/components/modal";
import { SubmitBtn } from "@/components/form";
import StatesOptions from "@/components/stateOptions";
import { initStaff, atStaff } from "../states";
import { atModalOpen, atInfoConflict } from "@/pages/uniStates";
import { pageList, roleOptions } from "@/configs/utils";
import {
    TstaffUnregWithAdmin,
    staffUnregWithAdmin,
} from "@/configs/schema/staffSchema";
import Fieldset from "@/components/form/fieldset";

const MStaffForm: FC = memo(() => {
    const navigation = useNavigation();

    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [infoConflict, setInfoConflict] = useAtom(atInfoConflict);
    const [staff] = useAtom(atStaff);

    const {
        formState: { errors },
        getValues,
        register,
        reset,
        setValue,
        trigger,
        watch,
    } = useForm<TstaffUnregWithAdmin>({
        resolver: zodResolver(staffUnregWithAdmin),
        defaultValues: staff,
        mode: "onSubmit",
        reValidateMode: "onSubmit",
    });

    useEffect(() => {
        reset(staff);
    }, [staff, reset]);

    useEffect(() => {
        if (watch("role") === "employee") {
            setValue("dashboard", roleOptions.employee.dashboard);
            setValue("clients", roleOptions.employee.clients);
            setValue("orders", roleOptions.employee.orders);
            setValue("calendar", roleOptions.employee.calendar);
            setValue("staff", roleOptions.employee.staff);
            setValue("setting", roleOptions.employee.setting);
        } else if (watch("role") === "manager") {
            setValue("dashboard", roleOptions.manager.dashboard);
            setValue("clients", roleOptions.manager.clients);
            setValue("orders", roleOptions.manager.orders);
            setValue("calendar", roleOptions.manager.calendar);
            setValue("staff", roleOptions.manager.staff);
            setValue("setting", roleOptions.manager.setting);
        }
    }, [watch("role"), watch, setValue]);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const isValid = await trigger();
        console.log("-> staff add isValid: ", isValid);
        console.log("-> staff add err: ", errors);
        console.log("-> staff form all value: ", getValues());
        if (isValid) {
            const values = getValues();
            const method = staff.uid === 0 ? "POST" : "PUT";
            //submit({ ...values, id: staff.uid }, { method, action: "/staff" });
        }
    };

    const onClose = () => {
        setInfoConflict(RES_STATUS.SUCCESS);
        setModalOpen("");
        reset(initStaff);
    };

    const PWsection = () => (
        <Fieldset title={t("label.password")} sFieldset="flex flex-col">
            <div className="mx-3">
                <label htmlFor="inputPW" className="text-sm pl-2">
                    {t("label.pwInput")}
                </label>
                <input
                    {...register("password")}
                    id="inputPW"
                    type="password"
                    autoComplete="new-password"
                    required
                    className={`outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 ${errors.pwConfirm && "ring-2 ring-red-600 focus:ring-red-400"}`}
                />
            </div>
            <div className="mx-3 my-1 ">
                <label htmlFor="pwConfirm" className="text-sm pl-2">
                    {errors.pwConfirm ? (
                        <Trans
                            defaults={t("modal.tips.noMatch")}
                            components={{
                                b: <strong className="text-red-400" />,
                            }}
                        />
                    ) : (
                        t("label.pwConfirm")
                    )}
                </label>
                <input
                    {...register("pwConfirm", {
                        validate: (value) =>
                            watch("password") === value ||
                            t("modal.tips.noMatch"),
                    })}
                    id="pwConfirm"
                    type="password"
                    autoComplete="new-password"
                    required
                    className={`outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 ${errors.pwConfirm && "ring-2 ring-red-600 focus:ring-red-400"}`}
                />
            </div>
        </Fieldset>
    );

    const setRadioDisable = (
        page:
            | "dashboard"
            | "clients"
            | "orders"
            | "calendar"
            | "staff"
            | "setting",
        adminNum: 0 | 1 | 2
    ) => {
        return !(watch(page) === adminNum);
    };

    const RoleField = () => (
        <Fieldset
            sFieldset="mt-4 flex flex-col"
            title={
                <p className="mb-1">
                    <Trans
                        defaults={t("modal.title.roleAdmin")}
                        components={{
                            s: <strong className="text-sm font-light" />,
                        }}
                    />
                </p>
            }
        >
            <div className="flex justify-evenly">
                <div>
                    <input
                        {...register("role")}
                        id="employee"
                        type="radio"
                        value="employee"
                        checked={watch("role") === "employee"}
                        className="mr-2 cursor-pointer"
                    />
                    <label
                        htmlFor="employee"
                        className="text-lg cursor-pointer"
                    >
                        {t("label.employee")}
                    </label>
                </div>
                <div>
                    <input
                        {...register("role")}
                        id="manager"
                        type="radio"
                        value="manager"
                        className="mr-2 cursor-pointer"
                        checked={watch("role") === "manager"}
                    />
                    <label htmlFor="manager" className="text-lg cursor-pointer">
                        {t("label.manager")}
                    </label>
                </div>
            </div>

            {/* role access setting table */}
            <div className="mx-3 mt-2 mb-1">
                <table className="min-w-full">
                    <thead className="bg-indigo-200">
                        <tr>
                            <th className="text-base">{t("label.page")}</th>
                            <th className="text-base text-center">
                                {t("label.readOnly")}
                            </th>
                            <th className="text-base text-center">
                                {t("label.fullAccess")}
                            </th>
                            <th className="text-base text-center">
                                {t("label.none")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageList.map((item) => {
                            return (
                                <tr key={item.page}>
                                    <td>{item.page}</td>
                                    <td className="bg-yellow-50">
                                        <input
                                            {...register(item.page, {
                                                valueAsNumber: true,
                                                onChange: () => {
                                                    null;
                                                },
                                            })}
                                            className="h-full w-full"
                                            type="radio"
                                            value={1}
                                            checked={watch(item.page) === 1}
                                            disabled={setRadioDisable(
                                                item.page,
                                                1
                                            )}
                                        />
                                    </td>
                                    <td className="bg-green-50">
                                        <input
                                            {...register(item.page, {
                                                valueAsNumber: true,
                                                onChange: () => {
                                                    null;
                                                },
                                            })}
                                            className="h-full w-full"
                                            type="radio"
                                            value={2}
                                            checked={watch(item.page) === 2}
                                            disabled={setRadioDisable(
                                                item.page,
                                                2
                                            )}
                                        />
                                    </td>
                                    <td className="bg-red-50">
                                        <input
                                            {...register(item.page, {
                                                valueAsNumber: true,
                                                onChange: () => {
                                                    null;
                                                },
                                            })}
                                            className="h-full w-full"
                                            type="radio"
                                            value={0}
                                            checked={watch(item.page) === 0}
                                            disabled={setRadioDisable(
                                                item.page,
                                                0
                                            )}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Fieldset>
    );

    const mainContent = (
        <>
            <p className="mt-1 text-sm leading-6 text-gray-600">
                <Trans
                    defaults={t("modal.tips.noDupAddr")}
                    components={{
                        b: <strong className="text-red-400" />,
                    }}
                />
            </p>
            <Form onSubmit={onSubmit} className="mt-4">
                <div className="grid sm:grid-cols-6 grid-cols-1 gap-3">
                    {/* left input area */}
                    <div className="sm:col-span-3 col-span-1 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 overflow-y-auto h-[70vh] sm:h-auto">
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="first_name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                {t("label.firstName")}
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register("first_name")}
                                    type="text"
                                    id="first_name"
                                    autoComplete="given-name"
                                    required
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label
                                htmlFor="last_name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                {t("label.lastName")}
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register("last_name")}
                                    id="last_name"
                                    type="text"
                                    autoComplete="family-name"
                                    required
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                {t("label.email1")}
                            </label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <EnvelopeIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </div>
                                <input
                                    {...register("email")}
                                    type="email"
                                    id="email"
                                    required
                                    className={`outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-10 
                                    ${
                                        (infoConflict ===
                                            RES_STATUS.FAILED_DUP_EMAIL ||
                                            infoConflict ===
                                                RES_STATUS.FAILED_DUP_P_E) &&
                                        " ring-2 ring-red-500 focus:ring-red-600 "
                                    }
                                    ${
                                        (infoConflict === RES_STATUS.SUCCESS ||
                                            infoConflict ===
                                                RES_STATUS.FAILED_DUP_PHONE) &&
                                        " ring-1 ring-gray-300 focus:ring-indigo-600 "
                                    }
                                `}
                                    placeholder={t("placeholder.emailPH")}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                {t("label.phone1")}
                            </label>
                            <div className="relative mt-1 rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <PhoneIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </div>
                                <input
                                    {...register("phone")}
                                    type="text"
                                    id="phone"
                                    autoComplete="tel"
                                    placeholder="0-xxx-xxx-xxx"
                                    className={`
                                    outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-10 
                                    ${
                                        (infoConflict ===
                                            RES_STATUS.FAILED_DUP_PHONE ||
                                            infoConflict ===
                                                RES_STATUS.FAILED_DUP_P_E) &&
                                        " ring-2 ring-red-500 focus:ring-red-600 "
                                    }
                                    ${
                                        (infoConflict === RES_STATUS.SUCCESS ||
                                            infoConflict ===
                                                RES_STATUS.FAILED_DUP_EMAIL) &&
                                        " ring-1 ring-gray-300 focus:ring-indigo-600 "
                                    }
                                `}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label
                                htmlFor="address"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                {t("label.address")}
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register("address")}
                                    type="text"
                                    id="address"
                                    autoComplete="street-address"
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="suburb"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                {t("label.suburb")}
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register("suburb")}
                                    type="text"
                                    id="suburb"
                                    autoComplete="address-level1"
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="city"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                {t("label.city")}
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register("city")}
                                    type="text"
                                    id="city"
                                    autoComplete="address-level2"
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="state"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                {t("label.state")}
                            </label>
                            <div className="mt-1">
                                <select
                                    {...register("state")}
                                    id="state"
                                    autoComplete="address-level3"
                                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                                >
                                    <StatesOptions />
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="country"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                {t("label.country")}
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register("country")}
                                    type="text"
                                    disabled
                                    id="country"
                                    autoComplete="country-name"
                                    className="outline-none pl-2 h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="postcode"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                {t("label.pc")}
                            </label>

                            <div className="mt-1">
                                <input
                                    {...register("postcode")}
                                    type="text"
                                    id="postcode"
                                    autoComplete="postal-code"
                                    className={`
                                    outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 pl-2 
                                    ${
                                        errors.postcode
                                            ? " ring-2 ring-red-600 focus:ring-red-400 "
                                            : " ring-1 ring-gray-300 focus:ring-indigo-600 "
                                    }
                                `}
                                />
                            </div>
                        </div>
                    </div>
                    {/* right input area */}
                    <div className="sm:col-span-3 col-span-1">
                        <PWsection />
                        <RoleField />

                        {/* <RoleSelection /> */}
                    </div>
                </div>
                <SubmitBtn
                    onClick={() => trigger()}
                    onClose={onClose}
                    navState={navigation.state}
                />
            </Form>
        </>
    );

    return (
        <MTemplate
            open={!!(modalOpen === "Add" || modalOpen === "Edit")}
            onClose={onClose}
            title={
                modalOpen === "Add"
                    ? t("modal.title.addStaff")
                    : t("modal.title.updateStaff")
            }
            mQuit={true}
            mode="xl"
        >
            {mainContent}
        </MTemplate>
    );
});

export default MStaffForm;
