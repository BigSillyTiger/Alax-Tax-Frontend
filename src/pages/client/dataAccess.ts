import React from "react";
import { API_CLIENT, API_ORDER } from "@/apis";
import { defer } from "react-router-dom";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router-dom";
import type { Tresponse } from "@/utils/types";
import { newOrderSchema } from "@/utils/schema/orderSchema";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
    const cid = Number(params.cid);
    const clientInfo = await API_CLIENT.clientInfo(cid);
    const { data } = await API_ORDER.orderWClient(cid);
    return defer({ clientInfo, clientOrders: data });
};

export const action = async ({
    params,
    request,
}: ActionFunctionArgs): Promise<Tresponse> => {
    const data = await request.formData();
    const orData = JSON.parse(data.get("values") as string);

    if ("POST" === request.method) {
        //console.log("-> action add order: ", orData);
        const order = {
            order: {
                fk_client_id: orData.client_id,
                order_address: orData.order_address,
                order_suburb: orData.order_suburb,
                order_city: orData.order_city,
                order_state: orData.order_state,
                order_country: orData.order_country,
                order_pc: orData.order_pc,
            },
            order_desc: orData.order_desc,
        };
        const result = await API_ORDER.orderAdd(order);
        //console.log("-> fe receive add order result: ", result);
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
