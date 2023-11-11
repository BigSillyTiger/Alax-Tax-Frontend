import React from "react";
import { API_CLIENT, API_MANAGE, API_ORDER } from "@/apis";
import { defer } from "react-router-dom";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router-dom";
import type { Tresponse } from "@/utils/types";
import { TorderDesc, TorderWithDetails } from "@/configs/schema/orderSchema";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const cid = Number(params.cid);
    const clientInfo = await API_CLIENT.clientInfo(cid);
    const clientOrders = await API_ORDER.orderWClient(cid);
    const uniData = await API_MANAGE.uniAll();
    const company = await API_MANAGE.companyGet();

    return defer({
        clientInfo,
        clientOrders: clientOrders.data as TorderWithDetails[],
        uniData: uniData.data,
        company: company.data,
    });
};

export const action = async ({
    params,
    request,
}: ActionFunctionArgs): Promise<Tresponse> => {
    const data = await request.formData();
    data.get("req") && console.log("-> action req data: ", data.get("req"));

    // add a new order
    if ("POST" === request.method && data.get("req") === "orderCreate") {
        const orData = JSON.parse(data.get("values") as string);
        const order = {
            order: {
                fk_client_id: orData.client_id,
                order_address: orData.order_address,
                order_suburb: orData.order_suburb,
                order_city: orData.order_city,
                order_state: orData.order_state,
                order_country: orData.order_country,
                order_pc: orData.order_pc,
                order_status: orData.order_status,
                order_deposit: orData.order_deposit,
                order_gst: orData.order_gst,
                order_total: orData.order_total,
            },
            order_desc: orData.order_desc,
        };
        const result = await API_ORDER.orderAdd(order);
        console.log("-> fe receive add order result: ", result);
        return result;
    }
    // update an order
    else if ("PUT" === request.method && data.get("req") === "orderUpdate") {
        const orData = JSON.parse(data.get("values") as string);
        const order = {
            order: {
                order_id: orData.order_id,
                fk_client_id: orData.client_id,
                order_address: orData.order_address,
                order_suburb: orData.order_suburb,
                order_city: orData.order_city,
                order_state: orData.order_state,
                order_country: orData.order_country,
                order_pc: orData.order_pc,
                order_status: orData.order_status,
                order_deposit: orData.order_deposit,
                order_gst: orData.order_gst,
                order_paid: orData.order_paid,
                order_total: orData.order_total,
            },
            order_desc: orData.order_desc.map(
                (item: TorderDesc, index: number) => {
                    return {
                        ...item,
                        ranking: index + 1,
                    };
                }
            ),
        };
        const result = await API_ORDER.orderUpdate(order);
        console.log("-> fe receive add order result: ", result);
        return result;
    }
    // change order status
    else if ("PUT" === request.method && data.get("req") === "orderStatus") {
        const result = await API_ORDER.orderChangeStatus({
            order_id: data.get("order_id"),
            status: data.get("status"),
        });
        return result;
    } else if (
        "PUT" === request.method &&
        data.get("req") === "paymentUpdate"
    ) {
        const payData = JSON.parse(data.get("values") as string);
        //console.log("-> action payment update: ", payData);
        const result = await API_ORDER.paymentUpdate(payData);
        return result;
    }
    // delete an order
    else if ("DELETE" === request.method) {
        //console.log("-> action delete order: ", data.get("order_id"));
        const result = await API_ORDER.orderDel({
            order_id: Number(data.get("order_id")),
        });
        //console.log("-> fe receive delete order result: ", result);
        return result;
    }
    // errors
    else {
        return {
            status: 400,
            msg: "invalid request",
            data: "",
        };
    }
};
