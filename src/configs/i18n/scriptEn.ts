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
        menu: {
            dashboard: "Dashboard",
            calendar: "Calendar",
            clients: "Clients",
            orders: "Orders",
            worklogs: "Worklogs",
            staff: "Staff",
            setting: "Setting",
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
                jobAssign: "Assign Job",
                jobEdit: "Edit Job",
                payments: "Make or Edit Payments to Order",
                payslip: "Payslip Maker",
                quotation: "Quotation",
                resetPW: "Reset Password",
                roleAdmin: "Role <s>(Page Visting Access)</s>",
                timeTracker: "Time Tracker",
                updateClient: "Update Client Info",
                updateStaff: "Update Staff Info",
            },
            tips: {
                addUni: "The {{name}} description must <b>NOT</b> be duplecated.",
                dataLost: "All unsaved data will be lost.",
                delClient: "Are you sure to delete this client?",
                delStaff: "Are you sure to delete this staff?",
                delData: "Are you sure to delete this data?",
                delOrder: "Are you sure to delete this order?",
                delWL: "Are you sure to delete this work log?",
                noMatch: "Confirm Password <b>NOT Match</b>",
                noDupAddr:
                    "The email address and phone number must <b>NOT</b> be duplecated.",
                addService: "description must NOT be duplecated",
                pickService: "Pick a service to append",
                pickStaff: "Pick a staff to assign",
                quit: "Are you sure to quit?",
                resetPW: "Please input new password.",
                noDateSelected: "No date selected.",
                selectedDate: "Selected Date: ",
                assignedDates: "Assigned Dates",
                scheduledWork: "Scheduled Work",
                resetTimer: "Are you sure to reset the timer?",
                timerLost: "Current working time data will be lost.",
            },
        },
        btn: {
            addDate: "Add Date",
            addNewBonus: "Add New Bonus",
            addNewDeduction: "Add New Deduction",
            append: "Append",
            addClient: "Register New Client",
            addStuff: "Register New Staff",
            assign: "Assign",
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
            payslip: "Payslip",
            quotation: "Quotation",
            resetIssue: "Reset Issue Date",
            resetPW: "Reset Password",
            submit: "Submit",
            submitting: "Submitting...",
            timeReset: "Reset Timer",
            timeStart: "Start Timer",
            timeStop: "Stop Timer",
            timeBreak: "Take a Break",
            timeResume: "Continue",
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
            addrJob: "Job Address",
            amount: "Amount",
            assignStaff: "Assign Staff",
            assignedStaff: "Assigned Staff",
            aud: "AUD",
            balance: "Balance",
            billTo: "Bill To",
            bld: "BLD",
            bonus: "Bonus",
            bsb: "BSB",
            break: "Break",
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
            confirmedWU: "Confirmed Work Units",
            confirmedWL: "Confirmed Work Logs",
            country: "Country",
            date: "Date",
            datePicker: "Date Picker",
            deduction: "Deduction",
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
            end: "End",
            feeStatus: "Fee Status",
            firstName: "First Name",
            from: "From",
            fullAccess: "Full",
            gst: "GST",
            hr: "Hour Rate",
            id: "ID",
            idClient: "Client ID",
            idOrder: "Order ID",
            invoice: "Invoice",
            issuedDate: "Issued Date",
            lastName: "Last Name",
            logo: "Logo",
            logoName: "Logo Name",
            logoCurrent: "Current Logo",
            logoUpload: "Upload Logo",
            manager: "Manager",
            menu: "Menu",
            name: "Name",
            note: "Note",
            netto: "Netto",
            newIssueDate: "New Issue Date",
            none: "None",
            noContent: "No Content",
            openMenu: "Open Menu",
            orderDesc: "Order Description",
            orderInfo: "Order Info",
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
            payAmount: "Payment Amount",
            payments: "Payments",
            paymentTo: "Payment To",
            payDate: "Pay Date",
            payslip: "Payslip",
            payPeriod: "Pay Period",
            payTo: "Pay To",
            pending: "Pending",
            period: "Work Period",
            pc: "Poscode",
            phone1: "Phone",
            phone2: "Phone Number",
            processing: "Processing",
            qty: "Qty",
            quotation: "Quotation",
            readOnly: "Read",
            rank: "Rank",
            rate: "Rate",
            role: "Role",
            roleSelection: "Select A Role",
            salary: "Salary",
            selectStaff: "Select Staff",
            servicesDetails: "Services Details",
            serviceList: "Services List",
            switch: "Switch",
            service: "Service",
            services: "Services",
            staff: "Staff",
            staffInfo: "Staff Info",
            staffWL: "Staff Worklogs",
            state: "State",
            start: "Start",
            status: "Status",
            subtotal: "Subtotal",
            suburb: "Suburb",
            tax: "Tax",
            taxable: "Taxable",
            tel: "Tel",
            templateInvoice: "Invoice-template",
            templateQuotation: "Quotation-template",
            thisPay: "This Pay",
            timeInfo: "Time Info",
            timeEnd: "End",
            timeStart: "Start",
            timeBreak: "Break",
            todayDuty: "Today Duty",
            total: "Total",
            totalDue: "Total Due",
            totalGst: "Total Gst",
            totalLine: "Line Total",
            totalNetto: "Total Netto",
            totalPaid: "Total Paid",
            totalWH: "Total Work Hours",
            uid: "UID",
            unit: "Unit",
            units: "Units",
            unitList: "Unit List",
            uPrice: "Unit Price",
            serviceDesc: "Service Description",
            selectRole: "Select A Role",
            workAddr: "Work Address",
            workDate: "Work Date",
            workHours: "Work Hours",
            workInfo: "Work Info",
            workNote: "Work Note",
            workTime: "Work Time",
            workStatus: "Work Status",
            workDetail: "Work Details",
            wlID: "Worklog ID",
        },
        tips: {
            noAssignedStaff: "No Assigned Staff",
            noOrder: "No Order",
            noServices: "No Service",
            noPayments: "No Payment",
            npPreService: "No Pre-set Service",
            npPreUnit: "No Pre-set Unit",
            noSelectedDayRange: "No Selected Day Range",
            noDutyToday: "No Work Assignment Today",
            noDeduction: "No Deduction",
        },
        toastS: {
            addOrder: "Added A New Order.",
            addedClient: "Registered a new client.",
            addedStaff: "Registered a new staff.",
            addedNewSU: "Added A New Service/Unit.",
            delOrder: "Deleted An Order.",
            delStaff: "Deleted A Staff.",
            delWorkLog: "Deleted Work Log.",
            updateCompany: "Updated Company Information.",
            updateOrder: "Updated Order Details.",
            updateOrderStatus: "Updated Order Status.",
            updatePayment: "Updated Payment Details.",
            updateStaff: "Updated Staff Information.",
            updateLogo: "Updated Logo.",
            updateWorkLog: "Updated Work Assignment.",
            updateWorkHours: "Updated Work Hours.",
            updateWL: "Updated Work Log.",
        },
        toastF: {
            addOrder: "Error: Adding New Order Failed",
            addedNewSU: "Error: Adding A New Service/Unit.",
            delOrder: "Error: Deleting Order Failed",
            delWorkLog: "Error: Deleted Work Log.",
            existedPE: "Email or Phone already existed",
            updateOrder: "Error: Updating Order Failed",
            updateOrderStatus: "Error: Updated Order Status Failed",
            invalidPayment: "Error: Invalid Payment Amount or Paid Date",
            invalidWorkHours: "Error: Invalid Work Hours",
            overPaid: "Error: Over Paid Amount",
            unMatchPW: "Error: Passwords do not match",
            updateWorkHours: "Error: Updating Work Hours Failed",
            updateWL: "Error: Updating Work Log.",
        },
        toastW: {
            selectDate: "Please select a date first.",
        },
        sr: {
            openHeadBarMenu: "Open head bar menu",
            closeSideBar: "Close sidebar",
            closeModal: "Close modal",
        },
    },
};

export default en;
