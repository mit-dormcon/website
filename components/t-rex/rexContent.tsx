import Interpolate from "@docusaurus/Interpolate";

import { useRexData } from "./helpers";

if (!("Temporal" in globalThis)) {
    await import("temporal-polyfill/global");
}

export const REXName = () => {
    const { data } = useRexData();

    return (
        <Interpolate
            values={{
                name: data?.name ?? "REX",
            }}
        >
            {"{name}"}
        </Interpolate>
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

    const formatter = new Intl.DateTimeFormat("en-US", options);

    const now = Temporal.Now.plainDateISO("America/New_York");
    const inThePast = data
        ? Temporal.PlainDate.compare(data.end, now) < 0
        : false;
    const startDate = formatter.format(data?.start);
    const endDate = formatter.format(data?.end);

    return (
        <Interpolate
            values={{
                inThePastRan: inThePast ? "ran" : "runs",
                inThePastOccured: inThePast ? "occured" : "will occur",
                start: startDate,
                end: endDate,
                name: data?.name ?? "REX",
            }}
        >
            {
                "{name} {inThePastRan} from {start} to {end}, though some events {inThePastOccured} before and after these dates."
            }
        </Interpolate>
    );
};

export function LoadingFallback() {
    return (
        <div>
            <p>Loading...</p>
            <p>
                <b>Stuck on this page?</b> Make sure you&#x27;re connected to a
                network and have JavaScript enabled.
            </p>
        </div>
    );
}

export function Error() {
    return (
        <div>
            <p>There was an error loading the REX data.</p>
            <p>
                <b>Stuck on this page?</b> Make sure you&#x27;re connected to a
                network and have JavaScript enabled.
            </p>
        </div>
    );
}
