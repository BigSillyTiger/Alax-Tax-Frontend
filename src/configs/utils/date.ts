import { dateFormat } from "@/lib/time";

/**
 * dateMin and dateMax are for the date picker
 * to restrict the date range
 */
export const dateMin = "2020-01-01";
export const dateMax = dateFormat(new Date());
