import type { FC } from "react";
import { TorderService } from "@/configs/schema/orderSchema";
import { useTranslation } from "react-i18next";
import Card from "@/components/card";

type Tprops = {
    data: TorderService[];
};

const OrderDescCard: FC<Tprops> = ({ data }) => {
    const { t } = useTranslation();

    const mainContent = data.length ? (
        data.map((item, index) => {
            return (
                // total col: 6
                <div key={index} className="col-span-full grid grid-cols-12">
                    {/* index */}
                    <p className="m-auto text-bold text-indigo-400">
                        {index + 1}
                    </p>
                    {/* card */}
                    <Card className="col-span-11 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-6 bg-indigo-50">
                        {/* title - 6*/}
                        <div className="col-span-full">
                            <p>
                                <b className="text-indigo-600">
                                    {t("label.service")}:{" "}
                                </b>
                                {item.title}
                            </p>
                        </div>
                        {/* qty - 1 */}
                        <div className="col-span-1">
                            <p>
                                <b className="text-indigo-600">
                                    {t("label.qty")}:{" "}
                                </b>
                                {item.qty}
                            </p>
                        </div>
                        {/* unit - 2 */}
                        <div className="col-span-1 sm:col-span-2">
                            <p>
                                <b className="text-indigo-600">
                                    {t("label.unit")}:{" "}
                                </b>
                                {item.unit}
                            </p>
                        </div>
                        {/* taxable - 1 */}
                        <div className="col-span-1 sm:col-span-1">
                            <p>
                                <b className="text-indigo-600">
                                    {t("label.tax")}:{" "}
                                </b>
                                <input
                                    type="checkbox"
                                    defaultChecked={Boolean(item.taxable)}
                                />
                            </p>
                        </div>

                        {/* gst - 2 */}
                        <div className="col-span-1 sm:col-span-2">
                            <p>
                                <b className="text-indigo-600">
                                    {t("label.gst")}:{" "}
                                </b>
                                {item.gst}
                            </p>
                        </div>

                        {/* unit price - 3 */}
                        <div className="col-span-1 sm:col-span-3">
                            <p>
                                <b className="text-indigo-600">
                                    {t("label.uPrice")}:{" "}
                                </b>
                                {item.unit_price}
                            </p>
                        </div>
                        {/* netto - 2 */}
                        <div className="col-span-1 sm:col-span-3">
                            <p>
                                <b className="text-indigo-600">
                                    {t("label.netto")}:{" "}
                                </b>
                                {item.netto}
                            </p>
                        </div>

                        {/* desc - 6 */}
                        {item.description && (
                            <div className="col-span-full">
                                <p>
                                    <b className="text-indigo-600">
                                        {t("label.desc")}:{" "}
                                    </b>
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
