// the script for the English language
const en = {
    translation: {
        login: {
            text: {
                errLoginTitle: "Something wrong occured while login:",
                checkEmail: "Please check your email address.",
                checkPW: "Please check your password.",
                contactManager: "Please try to contact manager for details.",
                forgotPW: "Forgot your password?",
                rememberMe: "Remember me",
                pw: "Password",
                email: "Email",
                signIn: "Sign in to your account",
            },
            btn: { signIn: "Sign In", logining: "Logging..." },
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
        status: {
            pending: "Pending",
            ongoing: "Ongoing",
            cancelled: "Cancelled",
            processing: "Processing",
            confirmed: "Confirmed",
            resting: "Resting",
            unpaid: "Unpaid",
            completed: "Completed",
        },
        modal: {
            title: {
                accessControl: "Login Access",
                addClient: "Register New Client",
                addOrder: "Add New Order",
                addService: "Add New Service",
                addStaff: "Register New Staff",
                addUnit: "Add New Unit",
                alert: "Alert",
                delete: "DELETE WARNING",
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
                addUni: "The {{name}} description must <b>NOT</b> be duplicated.",
                dataLost: "All unsaved data will be lost.",
                delClient: "Are you sure to delete this client?",
                delStaff: "Are you sure to delete this staff?",
                delData: "Are you sure to delete this data?",
                delOrder: "Are you sure to delete this order?",
                delWL: "Are you sure to delete this work log?",
                noMatch: "Confirm Password <b>NOT Match</b>",
                noDupAddr:
                    "The email address and phone number must <b>NOT</b> be duplicated.",
                addService: "description must NOT be duplicated",
                noAvailableWL:
                    "No available work log for generating new payslip.",
                pickService: "Pick a service to append",
                pickStaff: "Pick a staff to assign",
                quit: "Are you sure to quit?",
                resetPW: "Please input new password.",
                noDateSelected: "No date selected.",
                selectedDate: "Selected Date: ",
                assignedDates: "Assigned Dates",
                scheduledWork: "Scheduled Work",
                resetTimer: "Are you sure to reset the timer?",
                timerLost: "Current working time record will be lost.",
            },
        },
        btn: {
            all: "All",
            addDate: "Add Date",
            addNewBonus: "Add New Bonus",
            addNewDeduction: "Add Deduction",
            append: "Append",
            addClient: "Register New Client",
            addStuff: "Register New Staff",
            assign: "Assign",
            choose: "Choose",
            close: "Close",
            confirm: "Confirm",
            cancel: "Cancel",
            del: "Delete",
            dlPayslip: "Download Payslip",
            download: "Download",
            edit: "Edit",
            editInfo: "Edit Personal Info",
            goToLogin: "Go to Login",
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
            toggleAll: "Toggle All",
            toggleColumn: "Toggle Columns",
            update: "Update",
            updateIssueDate: "Update Issue Date",
            updateLogo: "Update Logo",
            updateCompany: "Update Company Info",
            yes: "Yes",
            signOut: "Sign Out",
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
            access: "Access",
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
            cancelled: "Cancelled",
            checkPDF: "Check PDF",
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
            dRate: "Deposit Rate",
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
            index: "Index",
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
            newOrder: "New Order",
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
            orderPaymentPreview: "Order Payment Preview",
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
            pc: "Postcode",
            phone1: "Phone",
            phone2: "Phone Number",
            processing: "Processing",
            psid: "Payslip ID",
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
            show: "Show",
            switch: "Switch",
            scheduleDate: "Schedule Date",
            service: "Service",
            services: "Services",
            staff: "Staff",
            staffID: "Staff ID",
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
            tomorrowDuty: "Tomorrow Duty",
            today: "Today",
            total: "Total",
            totalDue: "Total Due",
            totalGst: "Total Gst",
            totalLine: "Line Total",
            totalNetto: "Total Netto",
            totalOrder: "Total Order",
            totalPay: "Total Pay",
            totalPaid: "Total Paid",
            totalUnpaid: "Total Unpaid",
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
            workLogs: "Work Logs",
            workNote: "Work Note",
            workTime: "Work Time",
            workStatus: "Work Status",
            workDetail: "Work Details",
            wlid: "Worklog ID",
            workArrangement: "Work Arrangement",
        },
        tips: {
            noAssignedStaff: "No Assigned Staff",
            noOrder: "No Order",
            noServices: "No Service",
            noPayments: "No Payment",
            noPayslips: "No Payslip",
            npPreService: "No Pre-set Service",
            npPreUnit: "No Pre-set Unit",
            noSelectedDayRange: "No Selected Day Range",
            noDutyToday: "No Work Assignment Today",
            noDutyTomorrow: "No Work Assignment Tomorrow",
            noDeduction: "No Deduction",
            errorTips:
                "Something went wrong. Pleas try Re-Login or Contact Manager.",
            unfinishedPS: "Unfinished Payslip",
            unconfirmedWL: "Unconfirmed Worklogs",
            noClient: "No client",
            noWorklog: "No worklog",
            depositTips1: "A deposit in the amount of ",
            depositTips2:
                " shall be paid by owner to contractor to secure performance of the work on the property. Absent default against contractor, deposit shall be non-refundable and shall be paid upon execution of this contract.",
        },
        toastS: {
            addOrder: "Added A New Order.",
            addedClient: "Registered a new client.",
            addedStaff: "Registered a new staff.",
            addedNewSU: "Added A New Service/Unit.",
            addedPayslip: "Added A New Payslip.",
            delOrder: "Deleted An Order.",
            delStaff: "Deleted A Staff.",
            delWorkLog: "Deleted Work Log.",
            deleteClient: "Deleted A Client.",
            updateClient: "Updated Client Information.",
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
            addPayslip: "Error: Adding A New Payslip.",
            addedNewSU: "Error: Adding A New Service/Unit.",
            delStaff:
                "Error: Deleting Staff Failed. This Staff May Have Worklogs.",
            deleteClient:
                "Error: Deleting Client Failed. This Client May Have Job Orders.",
            delOrder:
                "Error: Deleting Order Failed. Check If The Order meets the condition below: 1. Order Status is 'Pending' or 'Cancelled'. 2. Order has no Worklogs. 3. Order has no Payments.",
            delWorkLog: "Error: Deleted Work Log.",
            existedPE: "Email or Phone already existed",
            updateOrder: "Error: Updating Order Failed",
            updateOrderStatus: "Error: Updated Order Status Failed",
            invalidPayment: "Error: Invalid Payment Amount or Paid Date",
            invalidWorkHours: "Error: Invalid Work Hours",
            overPaid: "Error: Over Paid Amount",
            unMatchPW: "Error: Passwords do not match",
            updateWorkHours: "Error: Updating Work Hours Failed",
            updateCompany: "Error: Updating Company Information Failed",
            updateWL: "Error: Updating Work Log.",
            fileTooLarge: "Error: File is too large.",
            invalidTime: "Error: Invalid Working Time Input",
            responseFailed: "Error: Server Response Failed",
        },
        toastW: {
            selectDate: "Please select a date first.",
            selectDayRange: "Please select the day range first.",
            cantDelWLUnion:
                "Cannot delete this work log. \n Only 'Pending' or 'Cancelled' work log can be deleted.",
            cantDelManager: "Cannot Delete Admin Manager Account.",
            addOrderService: "Please add at least one service to the order.",
            triggerCheckFails:
                "Something wrong with form fields. Please check again.",
            invalidWorkHoursUpdateOthers:
                "Warning: Invalid Work Hours, will just submit changes of work not and deductions.",
            inputReachMax: "Input reached the maximum length.",
        },
        sr: {
            openHeadBarMenu: "Open head bar menu",
            closeSideBar: "Close sidebar",
            closeModal: "Close modal",
            notificationBell: "Notification Bell",
        },
    },
};

export default en;
