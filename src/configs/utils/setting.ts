export const gstRate = 0.1;

export const mTabList = [
    { name: "Main Content" },
    { name: "Service List" },
    /* { name: "Unit List" }, */
];

// the value in this array must be the same as the value in statusColor keys
export const ORDER_STATUS = [
    "pending",
    "ongoing",
    "cancelled",
    "completed",
] as const;

// the value in this array must be the same as the value in statusColor keys
export const WL_STATUS = [
    "pending",
    "ongoing",
    "cancelled",
    "processing",
    "confirmed",
    "resting",
    "unpaid",
    "completed",
] as const;

export const WL_STATUS_TABLE = [
    "pending",
    //"ongoing",
    "cancelled",
    "processing",
    "confirmed",
    //"resting",
    //"unpaid",
    //"completed",
] as const;

export const PS_STATUS_TABLE = ["pending", "completed"] as const;

/**
 * @description work log status that can be deleted
 */
export const WL_DELETABLE_STATUS = ["pending", "cancelled"];
