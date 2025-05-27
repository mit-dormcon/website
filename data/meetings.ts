import type { Meeting, MeetingSchedule } from "./types";

const minutesFolder = "https://web-cert.mit.edu/dormcon/cert_minutes/";

/// Note that months in `Date` objects are zero-indexed.

export const meetings: MeetingSchedule = {
    year: "Fall 2025",
    list: [],
    gcalLink: "",
};

function generateName(date: Date): string {
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

function generateMinutesUrl(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // LLM
    const day = String(date.getDate()).padStart(2, "0");
    return `${minutesFolder}${year}-${month}-${day}.pdf`;
}

// Of course, you can make it manually if you want a custom description like
// "Chat with Concord Market"
export function generateMeetingSchedule(
    location: string,
    date: Date,
    minutesUploaded: boolean,
): Meeting {
    return {
        name: generateName(date),
        location,
        minutesLink: minutesUploaded ? generateMinutesUrl(date) : undefined,
    };
}
