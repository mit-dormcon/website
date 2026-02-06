import type { Meeting, MeetingSchedule } from "./types";

export const minutesFolder = "https://web-cert.mit.edu/dormcon/cert_minutes/";

export const meetings: MeetingSchedule = {
    year: "Spring 2026",
    list: [
        generateMeetingSchedule("Baker", "2026-02-12 19:30", false),
        generateMeetingSchedule("Burton-Conner", "2026-02-26 19:30", false),
        generateMeetingSchedule("MacGregor", "2026-03-12 19:30", false),
        generateMeetingSchedule("Maseeh", "2026-04-02 19:30", false),
        generateMeetingSchedule("McCormick", "2026-05-23 19:30", false),
        generateMeetingSchedule("TBD (Elections!)", "2026-05-07 19:30", false),
    ],
};

function nth(d: number) {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

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
    const day = date.day;

    const finalText = text
        .replace(String(day), `${day}${nth(day)}`)
        .replace(":00", "")
        .replace(" PM", "pm")
        .replace(" AM", "am");
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
        return `/minutes/${semester}-${year}/${year}-${month}-${day}`;
    }
    return `${minutesFolder}${year}-${month}-${day}.pdf`;
}

// Of course, you can make it manually if you want a custom description like
// "Chat with Concord Market"
export function generateMeetingSchedule(
    location: string,
    date: Temporal.PlainDateTime | Temporal.PlainDate | string,
    // TODO: change to docusaurus when its all ready...
    minutesUploaded: false | "athena" | "docusaurus" = "athena",
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
        minutesLink: minutesUploaded
            ? generateMinutesUrl(date, minutesUploaded)
            : undefined,
    };
}
