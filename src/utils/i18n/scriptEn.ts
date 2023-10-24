// the script for the English language
const en = {
    translation: {
        login: {
            text: {
                errLoginTitle: "Something wrong occured while login:",
                checkEmail: "Please check your email address.",
                checkPW: "Please check your password.",
                forgotPW: "Forgot your password?",
                rememberMe: "Remember me",
                pw: "Password",
                email: "Email",
                signIn: "Sign in to your account",
            },
            btn: { signIn: "Sign In", logining: "Logging..." },
        },
        pClients: {
            text: {
                noClient: "No client found.",
            },
            btn: {
                addClient: "Add New Client",
            },
        },
        modal: {
            title: {
                delete: "DELETE WARNING",
                addClient: "Register New Client",
                addOrder: "Add New Order",
                addService: "Add New Service",
                addUnit: "Add New Unit",
                editService: "Edit Service",
                editUnit: "Edit Unit",
                editOrder: "Edit Order",
                updateClient: "Update Client Info",
            },
            tips: {
                delete: "Are you sure to delete this client?",
                noDupAddr:
                    "The email address and phone number must <b>NOT</b> be duplecated.",
                addService: "description must NOT be duplecated",
                addUni: "The {{name}} description must <b>NOT</b> be duplecated.",
                delData: "Are you sure to delete this data?",
                delOrder: "Are you sure to delete this order?",
            },
        },
        btn: {
            confirm: "Yes",
            submit: "Submit",
            submitting: "Submitting...",
            close: "Close",
            cancel: "Cancel",
            del: "Delete",
            append: "Append",
        },
        label: {
            address: "Address",
            balance: "Balance",
            city: "City",
            client: "Client",
            country: "Country",
            defaultUnit: "Default Unit",
            defaultPrice: "Default Price",
            desc: "Description",
            details: "Details",
            email1: "Email",
            email2: "Email Address",
            emailPH: "you@example.com",
            feeStatus: "Fee Status",
            firstName: "First Name",
            id: "ID",
            invoice: "Invoice",
            lastName: "Last Name",
            menu: "Menu",
            netto: "Netto",
            orderDesc: "Order Description",
            orderId: "Order ID",
            orderDate: "Order Date",
            paid: "Paid",
            pc: "Poscode",
            phone1: "Phone",
            phone2: "Phone Number",
            qty: "Qty",
            quotation: "Quotation",
            suburb: "Suburb",
            state: "State",
            rank: "Rank",
            service: "Service",
            status: "Status",
            total: "Total",
            unit: "Unit",
            uPrice: "Unit Price",
            serviceDesc: "Service Description",
            workAddr: "Work Address",
        },
        toastS: {
            addOrder: "Added A New Order",
            delOrder: "Deleted An Order",
            updateOrder: "Updated Order Details",
        },
        toastF: {
            addOrder: "Error: Add A New Order Failed",
            delOrder: "Error: Delete An Order Failed",
            updateOrder: "Error: Update An Order Failed",
        },
    },
};

export default en;
