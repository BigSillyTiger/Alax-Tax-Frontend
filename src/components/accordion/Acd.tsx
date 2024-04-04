import type { ComponentPropsWithoutRef, FC } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

type Tprops = ComponentPropsWithoutRef<"div"> & {
    title: string;
};

const Acd: FC<Tprops> = ({ children, title }) => {
    return (
        <Accordion type="single" collapsible className="">
            <AccordionItem value="item-1">
                <AccordionTrigger>{title}</AccordionTrigger>
                <AccordionContent>{children}</AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default Acd;
