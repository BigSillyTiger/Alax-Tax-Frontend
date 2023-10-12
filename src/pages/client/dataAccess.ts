import React from "react";
import { API_CLIENT } from "@/apis";
import { defer } from "react-router-dom";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router-dom";
import type { Tresponse } from "@/utils/types";

type Tprops = {
    params: { cid: string };
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const cid = Number(params.cid);
    const clientInfo = API_CLIENT.clientInfo(cid);
    return defer({ clientInfo });
};

export const action = async ({
    params,
}: ActionFunctionArgs): Promise<Tresponse> => {
    if ("POST" === params.method) {
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
