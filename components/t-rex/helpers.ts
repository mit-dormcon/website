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
    // return json;

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

function standardize_color(str: string) {
    const ctx = document.createElement("canvas").getContext("2d");

    if (!ctx) {
        throw new Error("Failed to create canvas context");
    }

    ctx.fillStyle = str;
    return ctx.fillStyle;
}

// https://www.w3.org/TR/WCAG20/#relativeluminancedef
export function getOptimalForegroundColor(bgColor: string, WCAG20 = true) {
    const color = standardize_color(bgColor);

    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5), 16);

    if (WCAG20) {
        const RsRGB = r / 255;
        const GsRGB = g / 255;
        const BsRGB = b / 255;

        const R =
            RsRGB <= 0.03928
                ? RsRGB / 12.92
                : Math.pow((RsRGB + 0.055) / 1.055, 2.4);
        const G =
            GsRGB <= 0.03928
                ? GsRGB / 12.92
                : Math.pow((GsRGB + 0.055) / 1.055, 2.4);
        const B =
            BsRGB <= 0.03928
                ? BsRGB / 12.92
                : Math.pow((BsRGB + 0.055) / 1.055, 2.4);

        const L = 0.2126 * R + 0.7152 * G + 0.0722 * B;

        return L > Math.sqrt(1.05 * 0.05) - 0.05 ? "#000" : "#fff";
    } else {
        return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000" : "#fff";
    }
}
