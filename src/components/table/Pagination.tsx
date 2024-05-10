import { Table } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

type Tprops<T> = {
    table: Table<T>;
};

const Pagination = <T extends object>({ table }: Tprops<T>) => {
    const { t } = useTranslation();

    return (
        <div className="flex items-center justify-end mt-2 gap-2">
            <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                }}
                className="p-2 bg-transparent ring-0 outline-none"
            >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                        {t("label.show") + " " + pageSize}
                    </option>
                ))}
            </select>
            <button
                onClick={() => {
                    table.previousPage();
                }}
                disabled={!table.getCanPreviousPage()}
                className="p-1 border border-gray-300 px-2 disabled:opacity-30"
            >
                {"<"}
            </button>
            <button
                onClick={() => {
                    table.nextPage();
                }}
                disabled={!table.getCanNextPage()}
                className="p-1 border border-gray-300 px-2 disabled:opacity-30"
            >
                {">"}
            </button>
            {/* page count */}
            <span className="flex items-center gap-1">
                <div>
                    <strong>Page</strong>
                </div>
                <strong>
                    {table.getState().pagination.pageIndex + 1}
                    {" of "}
                    {table.getPageCount()}
                </strong>
            </span>
        </div>
    );
};

export default Pagination;
