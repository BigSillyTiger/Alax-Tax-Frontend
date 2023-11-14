import type { FC, ReactNode } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Animate from "../transitions/Animate";

type Tprops = {
    defaultOpen?: boolean;
    title: string;
    content: ReactNode;
};

const Toggle: FC<Tprops> = ({ defaultOpen = false, title, content }) => {
    return (
        <section className="my-2">
            <Disclosure defaultOpen={defaultOpen}>
                {({ open }) => (
                    /* Use the `open` state to conditionally change the direction of an icon. */
                    <>
                        <Disclosure.Button
                            className={
                                "flex w-full justify-between rounded-lg bg-indigo-100 px-4 py-2 text-left text-sm text-bold font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500/75"
                            }
                        >
                            <span>{title}</span>
                            <ChevronRightIcon
                                className={`${
                                    open ? "rotate-90 transform" : ""
                                } h-5 w-5 text-indigo-500`}
                            />
                        </Disclosure.Button>
                        <Animate>
                            <Disclosure.Panel className="px-2 pt-2 pb-2">
                                {content}
                            </Disclosure.Panel>
                        </Animate>
                    </>
                )}
            </Disclosure>
        </section>
    );
};

export default Toggle;
