import { FC, ReactNode } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

type Tprops = {
    tipsContent: string | ReactNode;
    children: ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    delay?: number;
    sideOffset?: number;
};

const HoverTips: FC<Tprops> = ({
    children,
    tipsContent,
    side = "top",
    delay = 500,
    sideOffset = 4,
}) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={delay}>
                <TooltipTrigger>
                    {/* <Button variant="outline">Hover</Button> */}
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} sideOffset={sideOffset}>
                    {tipsContent}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default HoverTips;
