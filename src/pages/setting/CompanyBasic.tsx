import { Input } from "@/components/ui/input";
import { Tcompany } from "@/configs/schema/settingSchema";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

type Tprops = {
    register: UseFormReturn<Tcompany>["register"];
};

const CompanyBasic: FC<Tprops> = ({ register }) => {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-2 gap-3">
            {/* name  4*/}
            <div className="col-span-full">
                <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-indigo-500"
                >
                    {t("label.companyName")}
                </label>
                <div className="mt-1">
                    <Input
                        {...register("name")}
                        type="text"
                        id="name"
                        name="name"
                        required
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
                    <Input
                        {...register("address")}
                        type="text"
                        id="address"
                        name="address"
                        required
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
                    <Input
                        {...register("phone")}
                        type="text"
                        id="phone"
                        name="phone"
                        required
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
                    <Input
                        {...register("email")}
                        type="text"
                        id="email"
                        name="email"
                        required
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
                    <Input
                        {...register("bld")}
                        type="text"
                        id="bld"
                        name="bld"
                        required
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
                    <Input
                        {...register("abn")}
                        type="text"
                        id="abn"
                        name="abn"
                        required
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
                    <Input
                        {...register("bsb")}
                        type="text"
                        id="bsb"
                        name="bsb"
                        required
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
                    <Input
                        {...register("acc")}
                        type="text"
                        id="acc"
                        name="acc"
                        required
                    />
                </div>
            </div>

            {/* deposit reate */}
            <div className="col-span-1 relative inline-block">
                <label
                    htmlFor="dRate"
                    className="block text-sm font-medium leading-6 text-indigo-500"
                >
                    {t("label.dRate")}
                </label>
                <div className="mt-1">
                    <Input
                        {...register("deposit_rate")}
                        type="number"
                        id="dRate"
                        //name="dRate"
                        min={0}
                        step={1}
                        required
                        className="pr-10"
                    />
                    <span className="text-indigo-500 font-bold text-lg absolute top-[50%] right-4 pointer-events-none">
                        %
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CompanyBasic;
