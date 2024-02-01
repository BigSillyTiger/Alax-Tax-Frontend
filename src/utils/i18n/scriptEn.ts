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
        pageText: {
            noClient: "No client found.",
        },
        modal: {
            title: {
                delete: "DELETE WARNING",
                addClient: "Register New Client",
                addOrder: "Add New Order",
                addService: "Add New Service",
                addStaff: "Register New Staff",
                addUnit: "Add New Unit",
                alert: "Alert",
                editService: "Edit Service",
                editUnit: "Edit Unit",
                editOrder: "Edit Order",
                invoice: "Invoice",
                payments: "Make or Edit Payments to Order",
                roleAdmin: "Role <s>(Page Visting Access)</s>",
                updateClient: "Update Client Info",
                updateStaff: "Update Staff Info",
            },
            tips: {
                delete: "Are you sure to delete this client?",
                dataLost: "All unsaved data will be lost.",
                noDupAddr:
                    "The email address and phone number must <b>NOT</b> be duplecated.",
                addService: "description must NOT be duplecated",
                addUni: "The {{name}} description must <b>NOT</b> be duplecated.",
                delData: "Are you sure to delete this data?",
                delOrder: "Are you sure to delete this order?",
                pickService: "Pick a service to append",
                quit: "Are you sure to quit?",
                noMatch: "Confirm Password <b>NOT Match</b>",
            },
        },
        btn: {
            append: "Append",
            addClient: "Register New Client",
            addStuff: "Register New Staff",
            confirm: "Confirm",
            close: "Close",
            cancel: "Cancel",
            del: "Delete",
            edit: "Edit",
            invoice: "Invoice",
            newOrder: "New Order",
            newService: "New Service",
            newUnit: "New Unit",
            pay: "Pay",
            quotation: "Quotation",
            resetIssue: "Reset Issue Date",
            submit: "Submit",
            submitting: "Submitting...",
            update: "Update",
            updateIssueDate: "Update Issue Date",
            updateLogo: "Update Logo",
            updateCompany: "Update Company Info",
            yes: "Yes",
        },
        placeholder: {
            emailPH: "you@example.com",
            max: "Max",
            min: "Min",
            search: "Search",
        },
        label: {
            abn: "ABN",
            acc: "Account",
            addr: "Addr",
            address: "Address",
            aud: "AUD",
            balance: "Balance",
            billTo: "Bill To",
            bld: "BLD",
            bsb: "BSB",
            bank: "Bank Account",
            city: "City",
            client: "Client",
            clientID: "Client ID",
            clientInfo: "Client Info",
            closed: "Closed",
            company: "Company",
            companyName: "Company Name",
            completed: "Completed",
            companyInfo: "Company Info",
            country: "Country",
            defaultUnit: "Default Unit",
            defaultPrice: "Default Price",
            deposit: "Deposit",
            desc: "Description",
            details: "Details",
            defaultIssueDate: "Default Issue Date",
            due: "Due",
            email1: "Email",
            email2: "Email Address",
            employee: "Employee",
            feeStatus: "Fee Status",
            firstName: "First Name",
            from: "From",
            fullAccess: "Full",
            gst: "GST",
            id: "ID",
            invoice: "Invoice",
            issuedDate: "Issued Date",
            lastName: "Last Name",
            logo: "Logo",
            logoName: "Logo Name",
            logoCurrent: "Current Logo",
            logoUpload: "Upload Logo",
            manager: "Manager",
            menu: "Menu",
            netto: "Netto",
            newIssueDate: "New Issue Date",
            none: "None",
            orderDesc: "Order Description",
            orderInfo: "Order Info",
            orderId: "Order ID",
            orderDate: "Order Date",
            orderDetail: "Order Details",
            orderServices: "Order Services Info",
            page: "Page",
            pageAccessSetting: "Page Access Setting",
            paid: "Paid",
            paidAmount: "Paid Amount",
            paidDate: "Paid Date",
            password: "Password",
            pwInput: "New Password",
            pwConfirm: "Confirm Password",
            payments: "Payments",
            paymentTo: "Payment To",
            payAmount: "Payment Amount",
            payDate: "Paid Date",
            pending: "Pending",
            pc: "Poscode",
            phone1: "Phone",
            phone2: "Phone Number",
            processing: "Processing",
            qty: "Qty",
            quotation: "Quotation",
            readOnly: "Read",
            suburb: "Suburb",
            servicesDetails: "Services Details",
            serviceList: "Services List",
            state: "State",
            rank: "Rank",
            role: "Role",
            roleSelection: "Select A Role",
            service: "Service",
            services: "Services",
            status: "Status",
            tax: "Tax",
            taxable: "Taxable",
            tel: "Tel",
            total: "Total",
            totalDue: "Total Due",
            totalGst: "Total Gst",
            totalLine: "Line Total",
            totalNetto: "Total Netto",
            totalPaid: "Total Paid",
            uid: "UID",
            unit: "Unit",
            unitList: "Unit List",
            uPrice: "Unit Price",
            serviceDesc: "Service Description",
            selectRole: "Select A Role",
            workAddr: "Work Address",
        },
        tips: {
            noOrder: "No Order",
            noServices: "No Service",
            noPayments: "No Payment",
            npPreService: "No Pre-set Service",
            npPreUnit: "No Pre-set Unit",
        },
        toastS: {
            addOrder: "Added A New Order",
            delOrder: "Deleted An Order",
            updateOrder: "Updated Order Details",
            updateOrderStatus: "Updated Order Status",
            updatePayment: "Updated Payment Details",
            updateCompany: "Updated Company Info",
            updateLogo: "Updated Logo",
        },
        toastF: {
            addOrder: "Error: Adding New Order Failed",
            delOrder: "Error: Deleting Order Failed",
            updateOrder: "Error: Updating Order Failed",
            updateOrderStatus: "Error: Updated Order Status Failed",
            invalidPayment: "Error: Invalid Payment Amount or Paid Date",
            overPaid: "Error: Over Paid Amount",
            unMatchPW: "Error: Passwords do not match",
        },
    },
};

export default en;
