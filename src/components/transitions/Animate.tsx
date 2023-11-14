import { Fragment } from "react";
import type { FC, ReactNode, ElementType } from "react";
import { Transition } from "@headlessui/react";

type Tprops = {
    as?: ElementType;
    children: ReactNode[] | ReactNode;
};

const Animate: FC<Tprops> = ({ as = Fragment, children }) => {
    return (
        <Transition
            as={as}
            enter="transition duration-250 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-250 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
        >
            {children}
        </Transition>
    );
};

export default Animate;
