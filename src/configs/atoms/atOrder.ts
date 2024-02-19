import { atom } from "jotai";
import { TorderDesc, TorderWithPayments } from "@/configs/schema/orderSchema";
import i18n from "@/utils/i18n";

const atOrderWithPayments = atom<TorderWithPayments>({
    // -1 - close the modal; 0 - add new order; >0 = update order
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
});

const atOrderService = atom<TorderDesc>({
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

export { atOrderWithPayments, atOrderService };
