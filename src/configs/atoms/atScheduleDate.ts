import { atomWithReset } from "jotai/utils";

/**
 * @description
 */
const atSelectedDate = atomWithReset<Date>(new Date());

export { atSelectedDate };
