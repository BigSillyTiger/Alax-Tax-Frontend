import React, { useState, useEffect } from "react";
import type { FC, FormEvent } from "react";
import { useNavigation, useSubmit, Form } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tcompany, companySchema } from "@/configs/schema/manageSchema";
import { useTranslation } from "react-i18next";
import Card from "@/components/card";

type Tprops = {
    company: Tcompany | null;
};

const initCompany = {
    id: 0,
    name: "",
    bld: "",
    phone: "",
    email: "",
    address: "",
    abn: "",
    bsb: "",
    acc: "",
};

const Company: FC<Tprops> = ({ company }) => {
    const { t } = useTranslation();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [file, setFile] = useState<any>(null);
    const [id] = useState<number>(company?.id ? company.id : 0);
    const submit = useSubmit();
    const {
        control,
        formState: { errors },
        getValues,
        register,
        reset,
        trigger,
        watch,
    } = useForm<Tcompany>({
        resolver: zodResolver(companySchema),
        defaultValues: company ? company : initCompany,
    });

    /* const logoFile = watch("logo");

    useEffect(() => {
        if (logoFile && logoFile.length > 0) {
            const fileReader = new FileReader();
            fileReader.onload = () =>
                setImagePreview(fileReader.result as string);
            fileReader.readAsDataURL(logoFile[0]);
            setFile(logoFile[0]);
        } else {
            setImagePreview(null);
        }
    }, [logoFile]); */

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        //console.log("-> click submit err: ", errors);
        const isValid = await trigger([
            "name",
            "address",
            "phone",
            "email",
            "bld",
            "abn",
            "bsb",
            "acc",
        ]);
        if (isValid) {
            const values = getValues();
            console.log("-> test: ", { ...values, id, req: "company" });
            submit(
                { ...values, id, req: "company" },
                { method: "PUT", action: "/management" }
            );
        }
    };

    const formContent = (
        <Form
            onSubmit={onSubmit}
            className="grid grid-cols-1 gap-2"
            encType="multipart/form-data"
        >
            <Card className="grid grid-cols-2  gap-3">
                {/* name  4*/}
                <div className="col-span-full">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-indigo-500"
                    >
                        {t("label.companyName")}
                    </label>
                    <div className="mt-1">
                        <input
                            {...register("name")}
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-indigo-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                    </div>
                </div>
                {/* address */}
                <div className="col-span-full">
                    <label
                        htmlFor="address"
                        className="block text-sm font-medium leading-6 text-indigo-500"
                    >
                        {t("label.address")}
                    </label>
                    <div className="mt-1">
                        <input
                            {...register("address")}
                            type="text"
                            id="address"
                            name="address"
                            required
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-indigo-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                    </div>
                </div>

                {/* phone */}
                <div className="col-span-1">
                    <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-indigo-500"
                    >
                        {t("label.tel")}
                    </label>
                    <div className="mt-1">
                        <input
                            {...register("phone")}
                            type="text"
                            id="phone"
                            name="phone"
                            required
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-indigo-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                    </div>
                </div>
                {/* email */}
                <div className="col-span-1">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-indigo-500"
                    >
                        {t("label.email1")}
                    </label>
                    <div className="mt-1">
                        <input
                            {...register("email")}
                            type="text"
                            id="email"
                            name="email"
                            required
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-indigo-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                    </div>
                </div>
                {/* bld */}
                <div className="col-span-1">
                    <label
                        htmlFor="bld"
                        className="block text-sm font-medium leading-6 text-indigo-500"
                    >
                        {t("label.bld")}
                    </label>
                    <div className="mt-1">
                        <input
                            {...register("bld")}
                            type="text"
                            id="bld"
                            name="bld"
                            required
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-indigo-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                    </div>
                </div>
                {/* abn */}
                <div className="col-span-1">
                    <label
                        htmlFor="abn"
                        className="block text-sm font-medium leading-6 text-indigo-500"
                    >
                        {t("label.abn")}
                    </label>
                    <div className="mt-1">
                        <input
                            {...register("abn")}
                            type="text"
                            id="abn"
                            name="abn"
                            required
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-indigo-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                    </div>
                </div>
                {/* bsb */}
                <div className="col-span-1">
                    <label
                        htmlFor="bsb"
                        className="block text-sm font-medium leading-6 text-indigo-500"
                    >
                        {t("label.bsb")}
                    </label>
                    <div className="mt-1">
                        <input
                            {...register("bsb")}
                            type="text"
                            id="bsb"
                            name="bsb"
                            required
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-indigo-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                    </div>
                </div>
                {/* acc */}
                <div className="col-span-1">
                    <label
                        htmlFor="acc"
                        className="block text-sm font-medium leading-6 text-indigo-500"
                    >
                        {t("label.acc")}
                    </label>
                    <div className="mt-1">
                        <input
                            {...register("acc")}
                            type="text"
                            id="acc"
                            name="acc"
                            required
                            className="outline-none h-9 block w-full rounded-md border-0 py-1.5 text-indigo-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                        />
                    </div>
                </div>
                {/* submit btn */}
            </Card>
            <section className="col-span-full flex items-center">
                <button
                    name="intent"
                    value="add"
                    type="submit"
                    className="w-20 mx-auto rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset hover:bg-indigo-700"
                    onClick={() => trigger()}
                >
                    {t("btn.update")}
                </button>
            </section>
        </Form>
    );

    const logoContent = <Card className="">123</Card>;

    const mainContent = (
        <section className="grid grid-cols-6 gap-x-8">
            <section className="col-span-4">
                <p className="text-lg text-indigo-600 text-bold mb-4">
                    {t("label.companyInfo")}
                </p>
                {formContent}
            </section>
            <section className="col-span-2">
                <p className="text-lg text-indigo-600 text-bold mb-4">
                    {t("label.logo")}
                </p>
                {logoContent}
            </section>
        </section>
    );

    return <section className="w-[60vw] mx-auto mt-10">{mainContent}</section>;
};

export default Company;