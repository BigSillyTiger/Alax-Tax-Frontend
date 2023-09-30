import React, { FC } from "react";
import ScrollToTop from "react-scroll-up";
import { ArrowSmallUpIcon } from "@heroicons/react/24/solid";

type Tprops = {
    showUnder?: number;
    duration?: number;
};

const ScrollTop: FC<Tprops> = ({ showUnder = 150, duration = 1000 }) => {
    return 1 ? (
        <ScrollToTop showUnder={100} duration={duration}>
            {/* <ArrowSmallUpIcon /> */}
            <div className="h-8 w-8 bg-blue-400">UP</div>
        </ScrollToTop>
    ) : (
        <div
            className="h-6 w-6 bg-red-400"
            style={{
                position: "fixed",
                bottom: 50,
                right: 30,
                cursor: "pointer",
                transitionDuration: "0.2s",
                transitionTimingFunction: "linear",
                transitionDelay: "0s",
            }}
        >
            UP
        </div>
    );
};

export default ScrollTop;
