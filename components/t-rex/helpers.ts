import useSWR, { preload } from "swr";

import type { TRexAPIResponse, TRexProcessedData } from "./types";

import "temporal-polyfill/global";

const API_URL = "https://rex.mit.edu/api.json";

const fetcher = async (url: string) =>
    fetch(url)
        .then((res) => res.json() as Promise<TRexAPIResponse>)
        .then((data) => rexConverter(data));

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

void preload<TRexProcessedData>(API_URL, fetcher);

export const useRexData = () => {
    return useSWR<TRexProcessedData>(API_URL, fetcher);
};

// Helper function to get a value from a Map or Object (just in case types are being weird)
export const mapOrObject = <K extends string | number | symbol, V>(
    obj: Map<K, V> | Record<K, V> | undefined,
    key: K,
) => {
    if (!obj) return undefined;

    if (obj instanceof Map) {
        return obj.get(key);
    } else {
        return obj[key];
    }
};

// reuse across calls for performance :wilt:
let sharedColorCtx: CanvasRenderingContext2D | null = null;

function standardizeColor(str: string) {
    sharedColorCtx ??= document.createElement("canvas").getContext("2d");

    if (!sharedColorCtx) {
        throw new Error("Failed to create canvas context");
    }

    // reset to black first in case input is invalid
    sharedColorCtx.fillStyle = "#000000";
    sharedColorCtx.fillStyle = str;
    return sharedColorCtx.fillStyle;
}

function parseStandardizedColor(color: string): [number, number, number] {
    if (color.startsWith("#")) {
        return [
            parseInt(color.substring(1, 3), 16),
            parseInt(color.substring(3, 5), 16),
            parseInt(color.substring(5, 7), 16),
        ];
    }

    // apparently canvas can return rgb() and rgba() strings ???
    const match = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(color);
    if (match) {
        return [Number(match[1]), Number(match[2]), Number(match[3])];
    }

    // if it returns something else then...
    return [0, 0, 0];
}

// https://www.w3.org/TR/WCAG20/#relativeluminancedef
export function getOptimalForegroundColor(bgColor: string, WCAG20 = false) {
    const color = standardizeColor(bgColor);
    const [r, g, b] = parseStandardizedColor(color);

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
