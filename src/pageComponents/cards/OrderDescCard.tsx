import type { FC } from "react";
import { TorderService } from "@/configs/schema/orderSchema";
import { useTranslation } from "react-i18next";
import Card from "@/components/Card";
import { linearLargeBG } from "@/configs/utils/color";
import { Btext } from "@/components/Btext";

type Tprops = {
    data: TorderService[];
    readonly?: boolean;
};

const OrderDescCard: FC<Tprops> = ({ data, readonly = false }) => {
    const { t } = useTranslation();

    const mainContent = data.length ? (
        data.map((item, index) => {
            return (
                // total col: 6
                <div key={index} className="col-span-full grid grid-cols-12">
                    {/* index */}
                    <p className="m-auto text-xl font-bold text-indigo-400">
                        {index + 1}
                    </p>
                    {/* card */}
                    <Card
                        className={`col-span-11 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-6 ${linearLargeBG}`}
                    >
                        {/* title - 6*/}
                        <div className="col-span-full">
                            <p>
                                <Btext>{t("label.service")}: </Btext>
                                {item.title}
                            </p>
                        </div>
                        {/* qty - 1 */}
                        <div className="col-span-1">
                            <p>
                                <Btext>{t("label.qty")}: </Btext>
                                {item.qty}
                            </p>
                        </div>
                        {/* unit - 2 */}
                        <div className="col-span-1 sm:col-span-2">
                            <p>
                                <Btext>{t("label.unit")}: </Btext>
                                {item.unit}
                            </p>
                        </div>
                        {/* taxable - 1 */}
                        <div className="col-span-1 sm:col-span-1">
                            <p>
                                <Btext>{t("label.tax")}: </Btext>
                                <input
                                    type="checkbox"
                                    onClick={(e) => {
                                        // there's no readonly attribute for checkbox
                                        // so use this to prevent click event
                                        if (readonly) e.preventDefault();
                                    }}
                                    defaultChecked={Boolean(item.taxable)}
                                />
                            </p>
                        </div>

                        {/* gst - 2 */}
                        <div className="col-span-1 sm:col-span-2">
                            <p>
                                <Btext>{t("label.gst")}: </Btext>
                                {item.gst}
                            </p>
                        </div>

                        {/* unit price - 3 */}
                        <div className="col-span-1 sm:col-span-3">
                            <p>
                                <Btext>{t("label.uPrice")}: </Btext>
                                {item.unit_price}
                            </p>
                        </div>
                        {/* netto - 2 */}
                        <div className="col-span-1 sm:col-span-3">
                            <p>
                                <Btext>{t("label.netto")}: </Btext>
                                {item.netto}
                            </p>
                        </div>

                        {/* desc - 6 */}
                        {item.description && (
                            <div className="col-span-full">
                                <p>
                                    <Btext>{t("label.desc")}: </Btext>
                                    {item.description}
                                </p>
                            </div>
                        )}
                    </Card>
                </div>
            );
        })
    ) : (
        <p className="m-auto text-bold text-indigo-400">
            {t("tips.noServices")}
        </p>
    );

    return (
        <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-8">
            {mainContent}
        </div>
    );
};

export default OrderDescCard;
