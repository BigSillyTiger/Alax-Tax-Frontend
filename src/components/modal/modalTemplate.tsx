import { useState, memo } from "react";
import type { FC, ReactNode } from "react";
import ModalFrame from "./modalFrame";
import MQuit from "./mQuit";

type Tprops = {
    open: boolean;
    onClose: () => void;
    // using red color for major warning
    isMajor?: boolean;
    title: string;
    children: ReactNode[] | ReactNode;
    // for the size of modal
    mode?: Tmode;
    // true for using quit tips, false for no quit tips
    mQuit?: boolean;
    className?: string;
};

const MTemplate: FC<Tprops> = memo(
    ({
        open,
        onClose,
        isMajor = false,
        mQuit = true,
        title,
        children,
        mode = "md",
        className,
    }) => {
        const [openQuit, setOpenQuit] = useState(false);
        const handleCloseMain = () => {
            if (mQuit) {
                setOpenQuit(true);
            } else {
                onClose();
            }
        };
        const handleCloseQuit = () => {
            setOpenQuit(false);
        };

        return (
            <>
                <ModalFrame
                    open={open}
                    onClose={handleCloseMain}
                    onCloseForce={onClose}
                    title={title}
                    mode={mode}
                    isMajor={isMajor}
                    className={className}
                >
                    {children}
                </ModalFrame>

                {mQuit && (
                    <MQuit
                        open={openQuit}
                        setOpen={handleCloseQuit}
                        closeMainModal={onClose}
                    />
                )}
            </>
        );
    }
);

export default MTemplate;
