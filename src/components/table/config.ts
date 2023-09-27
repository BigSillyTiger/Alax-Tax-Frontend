export type t_table_client = {
    id: number;
    full_name: string;
    phone: string;
    email: string;
    address: string | null;
    city: string;
    state: string;
    country: string;
    postcode: string;
};

export const sortingIcon = (flag: string | false) => {
    return (
        {
            asc: "🔼",
            desc: "🔽",
        }[flag as string] ?? null
    );
};
