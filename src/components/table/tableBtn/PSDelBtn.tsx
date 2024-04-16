import type { FC, PointerEventHandler } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Tpayslip } from "@/configs/schema/payslipSchema";
import { atModalOpen } from "@/configs/atoms";
import { useAtom } from "jotai";
import { mOpenOps } from "@/configs/utils/modal";

type Tprops = {
    data: Tpayslip;
    setData: (data: Tpayslip) => void;
};

const PSDelBtn: FC<Tprops> = ({ data, setData }) => {
    const [, setModalOpen] = useAtom(atModalOpen);

    const handleClick: PointerEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        setData(data);
        setModalOpen(mOpenOps.del_2);
        // using del_2 because the del is occupied by staff del modal
    };

    return (
        <button onClick={handleClick}>
            <TrashIcon className="h-6 w-6 text-indigo-500" aria-hidden="true" />
        </button>
    );
};

export default PSDelBtn;
