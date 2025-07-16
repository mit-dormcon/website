import useSWR, { preload } from "swr";

import type {
    TRexAPIResponse,
    TRexRawEvent,
    TRexProcessedEvent,
    TRexProcessedData,
} from "./types";

const API_URL = "https://rex.mit.edu/api.json";

const rexFetcher = async (url: string) => {
    const res = await fetch(url);
    const json = (await res.json()) as TRexAPIResponse;

    return {
        ...json,
        published: new Date(json.published),
        events: json.events.map((ev: TRexRawEvent) => {
            const newEvent: TRexProcessedEvent = {
                ...ev,
                start: new Date(ev.start),
                end: new Date(ev.end),
            };
            return newEvent;
        }),
        colors: {
            dorms: new Map<string, string>(Object.entries(json.colors.dorms)),
            tags: new Map<string, string>(Object.entries(json.colors.tags)),
        },
        start: new Date(json.start),
        end: new Date(json.end),
    };
};

const preloadedData = preload(API_URL, rexFetcher);

export const useRexData = () => {
    const swr = useSWR<TRexProcessedData>(API_URL, rexFetcher, {
        suspense: true,
        fallbackData: preloadedData,
    });

    return swr;
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
