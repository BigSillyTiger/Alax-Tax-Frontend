import { API_ORDER } from "@/apis";
import { TorderService } from "@/configs/schema/orderSchema";
import { Tresponse } from "@/utils/types";
import { ActionFunctionArgs } from "react-router-dom";

export const ordersAction = async ({
    request,
}: ActionFunctionArgs): Promise<Tresponse> => {
    const data = await request.formData();
    data.get("req") &&
        console.log("-> client action req data: ", data.get("req"));

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
            order_services: orData.order_services,
        };
        const result = await API_ORDER.orderAdd(order);
        //console.log("-> fe receive add order result: ", result);
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
            order_services: orData.order_services.map(
                (item: TorderService, index: number) => {
                    return {
                        ...item,
                        ranking: index + 1,
                    };
                }
            ),
        };
        const result = await API_ORDER.orderUpdate(order);
        console.log("-> fe receive update order result: ", result);
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
    } else if (
        "PUT" === request.method &&
        data.get("req") === "updateInvoiceIssue"
    ) {
        console.log(
            "-> action update invoice issue: ",
            data.get("newDate"),
            data.get("order_id")
        );
        const result = await API_ORDER.updateInvoiceIssue(
            data.get("date") as string,
            data.get("order_id") as string
        );
        return result;
    }
    // delete an order
    else if ("DELETE" === request.method) {
        const result = await API_ORDER.orderDel({
            order_id: data.get("order_id"),
        });
        //console.log("-> client page receive delete order result: ", result);
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
