import { useState } from "react";
import type { FC } from "react";
import Card from "@/components/Card";
import VHSwitch from "@/components/VHSwitch";
import SubtableCard from "./SubtableCard";

type Tprops = {
    items: { title: string; content: JSX.Element }[];
};

const SubTableSwitch: FC<Tprops> = ({ items }) => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <SubtableCard className="grid grid-cols-8">
            <div className="col-span-1 flex flex-col justify-center text-center gap-x-1">
                <span className="text-bold text-indigo-500 pb-1">
                    {items[0].title}
                </span>
                <VHSwitch
                    direct="v"
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                />
                <span className="text-bold text-indigo-500 pt-1">
                    {items[1].title}
                </span>
            </div>
            <Card className="col-span-7 transition-all duration-300 ease-linear">
                {isChecked ? items[1].content : items[0].content}
            </Card>
        </SubtableCard>
    );
};

export default SubTableSwitch;
