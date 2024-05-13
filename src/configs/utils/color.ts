/**
 * @description for time btns style
 */
export const timeBtnStyleMap = {
    startTime:
        "bg-lime-600 border-lime-600 text-slate-200 hover:bg-slate-100 hover:text-lime-600",
    endTime:
        "bg-lime-600 border-lime-600 text-slate-200 hover:bg-slate-100 hover:text-lime-600",
    breakTime:
        "bg-amber-600 border-amber-600 text-slate-200 hover:bg-slate-100 hover:text-amber-600",
    workTime:
        "bg-indigo-600 border-indigo-600 text-slate-200 hover:bg-slate-100 hover:text-indigo-600",
    default:
        "bg-slate-100 border-red-600 text-red-600 hover:bg-red-400 hover:text-slate-100",
};

export const BG_SLATE = "bg-slate-50";

export const staffColorMap = {
    labor: {
        text: "text-amber-700",
        bg: "bg-amber-100",
        border: "border-amber-600",
    },
    employee: {
        text: "text-lime-700",
        bg: "bg-lime-100",
        border: "border-lime-600",
    },
    manager: {
        text: "text-indigo-700",
        bg: "bg-indigo-100",
        border: "border-indigo-600",
    },
};

export const colorWithStaffUid = (uid: string) => {
    const color = uid.charAt(0);
    if (color === "L") {
        return staffColorMap.labor;
    } else if (color === "E") {
        return staffColorMap.employee;
    } else {
        return staffColorMap.manager;
    }
};

export const statusColor = {
    pending: {
        bg: "bg-yellow-200",
        fbg: "focus:bg-yellow-200",
        text: "text-yellow-700",
        ftext: "focus:text-yellow-700",
        border: "border-yellow-600",
    },
    ongoing: {
        bg: "bg-lime-200",
        fbg: "focus:bg-lime-200",
        text: "text-lime-700",
        ftext: "focus:text-lime-700",
        border: "border-lime-600",
    },
    cancelled: {
        bg: "bg-red-200",
        fbg: "focus:bg-red-200",
        text: "text-red-700",
        ftext: "focus:text-red-700",
        border: "border-red-600",
    },
    unconfirmed: {
        bg: "bg-amber-200",
        fbg: "focus:bg-amber-200",
        text: "text-amber-700",
        ftext: "focus:text-amber-700",
        border: "border-amber-600",
    },
    confirmed: {
        bg: "bg-indigo-200",
        fbg: "focus:bg-indigo-200",
        text: "text-indigo-700",
        ftext: "focus:text-indigo-700",
        border: "border-indigo-600",
    },
    resting: {
        bg: "bg-pink-200",
        fbg: "focus:bg-pink-200",
        text: "text-pink-700",
        ftext: "focus:text-pink-700",
        border: "border-pink-600",
    },
    unpaid: {
        bg: "bg-fuchsia-200",
        fbg: "focus:bg-fuchsia-200",
        text: "text-yellow-700",
        ftext: "focus:text-yellow-700",
        border: "border-fuchsia-600",
    },
    completed: {
        bg: "bg-teal-200",
        fbg: "focus:bg-teal-200",
        text: "text-teal-700",
        ftext: "focus:text-teal-700",
        border: "border-teal-600",
    },
};

// for menu options position
export const topPsedo = [
    "before:top-[80px]",
    "before:top-[132px]",
    "before:top-[184px]",
    "before:top-[236px]",
    "before:top-[288px]",
    "before:top-[340px]",
    "before:top-[392px]",
    "before:top-[444px]",
    "before:top-[496px]",
];
// for menu options position
export const btmPsedo = [
    "after:top-[144px]",
    "after:top-[196px]",
    "after:top-[248px]",
    "after:top-[300px]",
    "after:top-[352px]",
    "after:top-[404px]",
    "after:top-[456px]",
    "after:top-[508px]",
    "after:top-[560px]",
];

export const moneyColors = {
    unpaid: "text-pink-600",
    finished: "text-teal-600",
};

export const daypickerCSS = `
.my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid #4338ca;
}
.my-selected:hover:not([disabled]) { 
    border-color: #6366f1;
    color: #6366f1;
}
.my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: #10b981;
}
.my-scheduled {
    font-weight: bold; 
    border: 2px solid #4338ca;
}
`;

export const linearLargeBG =
    "bg-[linear-gradient(0deg,#eef2ff_20.8%,#c7d2fe_94.3%)]";
