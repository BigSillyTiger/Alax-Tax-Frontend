import type { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAtom } from "jotai";
//import Fieldset from "@/components/form/fieldset";
import { TstaffForm, staffForm } from "@/configs/schema/staffSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { atStaff } from "./staff/states";
import { menuList } from "@/configs/menuList";

const Calendar: FC = () => {
    const { t } = useTranslation();
    const [staff] = useAtom(atStaff);

    const { register } = useForm<TstaffForm>({
        resolver: zodResolver(staffForm),
        defaultValues: staff,
        /*         mode: "onBlur",
        reValidateMode: "onBlur", */
    });

    const AdminTable = () => (
        <>
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
                        {menuList.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td className="bg-yellow-50">
                                        <input
                                            {...register(item.id, {
                                                valueAsNumber: true,
                                            })}
                                            type="radio"
                                            value={1}
                                            className="h-full w-full border-2 border-red-400 bg-blue-400"
                                        />
                                    </td>
                                    <td className="bg-green-50">
                                        <input
                                            {...register(item.id, {
                                                valueAsNumber: true,
                                            })}
                                            type="radio"
                                            value={2}
                                            className="h-full w-full"
                                        />
                                    </td>
                                    <td className="bg-red-50">
                                        <input
                                            {...register(item.id, {
                                                valueAsNumber: true,
                                            })}
                                            type="radio"
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
        </>
    );

    return (
        <>
            <AdminTable />
        </>
    );
};

export default Calendar;
