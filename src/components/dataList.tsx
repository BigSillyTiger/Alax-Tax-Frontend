import React from "react";
import type { FC } from "react";

type Tprops = {
    id: string;
    name: string;
    data: any[];
};

const DataList: FC<Tprops> = ({ id, data, name }) => {
    return (
        <datalist id={id}>
            {data.map((item) => (
                <option key={item[name]}>{item[name]}</option>
            ))}
        </datalist>
    );
};

export default DataList;
