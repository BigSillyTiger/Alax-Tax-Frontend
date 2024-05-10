// the script for the Chinese language
const en = {
    translation: {
        login: {
            text: {
                errLoginTitle: "登录时发生了一些错误：",
                checkEmail: "请检查您的电子邮件地址。",
                checkPW: "请检查您的密码。",
                forgotPW: "忘记密码了？",
                rememberMe: "记住我",
                pw: "密码",
                email: "电子邮件",
                signIn: "登录到您的帐户",
            },
            btn: { signIn: "登入", logining: "登录中..." },
        },
        menu: {
            dashboard: "仪表板",
            calendar: "日历",
            clients: "客户",
            orders: "订单",
            worklogs: "工作日志",
            staff: "员工",
            setting: "设置",
        },
        status: {
            pending: "待定",
            ongoing: "进行中",
            cancelled: "已取消",
            unconfirmed: "未确认",
            confirmed: "已确认",
            resting: "休息",
            unpaid: "未付款",
            completed: "已完成",
        },
        modal: {
            title: {
                delete: "删除警告",
                addClient: "注册新客户",
                addOrder: "添加新订单",
                addService: "添加新服务",
                addStaff: "注册新员工",
                addUnit: "添加新单位",
                alert: "警报",
                editService: "编辑服务",
                editUnit: "编辑单位",
                editOrder: "编辑订单",
                invoice: "发票",
                jobAssign: "分配工作",
                jobEdit: "编辑工作",
                payments: "对订单进行付款或编辑",
                payslip: "工资单制作",
                quotation: "报价",
                resetPW: "重置密码",
                roleAdmin: "角色 <s>（页面访问权限）</s>",
                timeTracker: "时间追踪器",
                updateClient: "更新客户信息",
                updateStaff: "更新员工信息",
            },
            tips: {
                addUni: "该 {{name}} 描述不得重复。",
                dataLost: "所有未保存的数据将丢失。",
                delClient: "您确定要删除此客户吗？",
                delStaff: "您确定要删除此员工吗？",
                delData: "您确定要删除这些数据吗？",
                delOrder: "您确定要删除此订单吗？",
                delWL: "您确定要删除此工作日志吗？",
                noMatch: "确认密码 <b>不匹配</b>",
                noDupAddr: "电子邮件地址和电话号码不得重复。",
                addService: "描述不得重复",
                noAvailableWL: "没有可用的工作日志来生成新的工资单。",
                pickService: "选择要追加的服务",
                pickStaff: "选择要分配的员工",
                quit: "您确定要退出吗？",
                resetPW: "请输入新密码。",
                noDateSelected: "未选择日期。",
                selectedDate: "选择的日期：",
                assignedDates: "已分配日期",
                scheduledWork: "预定工作",
                resetTimer: "您确定要重置计时器吗？",
                timerLost: "当前工作时间记录将丢失。",
            },
        },
        btn: {
            addDate: "添加日期",
            addNewBonus: "添加新奖金",
            addNewDeduction: "添加扣除项",
            append: "追加",
            addClient: "注册新客户",
            addStuff: "注册新员工",
            assign: "分配",
            confirm: "确认",
            close: "关闭",
            cancel: "取消",
            del: "删除",
            dlPayslip: "下载工资单",
            download: "下载",
            edit: "编辑",
            editInfo: "编辑个人信息",
            invoice: "发票",
            newOrder: "新订单",
            newService: "新服务",
            newUnit: "新单位",
            pay: "支付",
            payslip: "工资单",
            quotation: "报价",
            resetIssue: "重置发布日期",
            resetPW: "重置密码",
            submit: "提交",
            submitting: "提交中...",
            timeReset: "重置计时器",
            timeStart: "开始计时器",
            timeStop: "停止计时器",
            timeBreak: "休息一下",
            timeResume: "继续",
            toggleAll: "全部显示",
            toggleColumn: "列显示",
            update: "更新",
            updateIssueDate: "更新发布日期",
            updateLogo: "更新徽标",
            updateCompany: "更新公司信息",
            yes: "是",
            signOut: "登出",
        },
        placeholder: {
            emailPH: "you@example.com",
            max: "最大",
            min: "最小",
            search: "搜索",
        },
        label: {
            abn: "ABN",
            acc: "帐号",
            addr: "地址",
            address: "地址",
            addrJob: "工作地址",
            amount: "数量",
            assignStaff: "分配员工",
            assignedStaff: "已分配员工",
            aud: "澳元",
            balance: "余额",
            billTo: "账单寄至",
            bld: "BLD",
            bonus: "奖金",
            bsb: "BSB",
            break: "休息",
            bank: "银行账户",
            cancelled: "已取消",
            checkPDF: "检查PDF",
            city: "城市",
            client: "客户",
            clientID: "客户ID",
            clientInfo: "客户信息",
            closed: "关闭",
            company: "公司",
            companyName: "公司名称",
            completed: "已完成",
            companyInfo: "公司信息",
            confirmedWU: "确认的工作单位",
            confirmedWL: "确认的工作日志",
            country: "国家",
            date: "日期",
            datePicker: "日期选择器",
            deduction: "扣除项",
            defaultUnit: "默认单位",
            defaultPrice: "默认价格",
            deposit: "押金",
            desc: "描述",
            details: "细节",
            defaultIssueDate: "默认发布日期",
            due: "到期",
            email1: "电子邮件",
            email2: "电子邮件地址",
            employee: "员工",
            end: "结束",
            feeStatus: "费用状态",
            firstName: "名字",
            from: "从",
            fullAccess: "完全",
            gst: "消费税",
            hr: "时薪",
            id: "ID",
            idClient: "客户ID",
            idOrder: "订单ID",
            invoice: "发票",
            issuedDate: "发票日期",
            lastName: "姓氏",
            logo: "徽标",
            logoName: "徽标名称",
            logoCurrent: "当前徽标",
            logoUpload: "上传徽标",
            manager: "经理",
            menu: "菜单",
            name: "名称",
            newOrder: "新订单",
            note: "备注",
            netto: "净价",
            newIssueDate: "新的发布日期",
            none: "无",
            noContent: "无内容",
            openMenu: "打开菜单",

            orderDesc: "订单描述",
            orderInfo: "订单信息",
            orderDate: "订单日期",
            orderDetail: "订单详情",
            orderPaymentPreview: "订单付款预览",
            orderServices: "订单服务信息",
            page: "页",
            pageAccessSetting: "页面访问设置",
            paid: "已支付",
            paidAmount: "支付金额",
            paidDate: "支付日期",
            password: "密码",
            pwInput: "新密码",
            pwConfirm: "确认密码",
            payAmount: "支付金额",
            payments: "支付",
            paymentTo: "支付给",
            payDate: "支付日期",
            payslip: "工资单",
            payPeriod: "支付周期",
            payTo: "支付给",
            pending: "待定",
            period: "工作周期",
            pc: "邮政编码",
            phone1: "电话",
            phone2: "电话号码",
            processing: "处理中",
            psid: "工资单ID",
            qty: "数量",
            quotation: "报价",
            readOnly: "只读",
            rank: "等级",
            rate: "费率",
            role: "角色",
            roleSelection: "选择角色",
            salary: "工资",
            selectStaff: "选择员工",
            servicesDetails: "服务详情",
            serviceList: "服务列表",
            show: "显示",
            switch: "切换",
            service: "服务",
            services: "服务",
            staff: "员工",
            staffInfo: "员工信息",
            staffWL: "员工工作日志",
            state: "州",
            start: "开始",
            status: "状态",
            subtotal: "小计",
            suburb: "郊区",
            tax: "税",
            taxable: "应税",
            tel: "电话",
            templateInvoice: "发票模板",
            templateQuotation: "报价模板",
            thisPay: "本次支付",
            timeInfo: "时间信息",
            timeEnd: "结束",
            timeStart: "开始",
            timeBreak: "休息",
            todayDuty: "今日任务",
            tomorrowDuty: "明日任务",
            today: "今天",
            total: "总计",
            totalDue: "总计到期",
            totalGst: "总消费税",
            totalLine: "总行",
            totalNetto: "总净价",
            totalOrder: "总订单",
            totalPay: "总支付",
            totalPaid: "总支付",
            totalUnpaid: "总未支付",
            totalWH: "总工作小时",
            uid: "UID",
            unit: "单位",
            units: "单位",
            unitList: "单位列表",
            uPrice: "单位价格",
            serviceDesc: "服务描述",
            selectRole: "选择角色",
            workAddr: "工作地址",
            workDate: "工作日期",
            workHours: "工作小时",
            workInfo: "工作信息",
            workLogs: "工作日志",
            workNote: "工作备注",
            workTime: "工作时间",
            workStatus: "工作状态",
            workDetail: "工作详情",
            wlid: "工作日志ID",
            workArrangement: "工作安排",
        },
        tips: {
            noAssignedStaff: "未分配员工",
            noOrder: "无订单",
            noServices: "无服务",
            noPayments: "无付款",
            noPayslips: "无工资单",
            npPreService: "无预设服务",
            npPreUnit: "无预设单位",
            noSelectedDayRange: "未选择日期范围",
            noDutyToday: "今天无工作任务",
            noDutyTomorrow: "明天无工作任务",
            noDeduction: "无扣除项",
            errorTips: "数据错误，请尝试重新登陆或者联系管理员。",
            unfinishedPS: "未完成的工资单",
            unconfirmedWL: "未确认的工作日志",
            noClient: "无客户",
            noWorklog: "无工作日志",
        },
        toastS: {
            addOrder: "添加了新订单。",
            addedClient: "注册了新客户。",
            addedStaff: "注册了新员工。",
            addedNewSU: "添加了新服务/单位。",
            addedPayslip: "添加了新工资单。",
            delOrder: "删除了一个订单。",
            delStaff: "删除了一个员工。",
            delWorkLog: "删除了工作日志。",
            updateClient: "更新了客户信息。",
            updateCompany: "更新了公司信息。",
            updateOrder: "更新了订单详情。",
            updateOrderStatus: "更新了订单状态。",
            updatePayment: "更新了付款详情。",
            updateStaff: "更新了员工信息。",
            updateLogo: "更新了徽标。",
            updateWorkLog: "更新了工作分配。",
            updateWorkHours: "更新了工作小时。",
            updateWL: "更新了工作日志。",
        },
        toastF: {
            addOrder: "错误：添加新订单失败",
            addPayslip: "错误：添加新工资单。",
            addedNewSU: "错误：添加新服务/单位。",
            delOrder: "错误：删除订单失败",
            delWorkLog: "错误：删除工作日志。",
            existedPE: "电子邮件或电话已存在",
            updateOrder: "错误：更新订单失败",
            updateOrderStatus: "错误：更新订单状态失败",
            invalidPayment: "错误：无效的付款金额或支付日期",
            invalidWorkHours: "错误：无效的工作小时数",
            overPaid: "错误：支付金额过多",
            unMatchPW: "错误：密码不匹配",
            updateWorkHours: "错误：更新工作小时失败",
            updateWL: "错误：更新工作日志。",
        },
        toastW: {
            selectDate: "请先选择一个日期。",
            selectDayRange: "请先选择日期范围。",
            cantDelWLUnion:
                "无法删除此工作日志。\n仅'待定'或'已取消'的工作日志可被删除。",
            cantDelManager: "无法删除管理员账户。",
            addOrderService: "请至少添加一个服务到订单。",
        },
        sr: {
            openHeadBarMenu: "打开头部菜单",
            closeSideBar: "关闭侧边栏",
            closeModal: "关闭模态框",
            notificationBell: "通知铃",
        },
    },
};

export default en;
