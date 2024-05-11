import { Input } from "@/components/ui/input";
import React from "react";

const DebouncedInput = ({
    value: initialValue,
    onChange,
    debounce = 500,
    className,
    ...props
}: {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
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
            className={`${className} h-6 mt-1 text-center`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
};

export default DebouncedInput;
