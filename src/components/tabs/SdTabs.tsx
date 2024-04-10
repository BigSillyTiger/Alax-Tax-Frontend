import type { ComponentPropsWithoutRef, FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TitemContent } from "@/configs/types";

type Tprops = ComponentPropsWithoutRef<"div"> & {
    defaultV?: string;
    items: TitemContent[];
};

const SdTabs: FC<Tprops> = ({ defaultV = "", items, className }) => {
    const value = defaultV || items[0].title;

    return (
        <Tabs defaultValue={value} className={`${className}`}>
            <TabsList className="">
                <div className="rounded-md bg-indigo-100 text-gray-600">
                    {items.map((item) => {
                        return (
                            <TabsTrigger value={item.title} className="">
                                {item.title}
                            </TabsTrigger>
                        );
                    })}
                </div>
            </TabsList>
            {items.map((item) => {
                return (
                    <TabsContent value={item.title} className="">
                        {item.content}
                    </TabsContent>
                );
            })}
        </Tabs>
    );
};

export default SdTabs;
