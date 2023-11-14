import { useState } from "react";
import type { FC } from "react";
import Card from "@/components/card";
import VHSwitch from "@/components/VHSwitch";

type Tprops = {
    items: { title: string; content: JSX.Element }[];
};

const ContentWithSwitch: FC<Tprops> = ({ items }) => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <div className="grid grid-cols-8 my-2">
            <div className="col-span-1 flex flex-col justify-start text-center">
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
            <Card className="col-span-7">
                {isChecked ? items[1].content : items[0].content}
            </Card>
        </div>
    );
};

export default ContentWithSwitch;
