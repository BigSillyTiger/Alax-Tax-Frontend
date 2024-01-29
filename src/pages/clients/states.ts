import { atomWithReset } from "jotai/utils";
import { Tclient } from "@/configs/schema/clientSchema.ts";

/**
 * @description client info state for client adding
 */
const atClient = atomWithReset<Tclient>({
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

export { atClient };
