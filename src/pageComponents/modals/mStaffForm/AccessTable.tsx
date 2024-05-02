import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { menuList } from "@/configs/utils/router";
import { TstaffForm } from "@/configs/schema/staffSchema";
import { UseFormReturn } from "react-hook-form";
import { atModalOpen } from "@/configs/atoms";
import { useAtom } from "jotai";
import { TmenuID } from "@/configs/types";
import { TadminAccess } from "@/configs/utils/staff";
import { mOpenOps } from "@/configs/utils/modal";

type Tprops = {
    register: UseFormReturn<TstaffForm>["register"];
    watch: UseFormReturn<TstaffForm>["watch"];
};

const AccessTable: FC<Tprops> = ({ register, watch }) => {
    const { t } = useTranslation();
    const [modalOpen] = useAtom(atModalOpen);
    const setRadioDisable = (page: TmenuID, adminNum: TadminAccess) => {
        return !(watch(page) === adminNum);
    };
    const newMenuList = menuList.map((item) => ({
        ...item,
        name: t(item.name),
    }));

    return (
        <div className={`pointer-events-none mx-2`}>
            <table className="min-w-full">
                <thead className="bg-indigo-200">
                    <tr>
                        <th
                            className={`text-base  ${modalOpen === mOpenOps.edit && "py-2"}`}
                        >
                            {t("label.page")}
                        </th>
                        <th className="text-base text-center">
                            {t("label.none")}
                        </th>
                        <th className="text-base text-center">
                            {t("label.readOnly")}
                        </th>
                        <th className="text-base text-center">
                            {t("label.fullAccess")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {newMenuList.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td
                                    className={`${modalOpen === mOpenOps.edit && "py-2"}`}
                                >
                                    {item.name}
                                </td>
                                <td className="bg-red-50">
                                    <input
                                        {...register(item.id, {
                                            valueAsNumber: true,
                                        })}
                                        className="h-full w-full"
                                        type="radio"
                                        value={0}
                                        checked={watch(item.id) === 0}
                                        disabled={setRadioDisable(item.id, 0)}
                                    />
                                </td>
                                <td className="bg-yellow-50">
                                    <input
                                        {...register(item.id, {
                                            valueAsNumber: true,
                                        })}
                                        className="h-full w-full"
                                        type="radio"
                                        value={1}
                                        checked={watch(item.id) === 1}
                                        disabled={setRadioDisable(item.id, 1)}
                                    />
                                </td>
                                <td className="bg-green-50">
                                    <input
                                        {...register(item.id, {
                                            valueAsNumber: true,
                                        })}
                                        className="h-full w-full"
                                        type="radio"
                                        value={2}
                                        checked={watch(item.id) === 2}
                                        disabled={setRadioDisable(item.id, 2)}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AccessTable;
