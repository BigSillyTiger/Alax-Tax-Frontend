import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
    React.ElementRef<typeof SeparatorPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
    (
        { className, orientation = "horizontal", decorative = true, ...props },
        ref
    ) => (
        <SeparatorPrimitive.Root
            ref={ref}
            decorative={decorative}
            orientation={orientation}
            className={cn(
                //"shrink-0 bg-borde",
                "shrink-0 bg-indigo-200",
                orientation === "horizontal"
                    ? "h-[1px] w-full"
                    : "h-full w-[1px]",
                className,
                decorative ? "bg-trasparent" : "bg-indigo-200", // Set background color based on decorative prop
                decorative && "border-none", // Hide border if decorative
                decorative && "border-dashed", // Add dashed border style if decorative
                decorative && "border-[1px]", // Adjust border thickness if decorative
                !decorative && "border-solid", // Add solid border style if not decorative
                !decorative && "border-[1px]", // Adjust border thickness if not decorative
                !decorative && orientation === "horizontal" && "h-[1px]", // Adjust height if not decorative and horizontal
                !decorative && orientation === "vertical" && "w-[1px]" // Adjust width if not decorative and vertical
            )}
            {...props}
        />
    )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
