import type { ComponentPropsWithoutRef, FC } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Animate from "../transitions/Animate";

type Tprops = ComponentPropsWithoutRef<"div"> & {
    defaultOpen?: boolean;
    title: string;
    bColor?: string;
    hColor?: string;
    tColor?: string;
};

const Toggle: FC<Tprops> = ({
    defaultOpen = false,
    title,
    children,
    tColor = "text-indigo-900",
    bColor = "bg-indigo-100",
    hColor = "hover:bg-indigo-200",
}) => {
    return (
        <div className="my-2">
            <Disclosure defaultOpen={defaultOpen}>
                {({ open }) => (
                    /* Use the `open` state to conditionally change the direction of an icon. */
                    <>
                        <Disclosure.Button
                            className={`flex w-full justify-between rounded-lg ${bColor} px-4 py-2 text-left text-sm text-bold font-medium ${tColor} ${hColor} focus:outline-none focus-visible:ring focus-visible:ring-indigo-500/75`}
                        >
                            <span>{title}</span>
                            <ChevronRightIcon
                                className={`${
                                    open ? "rotate-90 transform" : ""
                                } h-5 w-5 ${tColor}`}
                            />
                        </Disclosure.Button>
                        <Animate>
                            <Disclosure.Panel static className="px-2 pt-2 pb-2">
                                {children}
                            </Disclosure.Panel>
                        </Animate>
                    </>
                )}
            </Disclosure>
        </div>
    );
};

export default Toggle;
