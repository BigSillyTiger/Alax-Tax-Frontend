import { colorWithStaffUid } from "@/configs/utils/color";
import type { ComponentPropsWithoutRef, FC } from "react";
import { Input } from "./ui/input";

type Tprops = ComponentPropsWithoutRef<"input"> & {
    name: string; //staff name
    uid: string; // staff uid
};

const CheckBox: FC<Tprops> = (props) => {
    const { onChange, checked, onClick, name, uid, className, ...restProps } =
        props;

    return (
        <div
            className={`inline-flex items-center h-16 w-auto border-2 border-gray-200 rounded-lg ${checked && "border-indigo-500"} ${className}`}
        >
            <Input
                id={`link-checkbox-${uid}`}
                type="checkbox"
                value=""
                onClick={onClick}
                checked={checked}
                onChange={onChange}
                className={`size-6 p-2 bg-gray-200 border-gray-300 ml-2 mr-3 cursor-pointer`}
                {...restProps}
            />
            <label
                className={`flex flex-col items-center font-light ${colorWithStaffUid(uid).text} cursor-pointer select-none mr-2`}
                htmlFor={`link-checkbox-${uid}`}
            >
                <p
                    className={`text-lg font-bold ${checked && colorWithStaffUid(uid).text}`}
                >
                    {name}
                </p>
                <p className="text-sm font-normal">{uid}</p>
            </label>
        </div>
    );
};

export default CheckBox;
