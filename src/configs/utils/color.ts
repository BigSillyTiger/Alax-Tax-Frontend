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
    labor: "text-amber-700",
    employee: "text-lime-700",
    manager: "text-indigo-700",
};

export const statusColor = {
    pending: {
        bg: "bg-yellow-200",
        text: "text-yellow-700",
        border: "border-yellow-600",
    },
    ongoing: {
        bg: "bg-lime-200",
        text: "text-lime-700",
        border: "border-lime-600",
    },
    cancelled: {
        bg: "bg-red-200",
        text: "text-red-700",
        border: "border-red-600",
    },
    unconfirmed: {
        bg: "bg-amber-200",
        text: "text-amber-700",
        border: "border-amber-600",
    },
    confirmed: {
        bg: "bg-indigo-200",
        text: "text-indigo-700",
        border: "border-indigo-600",
    },
    resting: {
        bg: "bg-pink-200",
        text: "text-pink-700",
        border: "border-pink-600",
    },
    unpaid: {
        bg: "bg-fuchsia-200",
        text: "text-yellow-700",
        border: "border-fuchsia-600",
    },
    completed: {
        bg: "bg-teal-200",
        text: "text-teal-700",
        border: "border-teal-600",
    },
};

export const colorWithStaffUid = (uid: string) => {
    const color = uid.charAt(0);
    if (color === "L") {
        return "text-amber-700";
    } else if (color === "E") {
        return "text-lime-700";
    } else {
        return "text-indigo-700";
    }
};
