import { Input } from "@/components/ui/input";
import React, { FC } from "react";

type Tprops = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
};

const DebouncedInput: FC<Tprops> = ({
    value: initialValue,
    onChange,
    debounce = 500,
    className,
    ...props
}) => {
    const [value, setValue] = React.useState(initialValue);

    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <Input
            {...props}
            type="search"
            className={`${className} h-6 mt-1 text-center`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
};

export default DebouncedInput;
