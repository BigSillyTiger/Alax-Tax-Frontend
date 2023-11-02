import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

type Tprops<T> = {
    clickEdit?: (open: T) => void;
    clickDel?: (open: T) => void;
};
type Tresult<T> = {
    label: string;
    icon: JSX.Element;
    clickFn: (open: T) => void;
};

const genOptions = <T,>({ clickEdit, clickDel }: Tprops<T>): Tresult<T>[] => {
    const result: Tresult<T>[] = [];

    if (clickEdit) {
        result.push({
            label: "Edit",
            icon: <PencilIcon />,
            clickFn: (v: T) => {
                clickEdit(v);
            },
        });
    }

    if (clickDel) {
        result.push({
            label: "Delete",
            icon: <TrashIcon />,
            clickFn: (v: T) => {
                clickDel(v);
            },
        });
    }

    return result;
};

export default genOptions;
