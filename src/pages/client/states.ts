import { atom } from "jotai";
import { TorderWithDetails } from "@/configs/schema/orderSchema";
import { Tclient } from "@/configs/schema/clientSchema";
import i18n from "@/utils/i18n";

const atClientOrder = atom<TorderWithDetails>({
    // -1 - close the modal; 0 - add new order; >0 = update order
    order_id: -1,
    fk_client_id: -1,
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
    order_desc: [],
    payments: [],
});

const atClient = atom<Tclient>({
    client_id: -1,
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    address: "",
    suburb: "",
    city: "Adelaide",
    state: "SA",
    country: "Australia",
    postcode: "5000",
});

export { atClientOrder, atClient };
