import Interpolate from "@docusaurus/Interpolate";
import { useRexData } from "@site/components/t-rex/TRexApp";

export const REXName = () => {
    const { data, isLoading } = useRexData();

    if (isLoading || data === undefined) {
        return "REX";
    }

    return (
        <Interpolate
            values={{
                name: isLoading || data === undefined ? "REX" : data.name,
            }}
        >
            {"{name}"}
        </Interpolate>
    );
};

export const REXEventDates = () => {
    const { data, isLoading } = useRexData();

    if (isLoading || data === undefined) {
        return "";
    }

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
    } as const;

    const inThePast = data.end < new Date();
    const startDate = data.start.toLocaleDateString("en-US", options);
    const endDate = data.end.toLocaleDateString("en-US", options);

    return (
        <Interpolate
            values={{
                inThePastRan: inThePast ? "ran" : "runs",
                inThePastOccured: inThePast ? "occured" : "will occur",
                start: startDate,
                end: endDate,
                name: isLoading || data === undefined ? "REX" : data.name,
            }}
        >
            {
                "{name} {inThePastRan} from {start} to {end}, though some events {inThePastOccured} before and after these dates."
            }
        </Interpolate>
    );
};
