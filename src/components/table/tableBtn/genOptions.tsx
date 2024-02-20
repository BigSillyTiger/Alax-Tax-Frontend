import {
    TrashIcon,
    PencilIcon,
    CurrencyDollarIcon,
    DocumentIcon,
    ClipboardIcon,
    UserPlusIcon,
} from "@heroicons/react/24/outline";
import i18n from "@/utils/i18n";
import { TmodalOpenStates, TmenuOptions } from "@/utils/types";
import { mOpenOps } from "@/configs/utils";

type Tprops<T> = TmenuOptions & {
    setModalOpen: (open: TmodalOpenStates) => void;
    setData: (data: T) => void;
};
type Tresult<T> = {
    label: string;
    icon: JSX.Element;
    clickFn: (value: T) => void;
};

const genOptions = <T,>({
    edit = false,
    del = false,
    pay = false,
    invoice = false,
    quotation = false,
    assign = false,
    setModalOpen,
    setData,
}: Tprops<T>): Tresult<T>[] => {
    const result: Tresult<T>[] = [];

    const createOption = (
        label: string,
        icon: JSX.Element,
        action: TmodalOpenStates
    ) => {
        result.push({
            label: i18n.t(label),
            icon,
            clickFn: (value: T) => {
                setModalOpen(action);
                setData(value);
            },
        });
    };

    assign && createOption("btn.assign", <UserPlusIcon />, mOpenOps.workAdd);
    pay && createOption("btn.pay", <CurrencyDollarIcon />, mOpenOps.pay);
    edit && createOption("btn.edit", <PencilIcon />, mOpenOps.edit);
    quotation &&
        createOption("btn.quotation", <ClipboardIcon />, mOpenOps.quotation);
    invoice && createOption("btn.invoice", <DocumentIcon />, mOpenOps.invoice);
    del && createOption("btn.del", <TrashIcon />, mOpenOps.del);

    return result;
};

export default genOptions;
