import "@tanstack/react-table";
//import { RowData } from "@tanstack/react-table";
declare module "@tanstack/react-table" {
    //allows us to define custom properties for our columns
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: "text" | "range" | "select";
    }
}
