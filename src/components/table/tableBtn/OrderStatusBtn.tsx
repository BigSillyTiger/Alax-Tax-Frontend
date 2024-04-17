import { Fragment } from "react";
import type { FC, ReactNode } from "react";
import { useSubmit } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Torder } from "@/configs/schema/orderSchema";
import { useRouterStore } from "@/configs/zustore";
import { capFirstLetter, genAction } from "@/lib/literals";
import { BG_SLATE, statusColor } from "@/configs/utils/color";
import { ORDER_STATUS } from "@/configs/utils/setting";

type Tprops = {
    mLabel: ReactNode | string;
    data: Torder;
};

// this menu btn group component is highly designed for order status change usage
const OrderStatusBtn: FC<Tprops> = ({ mLabel, data }) => {
    const submit = useSubmit();
    const currentRouter = useRouterStore((state) => state.currentRouter);

    const handleClick = async (oid: string, status: string) => {
        submit(
            { req: "orderStatus", oid, status },
            {
                method: "PUT",
                action:
                    currentRouter === "client"
                        ? genAction(currentRouter, data.fk_cid)
                        : genAction(currentRouter),
            }
        );
    };

    const menuContent = ORDER_STATUS.map((item, index) => {
        if (item.toLocaleLowerCase() === data.status.toLocaleLowerCase())
            return;

        return (
            <div className="p-1" key={index}>
                <Menu.Item as={Fragment}>
                    {({ active }) => (
                        <button
                            onClick={() => {
                                //e.preventDefault();
                                handleClick(data.oid, item);
                            }}
                            className={`group flex w-full items-center rounded-md px-2 py-2 text-sm text-bold ${statusColor[item].text} ${
                                active ? statusColor[item].bg : BG_SLATE
                            }`}
                        >
                            {capFirstLetter(item)}
                        </button>
                    )}
                </Menu.Item>
            </div>
        );
    }).filter((item) => item !== null && item !== undefined);

    return (
        <Menu as="div" className="relative">
            {/* <Menu as="div" className="relative"> */}
            <Menu.Button>{mLabel}</Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    {menuContent}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default OrderStatusBtn;
