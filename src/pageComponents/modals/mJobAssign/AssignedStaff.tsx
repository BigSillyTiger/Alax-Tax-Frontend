import Fieldset from "@/components/form/fieldset";
import { useTranslation } from "react-i18next";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Card from "@/components/card";
import { FieldArrayWithId, UseFieldArrayRemove } from "react-hook-form";
import { FC } from "react";
import { TworkLog } from "@/configs/schema/workSchema";

type Tprops = {
    fields: FieldArrayWithId<TworkLog>[];
    remove: UseFieldArrayRemove;
};

const AssignedStaff: FC<Tprops> = ({ fields, remove }) => {
    const { t } = useTranslation();
    return (
        <Fieldset
            title={t("label.assignedStaff")}
            sFieldset="col-span-full lg:col-span-5 my-2 mx-1 lg:h-[45vh] overflow-y-auto grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-8 p-4"
        >
            {fields.length ? (
                fields.map((field, index) => {
                    return (
                        <section
                            key={field.id}
                            className="col-span-full grid grid-cols-10 gap-x-1"
                        >
                            <div className="col-span-1 m-auto">
                                {/* x btn */}
                                <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-red-300 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                                    onClick={() => remove(index)}
                                >
                                    <span className="sr-only">
                                        {t("btn.close")}
                                    </span>
                                    <XMarkIcon
                                        className="h-4 w-3"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                            {/* content */}
                            <Card className="col-span-9 mt-3 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-8 bg-indigo-50 py-2">
                                {/* staff info */}
                                <div className="col-span-4 row-span-4"></div>
                            </Card>
                        </section>
                    );
                })
            ) : (
                <span className="text-bold text-indigo-300">
                    {t("tips.noAssignedStaff")}
                </span>
            )}
        </Fieldset>
    );
};

export default AssignedStaff;
