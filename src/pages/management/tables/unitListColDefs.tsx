import { Cell } from "@tanstack/react-table";

const UnitListColDefs = [
    {
        header: "ID",
        accessorKey: "id",
        cell: (info: Cell<{ id: number }, number>) => {
            return <span>{info.getValue()}</span>;
        },
    },
    {
        header: "Unit",
        accessorKey: "unit_name",
        cell: (info: Cell<{ id: string }, string>) => {
            return <span>{info.getValue()}</span>;
        },
    },
    {
        header: "Menu",
        cell: (info: Cell<{ menu: string }, string>) => {
            return <></>;
        },
    },
];

export type TunitListColDefs = typeof UnitListColDefs;
export default UnitListColDefs;
