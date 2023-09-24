import React, { FC } from "react";
import MobileMenu from "./mobileMenu";

import { menuList } from "@/configs/menuList";
import StaticMenu from "./staticMenu";
import { t_permission } from "../layout/layout";

export type t_menuList = {
    name: string;
    href: string;
    icon: React.ForwardRefExoticComponent<
        Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
            title?: string | undefined;
            titleId?: string | undefined;
        } & React.RefAttributes<SVGSVGElement>
    >;
    current: boolean;
}[];

interface props {
    permissionData: t_permission;
    open: boolean;
    setOpen: (value: boolean) => void;
}

// create new menu list based on user permission
const initMenuList = (permission: t_permission) => {
    const temp = Object.values(permission);
    return menuList.filter((_, index) => {
        return temp[index];
    });
};

const MainMenu: FC<props> = ({ permissionData, open, setOpen }) => {
    const newMenuList = initMenuList(permissionData);

    return (
        <div>
            <MobileMenu menuList={newMenuList} open={open} setOpen={setOpen} />
            <StaticMenu menuList={newMenuList} />
        </div>
    );
};

export default MainMenu;
