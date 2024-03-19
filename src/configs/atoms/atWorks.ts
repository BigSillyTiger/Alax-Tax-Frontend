import { atomWithReset } from "jotai/utils";
import { TwlTableRow, wlTableRowSchema } from "../schema/workSchema";

const atWorkLogTableRow = atomWithReset<TwlTableRow>(
    wlTableRowSchema.parse({})
);

export { atWorkLogTableRow };
