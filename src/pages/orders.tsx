import React, { FC, useState } from "react";

import ScrollTop from "@/components/scrollToTop";
import AddNew from "@/pages/clients/addNew";

const Orders: FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const handleClick = () => {
        setSidebarOpen(true);
    };
    return (
        <>
            <div>
                hello Orders Page
                <button onClick={handleClick}>open</button>
                <div className="w-full h-[200vh] bg-lime-300 border-2 border-violet-300">
                    test
                </div>
            </div>
            <AddNew open={sidebarOpen} setOpen={setSidebarOpen} />
        </>
    );
};

export default Orders;
