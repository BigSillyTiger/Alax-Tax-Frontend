import type { ComponentPropsWithoutRef, FC } from "react";

type Tprops = ComponentPropsWithoutRef<"input"> & {
    name: string; //staff name
    uid: string; // staff uid
};

const CheckBox: FC<Tprops> = (props) => {
    const { onChange, checked, name, uid, ...restProps } = props;
    return (
        <div
            className={`inline-flex items-center w-auto border border-indigo-200 rounded-lg ${checked && "border-indigo-500 border-2"}`}
        >
            <input
                id="link-checkbox"
                type="checkbox"
                value=""
                checked={checked}
                onChange={onChange}
                className={`rounded-md size-6 p-2 text-blue-600 bg-gray-200 border border-gray-300 ml-2 mr-3 checked:bg-indigo-500`}
                {...restProps}
            />
            <label
                className={`flex flex-col items-center font-light text-gray-500 cursor-pointer select-none mr-2`}
                htmlFor="link-checkbox"
            >
                <p className={`text-lg ${checked && "font-bold"}`}>{name}</p>
                <p className="font-light text-sm">{uid}</p>
            </label>
        </div>
    );
};

export default CheckBox;
