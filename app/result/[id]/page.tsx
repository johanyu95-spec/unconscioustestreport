"use client";

import ReportPage from "../../report/page";

export default function ResultPage() {
    // Simply render the Report Page as the Result Page
    // This allows /result/[id] to show the full graph-rich report
    // reusing the exact same logic and store connection.
    return <ReportPage />;
}
