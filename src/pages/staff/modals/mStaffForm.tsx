import { useEffect, memo } from "react";
import type { FC, FormEvent } from "react";
import { useTranslation, Trans } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import { useAtom } from "jotai";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { RES_STATUS } from "@/utils/types";
import { MTemplate } from "@/components/modal";
import { SubmitBtn } from "@/components/form";
import StatesOptions from "@/components/stateOptions";
import { initStaff, atStaff, atRoleSelected } from "../states";
import { atModalOpen, atInfoConflict } from "@/pages/uniStates";
import { pageAdminList } from "@/configs/utils";
import {
    TstaffUnregWithAdmin,
    staffUnregWithAdmin,
} from "@/configs/schema/staffSchema";
import Fieldset from "@/components/form/fieldset";

const MStaffForm: FC = memo(() => {
    const navigation = useNavigation();
    const submit = useSubmit();
    const { t } = useTranslation();
    const [modalOpen, setModalOpen] = useAtom(atModalOpen);
    const [infoConflict, setInfoConflict] = useAtom(atInfoConflict);
    const [staff] = useAtom(atStaff);
    const [roleSelected, setRoleSelected] = useAtom(atRoleSelected);

    const {
        formState: { errors },
        getValues,
        register,
        reset,
        trigger,
        watch,
    } = useForm<TstaffUnregWithAdmin>({
        resolver: zodResolver(staffUnregWithAdmin),
        defaultValues: staff,
    });

    useEffect(() => {
        reset(staff);
    }, [staff, reset]);

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const isValid = await trigger();
        console.log("-> staff add err: ", errors);
        //console.log("-> staff form all value: ", getValues());
        if (isValid) {
            const values = getValues();
            const method = staff.uid === 0 ? "POST" : "PUT";
            submit({ ...values, id: staff.uid }, { method, action: "/staff" });
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
                    {...register("password", {
                        required: "Password is required",
                    })}
                    id="inputPW"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                />
            </div>
            <div className="mx-3 my-1 ">
                <label htmlFor="confirmPW" className="text-sm pl-2">
                    {t("label.pwConfirm")}
                </label>
                <input
                    {...register("pwConfirm", {
                        validate: (value) =>
                            value === watch("password") ||
                            "Passwords do not match",
                    })}
                    id="confirmPW"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                />
            </div>
        </Fieldset>
    );

    const RoleField = () => (
        <Fieldset sFieldset="flex justify-evenly" title={t("label.selectRole")}>
            <div>
                <input
                    {...register("role")}
                    type="radio"
                    id="employee"
                    value="employee"
                    checked={watch("role") === "employee"}
                />
                <label htmlFor="employee" className="text-lg">
                    {t("label.employee")}
                </label>
            </div>

            <div>
                <input
                    {...register("role")}
                    type="radio"
                    id="manager"
                    value="manager"
                    className="mr-2"
                    checked={watch("role") === "manager"}
                />
                <label htmlFor="manager" className="text-lg">
                    {t("label.manager")}
                </label>
            </div>
        </Fieldset>
    );

    const AdminTable = () => (
        <Fieldset
            sFieldset="mt-4 flex justify-evenly"
            title={t("label.pageAccessSetting")}
        >
            <div className="mx-3 w-full">
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
                        {pageAdminList.map((item) => {
                            return (
                                <tr key={item.page}>
                                    <td>{item.page}</td>
                                    <td className="bg-indigo-100">
                                        <input
                                            {...register(item.page, {
                                                valueAsNumber: true,
                                            })}
                                            type="radio"
                                            id={`readOnly-${item.page}`}
                                            //name={item.page}
                                            value={1}
                                            className="h-full w-full"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            {...register(item.page, {
                                                valueAsNumber: true,
                                            })}
                                            type="radio"
                                            id={`fullAccess-${item.page}`}
                                            //name={item.page}
                                            value={2}
                                            className="h-full w-full"
                                            defaultChecked
                                        />
                                    </td>
                                    <td className="bg-indigo-100">
                                        <input
                                            {...register(item.page, {
                                                valueAsNumber: true,
                                            })}
                                            type="radio"
                                            id={`none-${item.page}`}
                                            //name={item.page}
                                            value={0}
                                            className="h-full w-full"
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
                    <div className="sm:col-span-3 col-span-1">
                        <PWsection />
                        <RoleField />
                        <AdminTable />
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
