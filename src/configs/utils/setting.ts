export const gstRate = 0.1;

export const mTabList = [
    { name: "Main Content" },
    { name: "Service List" },
    /* { name: "Unit List" }, */
];

// the keys in this array must be the same as the value in statusColor keys
export const ORDER_STATUS = [
    "pending",
    "processing",
    "completed",
    "cancelled",
    "refunded",
] as const;

// shared with service status
export const orderStatusList = [
    { name: ORDER_STATUS[0] }, // pending
    { name: ORDER_STATUS[1] }, // processing
    { name: ORDER_STATUS[2] }, // cancelled
    { name: ORDER_STATUS[3] }, // completed
];

export const SERVICE_TYPE = ["OOP", "CTM", "SUB"] as const;

export const serviceTypeList = [
    { name: SERVICE_TYPE[0] }, // OOP
    { name: SERVICE_TYPE[1] }, // CTM
    { name: SERVICE_TYPE[2] }, // SUB
];

// the value in this array must be the same as the value in statusColor keys
export const WL_STATUS = [
    "pending",
    "processing",
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

export const DEFAULT_EXPIRY_DATE = "none";

export const SERVICE_STATUS = [
    "pending",
    "processing",
    "ongoing",
    "cancelled",
    "completed",
    "expired",
] as const;
