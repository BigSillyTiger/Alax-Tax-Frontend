import type {
    FC,
    ForwardRefExoticComponent,
    SVGProps,
    RefAttributes,
} from "react";
import MobileMenu from "./mobileMenu";

import { menuList } from "@/configs/utils";
import StaticMenu from "./staticMenu";
import { Tpermission } from "@/configs/schema/universSchema";
import { useAdminStore } from "@/configs/zustore";

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
    const user = useAdminStore((state) => state.currentUser);
    // generate new menu list based on current user permission
    const newMenuList = () => {
        //
        const temp = Object.values(
            menuList.reduce(
                (acc, item) => {
                    acc[item.id] = user[item.id];
                    return acc;
                },
                {} as Record<string, number>
            )
        );
        return menuList.filter((_, index) => {
            // if temp[index] is > 0, then return the menu item => display it
            // otehrwise, return undefined => hide it
            return temp[index];
        });
    };

    return (
        <div>
            <MobileMenu
                menuList={newMenuList()}
                open={open}
                setOpen={setOpen}
            />
            <StaticMenu menuList={newMenuList()} />
        </div>
    );
};

export default MainMenu;
