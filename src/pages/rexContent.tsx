import { useRexData } from "@site/components/t-rex/TRexApp";

export const REXName = () => {
    const { data, isLoading } = useRexData();

    if (isLoading || data === undefined) {
        return "REX";
    }
    return `${data.name}`;
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

    return `${data.name} ${inThePast ? "ran" : "runs"} from ${startDate} to ${endDate}, though some events ${inThePast ? "occured" : "will occur"} before and after these dates.`;
};
