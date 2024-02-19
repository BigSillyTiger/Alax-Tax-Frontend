import { atom } from "jotai";
import { TorderService, Torder } from "@/configs/schema/orderSchema";
import i18n from "@/utils/i18n";

const atOrder = atom<Torder>({
    order_id: "",
    fk_client_id: "",
    order_address: "",
    order_suburb: "",
    order_city: "Adelaide",
    order_state: "SA",
    order_country: "Australia",
    order_pc: "5000",
    order_status: i18n.t("label.pending"),
    order_total: 0,
    order_paid: 0,
    order_gst: 0,
    order_deposit: 0,
    order_date: "",
    quotation_date: "",
    invoice_issue_date: "",
    order_services: [],
    payments: [],
    client_info: {
        client_id: "",
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        address: "",
        suburb: "",
        city: "",
        state: "",
        country: "",
        postcode: "",
    },
});

const atOrderService = atom<TorderService>({
    fk_order_id: "",
    ranking: 0,
    title: "",
    taxable: true,
    description: "",
    qty: 1,
    unit: "",
    unit_price: 0,
    gst: 0,
    netto: 0,
});

export { atOrder, atOrderService };
