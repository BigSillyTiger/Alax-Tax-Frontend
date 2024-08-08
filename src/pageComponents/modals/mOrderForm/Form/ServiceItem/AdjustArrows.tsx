import { Nbtn } from "@/components/btns";
import {
    ChevronDoubleDownIcon,
    ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";
import type { FC } from "react";
import { UseFieldArraySwap } from "react-hook-form";

type Tprops = {
    index: number;
    length: number;
    swap: UseFieldArraySwap;
};

const AdjustArrows: FC<Tprops> = ({ index, length, swap }) => {
    return (
        <div className="flex flex-col justify-around">
            {index != 0 && (
                <Nbtn
                    type="button"
                    className="h-10"
                    onClick={() => {
                        swap(index, index - 1);
                    }}
                >
                    <ChevronDoubleUpIcon
                        className="h-6 w-6 m-auto"
                        aria-hidden="true"
                    />
                </Nbtn>
            )}
            {index + 1 !== length && (
                <Nbtn
                    type="button"
                    className="h-10"
                    onClick={() => {
                        swap(index, index + 1);
                    }}
                >
                    <ChevronDoubleDownIcon
                        className="h-6 w-6 m-auto"
                        aria-hidden="true"
                    />
                </Nbtn>
            )}
        </div>
    );
};

export default AdjustArrows;
