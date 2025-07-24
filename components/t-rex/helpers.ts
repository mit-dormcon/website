import useSWR, { preload } from "swr";
import { Temporal } from "@js-temporal/polyfill";

import type { TRexAPIResponse, TRexProcessedData } from "./types";

const API_URL = "https://rex.mit.edu/api.json";

const fetcher = async <T>(url: string) => fetch(url).then((res) => res.json() as T);

const rexConverter = (json: TRexAPIResponse): TRexProcessedData => {
    return {
        ...json,
        published: Temporal.Instant.from(json.published),
        events: json.events.map((ev) => ({
            ...ev,
            start: Temporal.Instant.from(ev.start),
            end: Temporal.Instant.from(ev.end),
        })),
        colors: {
            dorms: new Map(Object.entries(json.colors.dorms)),
            tags: new Map(Object.entries(json.colors.tags)),
            groups: new Map(
                Object.entries(json.colors.groups).map(([group, colors]) => [
                    group,
                    new Map(Object.entries(colors)),
                ]),
            ),
        },
        start: Temporal.PlainDate.from(json.start),
        end: Temporal.PlainDate.from(json.end),
    };
};

const preloadedData = preload<TRexAPIResponse>(API_URL, fetcher);

export const useRexData = () => {
    const { data } = useSWR<TRexAPIResponse>(API_URL, fetcher, {
        suspense: true,
        fallbackData: preloadedData,
    })

    const rexData = data ? rexConverter(data) : undefined;

    return { data: rexData };
};

// Helper function to get a value from a Map or Object (just in case types are being weird)
export const map_or_object = <T>(
    obj: Map<string, T> | Record<string, T> | undefined,
    key: string,
) => {
    if (!obj) return undefined;

    if (obj instanceof Map) {
        return obj.get(key);
    } else {
        return obj[key];
    }
};
