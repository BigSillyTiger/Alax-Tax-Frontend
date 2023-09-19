import React, { FC, useState, useEffect } from "react";

interface searchProp {
    value: string;
    onChange: Function;
    debounce?: number;
}

const SearchBar: FC<searchProp> = ({
    value: initValue,
    onChange,
    debounce = 500, //...props
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
        <input
            className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-indigo-500"
            placeholder="Search..."
            //{...props}
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
            }}
        />
    );
};

export default SearchBar;
