import Card from "@/components/card";
import { OrderChart } from "@/pageComponents/charts";
import type { FC } from "react";

import SummaryContent from "./SummaryContent";
import Title from "./Title";

const ChartCard: FC = () => {
    return (
        <Card className="w-full">
            <>
                <Title />
                <SummaryContent />
                <div className="h-[30dvh]">
                    <OrderChart />
                </div>
            </>
        </Card>
    );
};

export default ChartCard;
