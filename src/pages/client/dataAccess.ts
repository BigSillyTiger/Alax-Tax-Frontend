import React from "react";
import { API_CLIENT } from "@/apis";
import { defer } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";

type Tprops = {
    params: { cid: string };
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const cid = Number(params.cid);
    const clientInfo = API_CLIENT.clientInfo(cid);
    return defer({ clientInfo });
};
