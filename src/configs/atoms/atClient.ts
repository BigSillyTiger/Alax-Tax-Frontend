import { atomWithReset } from "jotai/utils";
import { Tclient } from "@/configs/schema/clientSchema.ts";

const initClient: Tclient = {
    cid: "",
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
};

/**
 * @description client info state for client adding
 */
const atClient = atomWithReset<Tclient>(initClient);

export { initClient, atClient };
