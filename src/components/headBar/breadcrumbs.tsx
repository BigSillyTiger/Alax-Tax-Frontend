import { Fragment } from "react";
import type { FC } from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { NavLink } from "react-router-dom";

const Breadcrumbs: FC = () => {
    const breadcrumbs = useBreadcrumbs().filter(
        (item) => item.match.pathname !== "/"
    );
    //const breadcrumbs = useBreadcrumbs(, {excludePaths: ["/"]})

    return (
        <div className="font-extrabold py-2 bg-teal-200 rounded-full text-slate-50">
            <nav>
                {breadcrumbs.map(({ match, breadcrumb }, index) => {
                    return (
                        <Fragment key={index}>
                            <NavLink
                                key={match.pathname}
                                to={match.pathname}
                                className="px-4 py-2 rounded-full text-blue-400 hover:text-blue-700 hover:bg-blue-50 "
                            >
                                {breadcrumb}
                            </NavLink>
                            {/* if not the last one, add a ">" (arrow  &nbsp; */}

                            {index < breadcrumbs.length - 1 && " > "}
                        </Fragment>
                    );
                })}
            </nav>
        </div>
    );
};

export default Breadcrumbs;
