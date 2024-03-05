import { FC, Fragment, MouseEvent, TouchEvent } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { API_ADMIN } from "@/apis";
import { useAdminStore } from "@/configs/zustore";
import UserIcon from "../../components/UserIcon";

const userNavigation = [
    { name: "Your profile", href: "#" },
    { name: "Sign out", href: "#" },
];

const UserMenu: FC = () => {
    const { t } = useTranslation();
    const nevigate = useNavigate();

    const user = useAdminStore((state) => state.currentUser);

    const handleLogout = async (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        await API_ADMIN.adminLogout();
        return nevigate("/login", { replace: true }); // redirect does not work here
    };

    return (
        <Menu as="div" className="relative">
            <Menu.Button className="-m-1.5 flex items-center p-1.5">
                <span className="sr-only">{t("sr.openHeadBarMenu")}</span>
                <UserIcon fName={user.first_name} lName={user.last_name} />
                <span className="hidden lg:flex lg:items-center">
                    <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                    >
                        {user.first_name}
                    </span>
                    <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </span>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                            {({ active }) => (
                                <button
                                    onClick={handleLogout}
                                    className={`
                                        ${active ? "bg-gray-50" : ""} 
                                        "block px-3 py-1 text-sm leading-6 text-gray-900")
                                    `}
                                >
                                    {item.name}
                                </button>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default UserMenu;
