import type { FC, PointerEventHandler, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { Tclient } from "@/configs/schema/clientSchema";

type Tprops = {
    data: Tclient;
    name: string | ReactNode;
};

const DetailBtn: FC<Tprops> = ({ data, name }) => {
    const nevigate = useNavigate();

    const handleClick: PointerEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        return nevigate("/clients/" + data.cid, {
            replace: false,
        });
    };

    return (
        <button
            onClick={handleClick}
            className="cursor-pointer flex flex-row justify-center items-center w-full"
        >
            {name}
            <DocumentTextIcon
                className="h-6 w-6 text-indigo-500"
                aria-hidden="true"
            />
        </button>
    );
};

export default DetailBtn;
