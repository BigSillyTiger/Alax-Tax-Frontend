import { Atel } from "@/components/aLinks";
import Card from "@/components/Card";
import { Badgepop } from "@/components/popover";
import SingleField from "@/components/SingleField";
import { linearLargeBG } from "@/configs/utils/color";
import { useOrderArrangementStore } from "@/configs/zustore/orderArrangeStore";
import { UserIcon, PhoneIcon, HomeIcon } from "@heroicons/react/24/outline";
import type { FC } from "react";
//import { useTranslation } from "react-i18next";

const OrderArrangeList: FC = () => {
    //const { t } = useTranslation();
    /* const selectedDate = useOrderArrangementStore(
        (state) => state.selectedDate
    ); */
    /* const orderArrangement = useOrderArrangementStore(
        (state) => state.orderArrangement
    ); */
    const currentOA = useOrderArrangementStore((state) => state.currentOA);

    const orderListContent =
        currentOA && currentOA.arrangement && currentOA.arrangement.length ? (
            currentOA.arrangement.map((oa, index) => {
                return (
                    <Card key={index} className={`m-2 ${linearLargeBG}`}>
                        <SingleField label={<UserIcon />}>
                            <div className="font-bold text-indigo-700">
                                {oa.order.first_name +
                                    " " +
                                    oa.order.last_name +
                                    " / " +
                                    oa.order.fk_cid +
                                    " / " +
                                    oa.order.oid}
                            </div>
                        </SingleField>
                        <SingleField label={<PhoneIcon />}>
                            <Atel href={oa.order.phone} />
                        </SingleField>
                        <SingleField label={<HomeIcon />}>
                            {oa.order.address +
                                ", " +
                                oa.order.suburb +
                                ", " +
                                oa.order.city +
                                ", " +
                                oa.order.state +
                                ", " +
                                oa.order.postcode}
                        </SingleField>
                        {/* <NameBadge
                                        key={index}
                                        name={
                                            wl.first_name + " " + wl.last_name
                                        }
                                        uid={wl.fk_uid}
                                    /> */}
                        <div className="flex flex-row flex-wrap gap-2 border-t border-indigo-400 border-dashed pt-2 my-2">
                            {oa.wl.map((wl, index) => (
                                <Badgepop
                                    key={index}
                                    name={wl.first_name + " " + wl.last_name}
                                    uid={wl.fk_uid}
                                    content={wl.wl_note}
                                />
                            ))}
                        </div>
                    </Card>
                );
            })
        ) : (
            <></>
        );

    return (
        <div className="w-full h-full overflow-y-auto flex flex-col gap-y-2">
            {orderListContent}
        </div>
    );
};

export default OrderArrangeList;
