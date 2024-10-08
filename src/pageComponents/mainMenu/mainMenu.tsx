import type {
    FC,
    ForwardRefExoticComponent,
    SVGProps,
    RefAttributes,
} from "react";
import MobileMenu from "./mobileMenu";

import { defaultMenuList } from "@/configs/utils/router";

import { Menu2 } from "./menu";
import { Tpermission } from "@/configs/schema/universSchema";
import { useAdminStore } from "@/configs/zustore";
import { useTranslation } from "react-i18next";

export type TmenuList = {
    name: string;
    href: string;
    icon: ForwardRefExoticComponent<
        Omit<SVGProps<SVGSVGElement>, "ref"> & {
            title?: string | undefined;
            titleId?: string | undefined;
        } & RefAttributes<SVGSVGElement>
    >;
    current: boolean;
}[];

type Tprops = {
    permissionData?: Tpermission;
    open: boolean;
    setOpen: (value: boolean) => void;
};

// create new menu list based on user permission

const MainMenu: FC<Tprops> = ({ open, setOpen }) => {
    const { t } = useTranslation();
    const user = useAdminStore((state) => state.currentAdmin);
    // generate new menu list based on current user permission
    const newMenuList = () => {
        //
        const temp = Object.values(
            defaultMenuList.reduce(
                (acc, item) => {
                    acc[item.id] = user[item.id];
                    return acc;
                },
                {} as Record<string, number>
            )
        );
        return defaultMenuList
            .filter((_, index) => {
                // if temp[index] is > 0, then return the menu item => display it
                // otherwise, return undefined => hide it
                return temp[index];
            })
            .map((item) => ({
                ...item,
                name: t(item.name),
            }));
    };

    return (
        <div>
            <MobileMenu
                menuList={newMenuList()}
                open={open}
                setOpen={setOpen}
            />
            <Menu2 menuList={newMenuList()} />
        </div>
    );
};

export default MainMenu;
