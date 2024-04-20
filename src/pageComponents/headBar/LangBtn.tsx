import type { FC } from "react";
//import { useTranslation } from "react-i18next";
import { GlobeAltIcon } from "@heroicons/react/24/solid";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import i18next from "@/configs/i18n";

/**
 * @description AlertBell component Display the number of:
 *              - pending payslips
 *              - unconfirmed worklogs
 * @returns
 */
const LangBtn: FC = () => {
    //const { i18n } = useTranslation();

    const switchEng = () => {
        //i18n.changeLanguage("en");
        i18next.changeLanguage("en");
    };
    const switchChn = () => {
        //i18n.changeLanguage("cn");
        i18next.changeLanguage("cn");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none ring-0">
                <GlobeAltIcon className="size-8 text-indigo-500 text-lg" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={switchEng}>Eng</DropdownMenuItem>
                <DropdownMenuItem onClick={switchChn}>Chn</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LangBtn;
