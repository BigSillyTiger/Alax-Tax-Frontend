import { atom } from "jotai";
import { TorderService, Torder } from "@/configs/schema/orderSchema";
import i18n from "@/utils/i18n";

const atOrder = atom<Torder>({
    oid: "",
    fk_cid: "",
    address: "",
    suburb: "",
    city: "Adelaide",
    state: "SA",
    country: "Australia",
    postcode: "5000",
    status: i18n.t("label.pending"),
    total: 0,
    paid: 0,
    gst: 0,
    deposit: 0,
    created_date: "",
    quotation_date: "",
    invoice_date: "",
    order_services: [],
    payments: [],
    client_info: {
        cid: "",
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
    work_logs: [],
});

const atOrderService = atom<TorderService>({
    fk_oid: "",
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
