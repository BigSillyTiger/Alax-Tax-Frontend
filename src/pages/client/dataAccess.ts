import React from "react";
import { API_CLIENT, API_ORDER } from "@/apis";
import { defer } from "react-router-dom";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router-dom";
import type { Tresponse } from "@/utils/types";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
    const cid = Number(params.cid);
    const clientInfo = await API_CLIENT.clientInfo(cid);
    const clientOrders = await API_ORDER.orderWClient(cid);
    return defer({
        clientInfo,
        clientOrders: clientOrders.data,
    });
};

export const action = async ({
    params,
    request,
}: ActionFunctionArgs): Promise<Tresponse> => {
    const data = await request.formData();
    console.log("-> action data: ", data.get("req"));

    if ("POST" === request.method) {
        const orData = JSON.parse(data.get("values") as string);
        console.log("-> action add order: ", orData);
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
            },
            order_desc: orData.order_desc,
        };
        const result = await API_ORDER.orderAdd(order);
        console.log("-> fe receive add order result: ", result);
        return result;
    } else if ("PUT" === request.method && data.get("req") === "orderUpdate") {
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
            },
            order_desc: orData.order_desc,
        };
        const result = await API_ORDER.orderUpdate(order);
        console.log("-> fe receive add order result: ", result);
        return result;
    } else if ("PUT" === request.method && data.get("req") === "orderStatus") {
        const result = await API_ORDER.orderChangeStatus({
            order_id: data.get("order_id"),
            status: data.get("status"),
        });
        return result;
    } else if ("DELETE" === request.method) {
        //console.log("-> action delete order: ", data.get("order_id"));
        const result = await API_ORDER.orderDel({
            order_id: Number(data.get("order_id")),
        });
        //console.log("-> fe receive delete order result: ", result);
        return result;
    } else {
        return {
            status: 400,
            msg: "invalid request",
            data: "",
        };
    }
};
