import { useState } from "react";
import type { FC, FormEvent, ChangeEvent } from "react";
import { useSubmit, Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tcompany, companySchema } from "@/configs/schema/settingSchema";
import { useTranslation } from "react-i18next";
import Card from "@/components/card";
import { NormalBtn } from "@/components/btns";
import { API_MANAGE } from "@/apis";
import { toastSuccess } from "@/utils/toaster";

type Tprops = {
    company: Tcompany | null;
    logo: string;
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

const Company: FC<Tprops> = ({ company, logo }) => {
    const { t } = useTranslation();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [logoSrc, setLogoSrc] = useState<string>(logo);
    const [id] = useState<number>(company?.id ? company.id : 0);
    const submit = useSubmit();
    const {
        //control,
        //formState: { errors },
        getValues,
        register,
        //reset,
        trigger,
        //watch,
    } = useForm<Tcompany>({
        resolver: zodResolver(companySchema),
        defaultValues: company ? company : initCompany,
    });

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setUploadFile(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
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
            submit(
                { ...values, id, req: "company" },
                { method: "PUT", action: "/setting" }
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
            <section className="col-span-full flex items-center mt-1">
                <button
                    name="intent"
                    value="add"
                    type="submit"
                    className="w-full mx-auto rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset hover:bg-indigo-700"
                    onClick={() => trigger()}
                >
                    {t("btn.updateCompany")}
                </button>
            </section>
        </Form>
    );

    const logoContent = (
        <>
            <Card className="">
                <label
                    htmlFor="logo"
                    className="block text-sm font-medium leading-6 text-indigo-500"
                >
                    {t("label.logo")}
                </label>
                <input
                    type="file"
                    id="logo"
                    name="logo"
                    accept=".png,.jpg,.jpeg"
                    onChange={handleImageChange}
                    className="outline-none h-full block w-full rounded-md border-0 py-1.5 text-indigo-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                />
                <section className="grid grid-cols-2 gap-x-3 mt-2">
                    <Card className="col-span-1">
                        <p className="text-indigo-500 text-xs mb-2">
                            {t("label.logoCurrent")}
                        </p>
                        <img
                            id="logo"
                            src={logoSrc}
                            className="max-w-[100px] max-h-[100px] m-auto"
                        />
                    </Card>
                    {imagePreview && (
                        <Card className="col-span-1">
                            <p className="text-indigo-500 text-xs mb-2">
                                {t("label.logoUpload")}
                            </p>
                            <img
                                id="imagePreview"
                                src={imagePreview}
                                alt="Image preview"
                                className="max-w-[100px] max-h-[100px] m-auto"
                            />
                        </Card>
                    )}
                </section>
            </Card>
            <div className="mt-1">
                <NormalBtn
                    name={t("btn.updateLogo")}
                    onClick={async () => {
                        if (uploadFile) {
                            const result =
                                await API_MANAGE.logoUpdate(uploadFile);
                            if (result.status === RES_STATUS.SUC_UPDATE_LOGO) {
                                toastSuccess(t("toastS.updateLogo"));
                                setLogoSrc(result.data);
                            }
                        }
                    }}
                    className="h-[4vh] mt-[1vh]"
                />
            </div>
        </>
    );

    const mainContent = (
        <section className="grid grid-cols-1 md:grid-cols-6 gap-x-8">
            <section className="col-span-1 md:col-span-4">
                <p className="text-lg text-indigo-600 text-bold mb-4">
                    {t("label.companyInfo")}
                </p>
                {formContent}
            </section>
            <section className="col-span-1 md:col-span-2">
                <p className="text-lg text-indigo-600 text-bold mb-4">
                    {t("label.logo")}
                </p>
                {logoContent}
            </section>
        </section>
    );

    return <section className="mx-auto mt-10">{mainContent}</section>;
};

export default Company;
