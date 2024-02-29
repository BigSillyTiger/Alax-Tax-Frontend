import { FC } from "react";

type TuserIcon = {
    fName: string;
    lName: string;
    size?: "sm" | "md" | "lg" | "xl";
};

const getRandomColor = () => {
    const iconBGColor = [
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-red-500",
        "bg-indigo-500",
        "bg-pink-500",
        "bg-purple-500",
        "bg-emerald-500",
        "bg-teal-500",
        "bg-fuchsia-500",
    ];
    return iconBGColor[Math.floor(Math.random() * iconBGColor.length)];
};

const UserIcon: FC<TuserIcon> = ({ fName, lName, size = "md" }) => {
    const initials =
        fName.charAt(0).toUpperCase() + lName.charAt(0).toUpperCase();
    const sizeClass = {
        sm: "w-6 h-6 text-base",
        md: "w-10 h-10 text-xl",
        lg: "w-14 h-14 text-2xl",
        xl: "w-18 h-18 text-3xl",
    };
    return (
        <div
            className={`flex items-center justify-center rounded-full text-white ${sizeClass[size]} ${getRandomColor()}`}
        >
            {initials}
        </div>
    );
};

export default UserIcon;
