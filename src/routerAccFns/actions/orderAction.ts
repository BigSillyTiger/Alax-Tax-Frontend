import { API_ORDER } from "@/apis";
import { TorderService } from "@/configs/schema/orderSchema";
import { TwlUnion } from "@/configs/schema/workSchema";
import { ActionFunctionArgs } from "react-router-dom";

/**
 * @description this action is shared by orders page and client page
 * @param
 * @returns
 */
export const ordersAction = async ({
    request,
}: ActionFunctionArgs): Promise<Tresponse> => {
    const data = await request.formData();
    data.get("req") &&
        console.log("-> order/client action req data: ", data.get("req"));

    // add a new order
    if ("POST" === request.method && data.get("req") === "orderCreate") {
        const orData = JSON.parse(data.get("values") as string);
        const order = {
            order: {
                fk_cid: orData.cid,
                address: orData.address,
                suburb: orData.suburb,
                city: orData.city,
                state: orData.state,
                country: orData.country,
                postcode: orData.postcode,
                status: orData.status.toLocaleLowerCase() as string,
                deposit: orData.deposit,
                gst: orData.gst,
                total: orData.total,
            },
            order_services: orData.order_services,
        };
        const result = await API_ORDER.orderAdd(order);
        //console.log("-> fe receive add order result: ", result);
        return result;
    } else if ("POST" === request.method && data.get("req") === "jobAssign") {
        const assignedData = JSON.parse(data.get("values") as string);
        console.log("-> action job assign: ", assignedData);
        const result = await API_ORDER.updateJobAssignment(
            assignedData as TwlUnion[]
        );
        return result;
    }
    // update an order
    else if ("PUT" === request.method && data.get("req") === "orderUpdate") {
        const orData = JSON.parse(data.get("values") as string);
        const order = {
            order: {
                oid: orData.oid,
                fk_cid: orData.cid,
                address: orData.address,
                suburb: orData.suburb,
                city: orData.city,
                state: orData.state,
                country: orData.country,
                postcode: orData.postcode,
                status: orData.status,
                deposit: orData.deposit,
                gst: orData.gst,
                paid: orData.paid,
                total: orData.total,
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
            oid: data.get("oid"),
            status: data.get("status")?.toString().toLocaleLowerCase(),
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
            data.get("oid")
        );
        const result = await API_ORDER.updateInvoiceIssue(
            data.get("date") as string,
            data.get("oid") as string
        );
        return result;
    }
    // delete an order
    else if ("DELETE" === request.method) {
        const result = await API_ORDER.orderDel({
            oid: data.get("oid"),
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
