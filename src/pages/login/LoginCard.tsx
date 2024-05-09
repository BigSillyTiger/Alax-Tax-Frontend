import type { ComponentPropsWithoutRef, FC } from "react";

type Tprops = ComponentPropsWithoutRef<"div">;

const LoginCard: FC<Tprops> = ({ children }) => {
    return (
        <div
            className="
            relative rounded-lg bg-slate-50 mx-3 md:mx-0

            before:contents-[''] 
            before:absolute 
            before:-inset-1
            before:rounded-xl
            before:animate-chase-spin
            before:bg-[conic-gradient(from_var(--chase),transparent_0%,transparent_55%,#4f46e5_60%,#d946ef_70%,transparent_75%,transparent_100%)]
            before:pointer-events-none
            

            after:contents-['']
            after:absolute
            after:animate-chase-spin
            after:bg-[conic-gradient(from_var(--chase),transparent_0%,transparent_55%,#4f46e5_60%,#d946ef_70%,transparent_75%,transparent_100%)]
            after:-inset-1
            after:rounded-xl
            after:pointer-events-none
            after:z-10

            after:blur-xl
    "
        >
            <div className="z-20 relative bg-slate-50 p-4 rounded-xl">
                {children}
            </div>
        </div>
    );
};

export default LoginCard;
