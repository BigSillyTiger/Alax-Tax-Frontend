import type { FC } from "react";
import Card from "@/components/card";
import { RangedDayPicker } from "@/pageComponents/DayPicker";
import WorkCard from "./WorkCard";

const DayPickerContent: FC = () => {
    return (
        <div className="m-3 grid grid-cols-1 lg:grid-cols-8 gap-x-4">
            <Card className="col-span-full lg:col-span-5 flex justify-center h-auto w-auto">
                <RangedDayPicker />
            </Card>
            <section className="col-span-full lg:col-span-3 flex justify-center h-auto w-auto flex-col gap-y-5 text-indigo-600 font-bold">
                <WorkCard />
            </section>
        </div>
    );
};

export default DayPickerContent;
