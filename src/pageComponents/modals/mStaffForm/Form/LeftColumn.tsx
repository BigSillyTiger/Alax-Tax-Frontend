import StatesOptions from "@/components/stateOptions";
import { atInfoConflict } from "@/configs/atoms";
import { TstaffForm } from "@/configs/schema/staffSchema";
import { RES_STATUS } from "@/configs/types";
import { ROLES } from "@/configs/utils/staff";
import { useAdminStore } from "@/configs/zustore";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";
import { PhoneIcon } from "lucide-react";
import type { FC } from "react";
import { Controller, FieldErrors, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PWResetBtn from "./PWResetBtn";
import { formNumberWLimit } from "@/lib/literals";
import {
    AU_PHONE,
    BANK_ACCOUNT,
    BSB_COUNT,
    PHONE_HOLDER,
} from "@/configs/utils/literals";

type Tprops = {
    register: UseFormReturn<TstaffForm>["register"];
    control: UseFormReturn<TstaffForm>["control"];
    errors: FieldErrors<TstaffForm>;
    onClose: () => void;
};

const LeftColumn: FC<Tprops> = ({ register, control, onClose, errors }) => {
    const { t } = useTranslation();
    const [infoConflict] = useAtom(atInfoConflict);
    const currentAdmin = useAdminStore((state) => state.currentAdmin);
    const isEmployee = currentAdmin.role === ROLES.employee;

    return (
        <div
            className={`sm:col-span-3 col-span-1 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 overflow-y-auto h-auto sm:h-[70dvh]`}
        >
            {/* first name */}
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
            {/* last name */}
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
            {/* email */}
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
                        disabled={isEmployee ? true : false}
                        required
                        className={`outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-10 
                ${
                    (infoConflict === RES_STATUS.FAILED_DUP_EMAIL ||
                        infoConflict === RES_STATUS.FAILED_DUP_P_E) &&
                    " ring-2 ring-red-500 focus:ring-red-600 "
                }
                ${
                    (infoConflict === RES_STATUS.SUCCESS ||
                        infoConflict === RES_STATUS.FAILED_DUP_PHONE) &&
                    " ring-1 ring-gray-300 focus:ring-indigo-600 "
                }
            `}
                        placeholder={t("placeholder.emailPH")}
                    />
                </div>
            </div>
            {/* phone */}
            <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, value } }) => {
                    return (
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
                                    /* {...register("phone")} */
                                    value={value}
                                    onChange={(e) => {
                                        const number = formNumberWLimit(
                                            "phone",
                                            e.target.value,
                                            AU_PHONE
                                        );
                                        onChange(number);
                                    }}
                                    type="tel"
                                    id="phone"
                                    required
                                    //pattern={`[+]?[0-9]{4,14}`}
                                    autoComplete="tel"
                                    placeholder={PHONE_HOLDER}
                                    className={`
                        outline-none h-9 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pl-10 
                        ${
                            (infoConflict === RES_STATUS.FAILED_DUP_PHONE ||
                                infoConflict === RES_STATUS.FAILED_DUP_P_E) &&
                            " ring-2 ring-red-500 focus:ring-red-600 "
                        }
                        ${
                            (infoConflict === RES_STATUS.SUCCESS ||
                                infoConflict === RES_STATUS.FAILED_DUP_EMAIL) &&
                            " ring-1 ring-gray-300 focus:ring-indigo-600 "
                        }
                    `}
                                />
                            </div>
                        </div>
                    );
                }}
            />

            {/* address */}
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
            {/* suburb */}
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
            {/* city */}
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
            {/* state */}
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
            {/* country */}
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
            {/* postcode */}
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
            {/* hour rate */}
            <div className="sm:col-span-2">
                <label
                    htmlFor="hr"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    {t("label.hr")}
                </label>

                <div className="mt-1">
                    <input
                        {...register("hr", {
                            valueAsNumber: true,
                            min: 0,
                        })}
                        type="number"
                        id="hr"
                        disabled={isEmployee ? true : false}
                        min={0}
                        step="0.01"
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
            {/* bsb */}
            <Controller
                name="bsb"
                control={control}
                render={({ field: { onChange, value } }) => {
                    return (
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="bsb"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                {t("label.bsb")}
                            </label>
                            <div className="mt-1">
                                <input
                                    //{...register("bsb")}
                                    value={value}
                                    onChange={(e) => {
                                        const number = formNumberWLimit(
                                            "number",
                                            e.target.value,
                                            BSB_COUNT
                                        );
                                        onChange(number);
                                    }}
                                    type="text"
                                    id="bsb"
                                    autoComplete="bsb"
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
                    );
                }}
            />

            {/* bank account */}
            <Controller
                name="account"
                control={control}
                render={({ field: { onChange, value } }) => {
                    return (
                        <div className="sm:col-span-3">
                            <label
                                htmlFor="account"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                {t("label.acc")}
                            </label>
                            <div className="mt-1">
                                <input
                                    //{...register("account")}
                                    value={value}
                                    onChange={(e) => {
                                        const number = formNumberWLimit(
                                            "number",
                                            e.target.value,
                                            BANK_ACCOUNT
                                        );
                                        onChange(number);
                                    }}
                                    type="text"
                                    id="account"
                                    autoComplete="account"
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
                    );
                }}
            />

            {/* reset pw for employee */}
            {isEmployee && (
                <div className="col-span-full">
                    <PWResetBtn onClose={onClose} />
                </div>
            )}
        </div>
    );
};

export default LeftColumn;
