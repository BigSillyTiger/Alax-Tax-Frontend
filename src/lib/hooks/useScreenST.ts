import { useState, useEffect } from "react";

/**
 * @name useScreenST - Screen Size Small Than
 * @description custom hook to check if the screen size is smaller than a certain width[430]
 * @returns true - if the screen size is smaller than the specified width
 * @returns false - if the screen size is larger than the specified width
 */
const useScreenST = (size: number = 430) => {
    const width = size;
    const [isTooSmallScreen, setIsTooSmallScreen] = useState(
        window.innerWidth <= width
    );

    useEffect(() => {
        const checkScreenWidth = () => {
            setIsTooSmallScreen(window.innerWidth <= width);
        };

        checkScreenWidth();

        // Add event listener for window resize
        window.addEventListener("resize", checkScreenWidth);

        // Remove event listener on component unmount
        return () => {
            window.removeEventListener("resize", checkScreenWidth);
        };
    }, []); // Empty dependency array to ensure effect runs only once

    return isTooSmallScreen;
};

export default useScreenST;
