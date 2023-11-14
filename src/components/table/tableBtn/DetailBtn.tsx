import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { Tclient } from "@/configs/schema/clientSchema";

type Tprops = {
    data: Tclient | any;
};

const DetailBtn: FC<Tprops> = ({ data }) => {
    const nevigate = useNavigate();
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                return nevigate("/clients/" + data.client_id, {
                    replace: false,
                });
            }}
        >
            <DocumentTextIcon
                className="h-6 w-6 text-indigo-500"
                aria-hidden="true"
            />
        </button>
    );
};

export default DetailBtn;
