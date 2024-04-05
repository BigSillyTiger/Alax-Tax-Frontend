import type { FC } from "react";
import { PayslipTemplate } from "@/pageComponents/pdfTemplates/payslip";

const PdfContent: FC = () => {
    return <PayslipTemplate date={new Date().toISOString()} />;
};

export default PdfContent;
