import type { FC } from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { NavLink } from "react-router-dom";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Breadcrumbs: FC = () => {
    const breadcrumbs = useBreadcrumbs().filter(
        (item) => item.match.pathname !== "/"
    );

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs.map(({ match, breadcrumb }, index) => {
                    if (breadcrumbs.length === index + 1) {
                        return (
                            <BreadcrumbItem key={index}>
                                <BreadcrumbPage>{breadcrumb}</BreadcrumbPage>
                            </BreadcrumbItem>
                        );
                    }
                    return (
                        <div
                            key={index}
                            className="flex flex-row justify-between items-center gap-x-3"
                        >
                            <BreadcrumbItem>
                                <NavLink
                                    key={match.pathname}
                                    to={match.pathname}
                                >
                                    {breadcrumb}
                                </NavLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                        </div>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default Breadcrumbs;
