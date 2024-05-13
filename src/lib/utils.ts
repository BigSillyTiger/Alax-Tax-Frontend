import { Tpayslip } from "@/configs/schema/payslipSchema";
import { TwlTableRow } from "@/configs/schema/workSchema";
import { globalAlertStore } from "@/configs/zustore";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// for shadcn/ui
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const joinAllValues = (obj: { [key: string]: string }) => {
    return Object.values(obj).join(" ");
};

type Tprops = {
    unPayslip?: Tpayslip[];
    unWorklog?: TwlTableRow[];
};

export const updateBellAlert = ({ unPayslip, unWorklog }: Tprops) => {
    unPayslip && globalAlertStore.getState().setUnPayslip(unPayslip);
    unWorklog && globalAlertStore.getState().setUnWorklog(unWorklog);
};

/**
 * @description for pdf component to hyphenate words
 * @param word 
 * @returns 
 */
export const hyphenationCallback = (word: string) => {
    const syllables = []; // Store syllables
    let syllable = ""; // Temporary storage for each syllable

    // Split word into characters
    for (let i = 0; i < word.length; i++) {
        const char = word.charAt(i);

        // Check if character is a vowel
        if ("aeiou".includes(char.toLowerCase())) {
            // If previous character was also a vowel, add the current syllable to the array
            if (syllable) {
                syllables.push(syllable);
                syllable = "";
            }
        }

        // Add character to the current syllable
        syllable += char;
    }

    // Add the last syllable to the array
    if (syllable) {
        syllables.push(syllable);
    }

    return syllables;
};
