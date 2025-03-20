import type { Meeting, MeetingSchedule } from "./types";

const minutesFolder = "https://web-cert.mit.edu/dormcon/cert_minutes/";

/// Note that months in `Date` objects are zero-indexed.

export const meetings: MeetingSchedule = {
    year: "Spring 2025",
    list: [
        generateMeetingSchedule("Simmons", new Date(2025, 1, 13, 19, 0), true),
        generateMeetingSchedule("Maseeh", new Date(2025, 1, 27, 19, 0), true),
        generateMeetingSchedule(
            "MacGregor",
            new Date(2025, 2, 13, 19, 0),
            false,
        ),
        generateMeetingSchedule("Baker", new Date(2025, 3, 3, 19, 0), false),
        generateMeetingSchedule(
            "Burton-Conner",
            new Date(2025, 3, 24, 19, 0),
            false,
        ),
        generateMeetingSchedule(
            "TBD Elections!",
            new Date(2025, 4, 1, 19, 0),
            false,
        ),
    ],
    gcalLink:
        "https://calendar.google.com/calendar/u/0?cid=YmQyNmM4MzhlMjExMzhmMDNhNmY2MmRjMDk2NjMxYTQxOGYxMzU4YTlkNGFhYmI3MTA1MjIwODM3NTNjZGIzZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
};

function generateName(date: Date): string {
    const formatter = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "2-digit",
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
function generateMeetingSchedule(
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
