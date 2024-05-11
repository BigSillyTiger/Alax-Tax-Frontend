import { Row } from "@tanstack/react-table";

export const rangeFilterFn = <T>(
    row: Row<T>,
    id: string,
    value: [string, string]
) => {
    const newV = [parseFloat(value[0]), parseFloat(value[1])];
    if (value[0] !== "" && value[1] === "") {
        return (row.getValue(id) as number) >= newV[0];
    } else if (value[0] === "" && value[1] !== "") {
        return (row.getValue(id) as number) <= newV[1];
    } else if (value[0] !== "" && value[1] !== "") {
        return (
            (row.getValue(id) as number) <= newV[1] &&
            (row.getValue(id) as number) >= newV[0]
        );
    } else if (value[0] === "" && value[1] === "") {
        return true;
    }

    return value.includes(row.getValue(id));
};
