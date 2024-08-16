import type { FC } from "react";
import { useState } from "react";
import SubtableCard from "./SubtableCard";
//import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { RadioGroup } from "@headlessui/react";
import Card from "../Card";

type Tprops = { items: { title: string; content: JSX.Element }[] };

const SubTableTabs: FC<Tprops> = ({ items }) => {
    const [tab, setTab] = useState("I");
    const handleChange = (e: string) => {
        setTab(e);
    };
    return (
        <SubtableCard className="flex flex-row justify-between items-center w-[95%] gap-x-4">
            <RadioGroup
                value={tab}
                onChange={handleChange}
                className={"w-[10%]"}
            >
                <div className="flex flex-col justify-center items-stretch gap-y-2">
                    <RadioGroup.Option
                        value="I"
                        className={({ checked, active }) =>
                            `${active ? "border-indigo-600 ring-2 ring-indigo-600" : "border-gray-300"} ${checked ? "border-indigo-600 border bg-indigo-500 text-slate-100" : "border-gray-200 border text-indigo-500"} relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none`
                        }
                    >
                        {items[0].title}
                    </RadioGroup.Option>
                    <RadioGroup.Option
                        value="Q"
                        className={({ checked, active }) =>
                            `${active ? "border-indigo-600 ring-2 ring-indigo-600" : "border-gray-300"} ${checked ? "border-indigo-600 border bg-indigo-500 text-slate-100" : "border-gray-200 border text-indigo-500"} relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none`
                        }
                    >
                        {items[1].title}
                    </RadioGroup.Option>
                </div>
            </RadioGroup>
            <Card className="grow transition-all duration-300 ease-linear">
                {tab === "I" ? items[0].content : items[1].content}
            </Card>
        </SubtableCard>
    );
};

export default SubTableTabs;
