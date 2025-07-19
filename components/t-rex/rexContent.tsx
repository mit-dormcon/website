import { Suspense } from "react";
import Interpolate from "@docusaurus/Interpolate";
import ErrorBoundary from "@docusaurus/ErrorBoundary";

import { useRexData } from "./helpers";
import { Temporal } from "@js-temporal/polyfill";

export const REXName = () => {
    const { data } = useRexData();

    return (
        <ErrorBoundary fallback={() => "REX"}>
            <Suspense fallback={"REX"}>
                <Interpolate
                    values={{
                        name: data!.name,
                    }}
                >
                    {"{name}"}
                </Interpolate>
            </Suspense>
        </ErrorBoundary>
    );
};

export const REXEventDates = () => {
    const { data } = useRexData();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    } as const;

    const now = Temporal.Now.plainDateISO("America/New_York");
    const inThePast = Temporal.PlainDate.compare(data!.end, now) < 0;
    const startDate = data!.start.toLocaleString("en-US", options);
    const endDate = data!.end.toLocaleString("en-US", options);

    return (
        <ErrorBoundary fallback={() => ""}>
            <Suspense fallback="">
                <Interpolate
                    values={{
                        inThePastRan: inThePast ? "ran" : "runs",
                        inThePastOccured: inThePast ? "occured" : "will occur",
                        start: startDate,
                        end: endDate,
                        name: data!.name,
                    }}
                >
                    {
                        "{name} {inThePastRan} from {start} to {end}, though some events {inThePastOccured} before and after these dates."
                    }
                </Interpolate>
            </Suspense>
        </ErrorBoundary>
    );
};
