declare type Tresponse = {
    status: number;
    msg: string;
    data: unknown;
};

declare type Tmode = "sm" | "md" | "lg" | "xl" | "full" | "md-full";

declare type TorderStatus = "Pending" | "Processing" | "Closed" | "Completed";
