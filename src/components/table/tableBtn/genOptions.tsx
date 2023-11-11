import {
    TrashIcon,
    PencilIcon,
    CurrencyDollarIcon,
    DocumentIcon,
    ClipboardIcon,
} from "@heroicons/react/24/outline";
import i18n from "@/utils/i18n";
import { TclientOrderModal, TmenuOptions } from "@/utils/types";

type Tprops<T> = TmenuOptions & {
    setModalOpen: (open: TclientOrderModal) => void;
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
    setModalOpen,
    setData,
}: Tprops<T>): Tresult<T>[] => {
    const result: Tresult<T>[] = [];

    if (pay) {
        result.push({
            label: i18n.t("btn.pay"),
            icon: <CurrencyDollarIcon />,
            clickFn: (v: T) => {
                setModalOpen("Pay");
                setData(v);
            },
        });
    }

    if (edit) {
        result.push({
            label: i18n.t("btn.edit"),
            icon: <PencilIcon />,
            clickFn: (v: T) => {
                setModalOpen("Edit");
                setData(v);
            },
        });
    }

    if (quotation) {
        result.push({
            label: i18n.t("btn.quotation"),
            icon: <ClipboardIcon />,
            clickFn: (v: T) => {
                setModalOpen("Quotation");
                setData(v);
            },
        });
    }

    if (invoice) {
        result.push({
            label: i18n.t("btn.invoice"),
            icon: <DocumentIcon />,
            clickFn: (v: T) => {
                setModalOpen("Invoice");
                setData(v);
            },
        });
    }

    if (del) {
        result.push({
            label: i18n.t("btn.del"),
            icon: <TrashIcon />,
            clickFn: (v: T) => {
                setModalOpen("Del");
                setData(v);
            },
        });
    }
    return result;
};

export default genOptions;
