import type { FC, MouseEvent, TouchEvent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { API_ADMIN } from "@/apis";
import { useAdminStore } from "@/configs/zustore";
import UserIcon from "../../components/UserIcon";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import i18n from "@/configs/i18n";

const userNavigation = [{ name: i18n.t("btn.signOut"), href: "#" }];

const UserMenu: FC = () => {
    const { t } = useTranslation();
    const nevigate = useNavigate();
    //const userNavigation = [{ name: t("btn.signOut"), href: "#" }];

    const user = useAdminStore((state) => state.currentUser);

    const handleLogout = async (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        await API_ADMIN.adminLogout();
        return nevigate("/login", { replace: true }); // redirect does not work here
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row items-center outline-none ring-0">
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
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {userNavigation.map((item) => (
                    <DropdownMenuItem key={item.name} className="font-bold">
                        <button onClick={handleLogout}>{item.name}</button>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserMenu;
