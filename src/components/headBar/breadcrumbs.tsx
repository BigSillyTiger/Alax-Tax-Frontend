import React from "react";
import type { FC } from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { NavLink } from "react-router-dom";

const Breadcrumbs: FC = () => {
    const breadcrumbs = useBreadcrumbs().filter(
        (item) => item.match.pathname !== "/"
    );
    //const breadcrumbs = useBreadcrumbs(, {excludePaths: ["/"]})
    console.log("-> breadcrumbs: ", breadcrumbs);

    return (
        <div className="bg-blue-50 p-2 border-0 rounded-full text-blue-600 font-extrabold">
            <nav>
                {breadcrumbs.map(({ match, breadcrumb }, index) => {
                    return (
                        <NavLink key={match.pathname} to={match.pathname}>
                            {breadcrumb}
                            &nbsp;
                            {index < breadcrumbs.length - 1 && ">"}
                            &nbsp;
                            {/* if not the last one, add a ">" (arrow */}
                        </NavLink>
                    );
                })}
            </nav>
        </div>
    );
};

export default Breadcrumbs;
