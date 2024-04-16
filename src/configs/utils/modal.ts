/**
 * @description all modal types
 */
export const mOpenOps = {
    default: "",
    add: "Add",
    del: "Del",
    // for 2nd delete confirmation,
    // e.g.delete staff and delete payslip from staff page
    del_2: "Del_2",
    edit: "Edit",
    pay: "Pay",
    invoice: "Invoice",
    quotation: "Quotation",
    assign: "JobAssign",
};

/**
 * @description default menu options for all modals
 *              - only appear in the menu drop down in the table menu column
 */
export const defaultMenuOptions = {
    edit: false,
    del: false,
    pay: false,
    invoice: false,
    quotation: false,
    assign: false,
    payslip: false,
};
