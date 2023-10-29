import { Tservice, Tunit } from "./schema/manageSchema";
import { format } from "date-fns";

export const isServiceType = (obj: Tservice | Tunit): obj is Tservice => {
    return (obj as Tservice).service !== undefined;
};

export const dateFormat = (dateString: string) => {
    return format(Date.parse(dateString), "MM-dd-yyyy");
};
