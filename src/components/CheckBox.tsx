import type { ComponentPropsWithoutRef, FC } from "react";

type Tprops = ComponentPropsWithoutRef<"input"> & {
    name: string; //staff name
    uid: string; // staff uid
};

const CheckBox: FC<Tprops> = (props) => {
    const { onChange, checked, name, uid, ...restProps } = props;
    return (
        <div
            className={`inline-flex items-center h-16 w-auto border-2 border-gray-200 rounded-lg ${checked && "border-indigo-500"}`}
        >
            <input
                id={`link-checkbox-${uid}`}
                type="checkbox"
                value=""
                checked={checked}
                onChange={onChange}
                className={`rounded-md size-6 p-2 text-blue-600 bg-gray-200 border-gray-300 ml-2 mr-3 checked:bg-indigo-500`}
                {...restProps}
            />
            <label
                className={`flex flex-col items-center font-light text-gray-500 cursor-pointer select-none mr-2`}
                htmlFor={`link-checkbox-${uid}`}
            >
                <p
                    className={`text-lg font-bold ${checked && "text-indigo-500"}`}
                >
                    {name}
                </p>
                <p className="font-light text-sm">{uid}</p>
            </label>
        </div>
    );
};

export default CheckBox;
