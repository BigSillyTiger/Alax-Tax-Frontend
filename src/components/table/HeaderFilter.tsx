import { Column, Table } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

type Tprops<T> = {
    column: Column<T, unknown>;
    table: Table<T>;
};

const HeaderFilter = <T extends object>({ column, table }: Tprops<T>) => {
    const { t } = useTranslation();

    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id);

    const content =
        typeof firstValue === "number" ? (
            <div className="grid grid-cols-2 gap-x-2">
                <input
                    type="number"
                    value={
                        ((column.getFilterValue() as string)?.[0] ??
                            "") as string
                    }
                    min={0}
                    onChange={(e) =>
                        column.setFilterValue((old: string) => [
                            e.target.value,
                            old?.[1],
                        ])
                    }
                    placeholder={t("placeholder.min")}
                    className="outline-none h-6 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 col-span-1"
                />
                <input
                    type="number"
                    value={
                        ((column.getFilterValue() as string)?.[1] ??
                            "") as string
                    }
                    min={0}
                    onChange={(e) =>
                        column.setFilterValue((old: string) => [
                            old?.[0],
                            e.target.value,
                        ])
                    }
                    placeholder={t("placeholder.max")}
                    className="outline-none h-6 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2 col-span-1"
                />
            </div>
        ) : (
            <input
                type="text"
                value={(column.getFilterValue() ?? "") as string}
                onChange={(e) => column.setFilterValue(e.target.value)}
                placeholder={`${t("placeholder.search")}...`}
                className="outline-none h-6 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
            />
        );
    return <div className="mt-1">{content}</div>;
};

export default HeaderFilter;
