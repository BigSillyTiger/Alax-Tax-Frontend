import { atomWithReset } from "jotai/utils";
import { Tclient, clientSchema } from "@/configs/schema/clientSchema.ts";

/**
 * @description client info state for client adding
 */
const atClient = atomWithReset<Tclient>(clientSchema.parse({}));

export { atClient };
