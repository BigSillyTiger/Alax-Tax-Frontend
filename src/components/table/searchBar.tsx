import { useState, useEffect } from "react";
import type { FC } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type Tprops = {
    value: string;
    onChange: (value: string) => void;
    debounce?: number;
    className?: string;
};

const SearchBar: FC<Tprops> = ({
    value: initValue,
    onChange,
    debounce = 500,
    className = "",
}) => {
    const [value, setValue] = useState(initValue);

    useEffect(() => {
        setValue(initValue);
    }, [initValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);
        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <div className={`flex flex-auto ${className}`}>
            <span className="sr-only">Search bar</span>
            <MagnifyingGlassIcon
                className="h-6 w-6 text-indigo-500 my-auto"
                aria-hidden="true"
            />
            <input
                className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-indigo-500"
                placeholder="Search..."
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
        </div>
    );
};

export default SearchBar;
