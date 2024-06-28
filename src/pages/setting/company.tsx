import { useEffect, useState } from "react";
import type { FC, FormEvent, ChangeEvent } from "react";
import { useSubmit, Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tcompany, companySchema } from "@/configs/schema/settingSchema";
import { useTranslation } from "react-i18next";
import Card from "@/components/Card";
import { Nbtn } from "@/components/btns";
import { API_SETTING } from "@/apis";
import { toastSuccess } from "@/lib/toaster";
import { RES_STATUS } from "@/configs/types";
import CompanyBasic from "./CompanyBasic";

type Tprops = {
    company: Tcompany | null;
    logo: string;
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
        defaultValues: company ? company : companySchema.parse({}),
    });

    useEffect(() => {
        if (typeof logo === "string") setLogoSrc(logo);
    }, [logo]);

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
            console.log("---> submit company: ", values);
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
            <Card className="">
                <CompanyBasic register={register} />
            </Card>
            {/* submit btn */}
            <div className="col-span-full flex items-center mt-1">
                <Nbtn
                    name="intent"
                    value="add"
                    type="submit"
                    className="w-full"
                    onClick={() => trigger()}
                >
                    {t("btn.updateCompany")}
                </Nbtn>
            </div>
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
                <div className="grid grid-cols-2 gap-x-3 mt-2">
                    <Card className="col-span-1">
                        <p className="text-indigo-500 text-xs mb-2">
                            {t("label.logoCurrent")}
                        </p>
                        <img
                            id="logo"
                            src={logoSrc}
                            className={`max-w-[100px] max-h-[100px] m-auto`}
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
                                className={`max-w-[100px] max-h-[100px] m-auto`}
                            />
                        </Card>
                    )}
                </div>
            </Card>
            <div className="mt-1 flex justify-center">
                <Nbtn
                    onClick={async () => {
                        if (uploadFile) {
                            const result =
                                await API_SETTING.logoUpdate(uploadFile);
                            if (result.status === RES_STATUS.SUC_UPDATE_LOGO) {
                                toastSuccess(t("toastS.updateLogo"));
                                setLogoSrc(result.data);
                            }
                        }
                    }}
                    className={`h-[4dvh] mt-[1dvh]`}
                >
                    {t("btn.updateLogo")}
                </Nbtn>
            </div>
        </>
    );

    const mainContent = (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-x-8">
            <div className="col-span-1 md:col-span-4">
                <p className="text-lg text-indigo-600 text-bold mb-4">
                    {t("label.companyInfo")}
                </p>
                {formContent}
            </div>
            <div className="col-span-1 md:col-span-2">
                <p className="text-lg text-indigo-600 text-bold mb-4">
                    {t("label.logo")}
                </p>
                {logoContent}
            </div>
        </div>
    );

    return <div className="mx-auto mt-10">{mainContent}</div>;
};

export default Company;
