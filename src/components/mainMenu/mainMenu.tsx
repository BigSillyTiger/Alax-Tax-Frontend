import type {
    FC,
    ForwardRefExoticComponent,
    SVGProps,
    RefAttributes,
} from "react";
import MobileMenu from "./mobileMenu";

import { menuList } from "@/configs/menuList";
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
    const user = useAdminStore((state) => state.user);
    const newMenuList = () => {
        const temp = Object.values({
            dashboard: user.dashboard,
            clients: user.clients,
            orders: user.orders,
            calendar: user.calendar,
            staff: user.staff,
            setting: user.setting,
        });
        return menuList.filter((_, index) => {
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
