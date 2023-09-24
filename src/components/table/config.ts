export const sortingIcon = (flag: string | false) => {
    return (
        {
            asc: "🔼",
            desc: "🔽",
        }[flag as string] ?? null
    );
};
