import { FC, ReactNode } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

type Tprops = {
    content: string | ReactNode;
    tipsContent: string | ReactNode;
};

const HoverTips: FC<Tprops> = ({ content, tipsContent }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {/* <Button variant="outline">Hover</Button> */}
                    {content}
                </TooltipTrigger>
                <TooltipContent>{tipsContent}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default HoverTips;
