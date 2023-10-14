import React from "react";
import { API_CLIENT } from "@/apis";
import { defer } from "react-router-dom";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router-dom";
import type { Tresponse } from "@/utils/types";
import { newOrderSchema } from "@/utils/schema/orderSchema";
import { decode } from "decode-formdata";

type Tprops = {
    params: { cid: string };
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
    const cid = Number(params.cid);
    const clientInfo = await API_CLIENT.clientInfo(cid);
    return defer({ clientInfo });
};

export const action = async ({
    params,
    request,
}: ActionFunctionArgs): Promise<Tresponse> => {
    const data = await request.formData();
    const trueData = JSON.parse(data.get("values") as string);

    //Object.fromEntries(data.entries())
    const v1 = data.entries();

    //console.log("-> client 1: ", Object.fromEntries(data.entries()));
    console.log("-> action data: ", trueData);
    //console.log("-> client 2: ", v1);

    if ("POST" === request.method) {
        return {
            status: 400,
            msg: "invalid request",
            data: "",
        };
    } else {
        return {
            status: 400,
            msg: "invalid request",
            data: "",
        };
    }
};
