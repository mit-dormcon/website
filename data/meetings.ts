import type { Meeting, MeetingSchedule } from "./types";

import { Temporal, Intl } from "@js-temporal/polyfill";
// Date.prototype.toTemporalInstant = toTemporalInstant;

export const minutesFolder = "https://web-cert.mit.edu/dormcon/cert_minutes/";

export const meetings: MeetingSchedule = {
    year: "Fall 2025",
    list: [
        generateMeetingSchedule("East Campus", "2025-09-11 19:00", "docusaurus"),
        generateMeetingSchedule("McCormick", "2025-09-25 19:00", "docusaurus"),
        generateMeetingSchedule("New House", "2025-10-09 19:00", "docusaurus"),
        generateMeetingSchedule("New Vassar", "2025-10-23 19:00", "docusaurus"),
        generateMeetingSchedule("Next House", "2025-11-06 19:00", "docusaurus"),
        generateMeetingSchedule("Random", "2025-11-20 19:00", "docusaurus"),
        generateMeetingSchedule("Simmons", "2025-12-04 19:00", "docusaurus"),
    ],
    gcalLink: "",
};

function generateName(
    date: Temporal.PlainDateTime | Temporal.PlainDate,
): string {
    const formatter = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        year: "numeric",
        hour12: true,
    });
    const text = formatter.format(date);

    const finalText = text.replace(":00", "").replace(" PM", "pm").replace(" AM", "am");
    return finalText;
}

function generateMinutesUrl(
    date: Temporal.PlainDateTime | Temporal.PlainDate,
    where: "athena" | "docusaurus",
): string {
    const year = date.year;
    const month = String(date.month).padStart(2, "0");
    const day = String(date.day).padStart(2, "0");

    if (where === "docusaurus") {
        const semester = month >= "08" ? "fall" : "spring";
        return `/minutes/${semester}-${year}/${year}-${month}-${day}`
    };
    return `${minutesFolder}${year}-${month}-${day}.pdf`
}

// Of course, you can make it manually if you want a custom description like
// "Chat with Concord Market"
export function generateMeetingSchedule(
    location: string,
    date: Temporal.PlainDateTime | Temporal.PlainDate | string,
    minutesUploaded: false | "athena" | "docusaurus" = "docusaurus",
): Meeting {
    if (typeof date === "string") {
        const dateObj = Temporal.PlainDate.from(date);
        try {
            const time = Temporal.PlainTime.from(date); // Check if time is present
            date = dateObj.toPlainDateTime(time);
        } catch {
            // no time is provided, just use the date
            date = dateObj;
        }
    }

    return {
        name: generateName(date),
        location,
        minutesLink: minutesUploaded ? generateMinutesUrl(date, minutesUploaded) : undefined,
    };
}
