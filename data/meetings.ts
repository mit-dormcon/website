import type { Meeting, MeetingSchedule } from "./types";

import { Temporal, Intl } from '@js-temporal/polyfill';
// Date.prototype.toTemporalInstant = toTemporalInstant;

export const minutesFolder = "https://web-cert.mit.edu/dormcon/cert_minutes/";

export const meetings: MeetingSchedule = {
    year: "Fall 2025",
    list: [],
    gcalLink: "",
};

function generateName(date: Temporal.PlainDateTime | Temporal.PlainDate): string {
    const formatter = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        year: "numeric",
        hour12: true,
    });
    return formatter.format(date);
}

function generateMinutesUrl(date: Temporal.PlainDateTime | Temporal.PlainDate): string {
    const year = date.year;
    const month = String(date.month).padStart(2, "0");
    const day = String(date.day).padStart(2, "0");
    return `${minutesFolder}${year}-${month}-${day}.pdf`;
}


// Of course, you can make it manually if you want a custom description like
// "Chat with Concord Market"
export function generateMeetingSchedule(
    location: string,
    date: Temporal.PlainDateTime | Temporal.PlainDate | string,
    minutesUploaded = true,
): Meeting {
    if (typeof date === "string") {
        try {
            date = Temporal.PlainDateTime.from(date);
        } catch {
            try {
                date = Temporal.PlainDate.from(date);
            } catch {
                throw new Error(`Invalid date string: ${date.toString()}`);
            }
        }
    }

    return {
        name: generateName(date),
        location,
        minutesLink: minutesUploaded ? generateMinutesUrl(date) : undefined,
    };
}
