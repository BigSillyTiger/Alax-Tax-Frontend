import { FC } from "react";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import Breadcrumbs from "./breadcrumbs";
import UserMenu from "./UserMenu";

type Tprops = {
    open: boolean;
    setOpen: (value: boolean) => void;
};

const HeadBar: FC<Tprops> = ({ setOpen }) => {
    return (
        <header className="lg:pl-[5vw]">
            <div className="sticky top-0 z-40 flex h-[7vh] shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                <button
                    type="button"
                    className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                    onClick={() => setOpen(true)}
                >
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="">
                    <Breadcrumbs />
                </div>

                {/* Separator */}
                <div
                    className="h-6 w-px bg-gray-900/10 lg:hidden"
                    aria-hidden="true"
                />

                <div className="flex flex-1 flex-row-reverse gap-x-4 self-stretch lg:gap-x-6">
                    <div className="flex items-center gap-x-4 lg:gap-x-6">
                        <button
                            type="button"
                            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                        >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Separator */}
                        <div
                            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                            aria-hidden="true"
                        />

                        {/* Profile dropdown */}
                        <UserMenu />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeadBar;
