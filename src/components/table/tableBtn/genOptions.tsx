import {
    TrashIcon,
    PencilIcon,
    CurrencyDollarIcon,
    DocumentIcon,
    ClipboardIcon,
    UserPlusIcon,
    WalletIcon,
} from "@heroicons/react/24/outline";
import i18n from "@/configs/i18n";
import { TmenuOptions, TmodalOpenStates } from "@/configs/types";
import { mOpenOps } from "@/configs/utils/modal";

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
    payslip = false,
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

    /**
     * @description pay and payslip share the same mOpenOps.pay, case these 2 options are will not be shown together on the same page/table
     */
    assign && createOption("btn.assign", <UserPlusIcon />, mOpenOps.assign);
    pay && createOption("btn.pay", <CurrencyDollarIcon />, mOpenOps.pay);
    payslip && createOption("btn.payslip", <WalletIcon />, mOpenOps.pay);
    edit && createOption("btn.edit", <PencilIcon />, mOpenOps.edit);
    quotation &&
        createOption("btn.quotation", <ClipboardIcon />, mOpenOps.quotation);
    invoice && createOption("btn.invoice", <DocumentIcon />, mOpenOps.invoice);
    del && createOption("btn.del", <TrashIcon />, mOpenOps.del);

    return result;
};

export default genOptions;
