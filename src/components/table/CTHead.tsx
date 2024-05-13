import { flexRender, Table } from "@tanstack/react-table";
import { HeaderFilterFaceted } from "./HeaderFilter";
import { sortingIcon } from "./config";
import CTh from "./CTh";

type Tprops<T> = {
    className?: string;
    hFilter?: boolean;
    cnTh?: string;
    table: Table<T>;
};

const CTHead = <T extends object>({
    className = "bg-indigo-50",
    hFilter = false,
    cnTh = "",
    table,
}: Tprops<T>) => {
    const tableHeader = table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
                <CTh
                    key={header.id}
                    scope="col"
                    className={`${cnTh}`}
                    table={table}
                    header={header}
                >
                    <button onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                        {sortingIcon(header.column.getIsSorted())}
                    </button>
                    {hFilter && header.column.getCanFilter() ? (
                        <div className="mr-3">
                            <HeaderFilterFaceted column={header.column} />
                        </div>
                    ) : null}
                </CTh>
            ))}
        </tr>
    ));
    return <thead className={`w-full top-0 ${className}`}>{tableHeader}</thead>;
};

export default CTHead;
