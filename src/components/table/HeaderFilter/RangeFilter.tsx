import { useTranslation } from "react-i18next";
import DebouncedInput from "./DebouncedInput";
import { Column } from "@tanstack/react-table";

type Tprops<T> = {
    column: Column<T, unknown>;
    values: [number, number];
};

const RangeFilter = <T extends object>({ column, values }: Tprops<T>) => {
    const { t } = useTranslation();
    // the column.getFacetedMinMaxValues can not asure the return value is fo the order [min, max]
    // so I get the min and max value from the return value muanlly
    const newPairV = column.getFacetedMinMaxValues()?.flat() ?? [];
    const facetedMin = Math.min(...newPairV.map(Number));
    const facetedMax = Math.max(...newPairV.map(Number));

    return (
        <div>
            <div className="flex flex-col gap-y-2 w-full">
                <div className="flex flex-row justify-center items-center gap-x-1">
                    <span className="text-gray-500">
                        {t("placeholder.min")}
                    </span>
                    <DebouncedInput
                        type="number"
                        min={facetedMin}
                        max={facetedMax}
                        value={(values as [number, number])?.[0] ?? ""}
                        onChange={(value) =>
                            column.setFilterValue((old: [number, number]) => [
                                value,
                                old?.[1],
                            ])
                        }
                        placeholder={`${facetedMin}`}
                        className="w-full"
                    />
                </div>
                <div className="flex flex-row justify-center items-center gap-x-1">
                    <span className="text-gray-500">
                        {t("placeholder.max")}
                    </span>
                    <DebouncedInput
                        type="number"
                        min={facetedMin}
                        max={facetedMax}
                        value={(values as [number, number])?.[1] ?? ""}
                        onChange={(value) =>
                            column.setFilterValue((old: [number, number]) => [
                                old?.[0],
                                value,
                            ])
                        }
                        placeholder={`${facetedMax}`}
                        className="w-full"
                    />
                </div>
            </div>
            <div className="h-1" />
        </div>
    );
};

export default RangeFilter;
