import type { FC } from "react";

type Tprops = {
    id: string;
    name: string;
    data: any[];
};

const DataList: FC<Tprops> = ({ id, name, data }) => {
    if (data.length) {
        return (
            <datalist id={id}>
                {data.map((item) => (
                    <option key={item[name]}>{item[name]}</option>
                ))}
            </datalist>
        );
    } else {
        return <></>;
    }
};

export default DataList;
