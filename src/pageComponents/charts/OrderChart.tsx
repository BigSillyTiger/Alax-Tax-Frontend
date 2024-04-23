import type { FC } from "react";
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { useCtPaymentStore } from "@/configs/zustore";
import { useTranslation } from "react-i18next";

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);

const OrderChart: FC = () => {
    const { t } = useTranslation();
    const currentYear = useCtPaymentStore((state) => state.currentYear);
    const paymentAll = useCtPaymentStore((state) => state.paymentAll);
    const orderAll = useCtPaymentStore((state) => state.orderAll);
    const unpaidAll = useCtPaymentStore((state) => state.unpaidAll);

    const paymentContent = paymentAll[currentYear]
        ? Object.values(paymentAll[currentYear])
        : [];
    const orderContent = orderAll[currentYear]
        ? Object.values(orderAll[currentYear])
        : [];
    const unpaidContent = unpaidAll[currentYear]
        ? Object.values(unpaidAll[currentYear])
        : [];

    //const allMonths
    const allMonthsSet = new Set<string>();
    paymentAll[currentYear] &&
        Object.keys(paymentAll[currentYear]).forEach((m) =>
            allMonthsSet.add(m)
        );
    orderAll[currentYear] &&
        Object.keys(orderAll[currentYear]).forEach((m) => allMonthsSet.add(m));
    unpaidAll[currentYear] &&
        Object.keys(unpaidAll[currentYear]).forEach((m) => allMonthsSet.add(m));

    // Convert the Set back to an array
    const labels = Array.from(allMonthsSet);

    const data = {
        labels,
        datasets: [
            {
                type: "line" as const,
                label: t("label.newOrder"),
                borderColor: "rgb(255, 159, 64)",
                borderWidth: 2,
                yAxisID: "Y1",
                fill: false,
                order: 1,
                data: orderContent,
                pointRadius: 7,
            },
            {
                type: "bar" as const,
                label: t("label.payments"),
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                data: paymentContent,
                yAxisID: "Y",
                order: 2,
                borderWidth: 2,
            },
            {
                type: "bar" as const,
                label: t("status.unpaid"),
                borderColor: "rgba(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                data: unpaidContent,
                yAxisID: "Y",
                order: 3,
                borderWidth: 2,
            },
        ],
    };

    const options = {
        plugin: {
            title: {
                display: true,
                text: "Chart.js Line Chart - External Tooltips" as const,
            },
        },
        interaction: {
            intersect: true,
            mode: "dataset" as const,
            //mode: "index " as const,
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: { stacked: true },
            /* for order count */
            Y: {
                type: "linear" as const,
                display: true,
                position: "left" as const,
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: (tickValue: string | number) => {
                        const value =
                            typeof tickValue === "number"
                                ? tickValue
                                : parseFloat(tickValue);
                        return `$${value.toFixed(2)}`;
                    },
                },
            },
            /* for payment */
            Y1: {
                type: "linear" as const,
                display: false,
                position: "right" as const,
            },
        },
    };
    return <Chart type="bar" data={data} options={options} />;
};

export default OrderChart;
