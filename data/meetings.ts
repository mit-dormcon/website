import type { Meeting, MeetingSchedule } from "./types";

if (!("Temporal" in globalThis)) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("temporal-polyfill/global");
}

export const minutesFolder = "https://web-cert.mit.edu/dormcon/cert_minutes/";

export const markdownTransition: Temporal.PlainDate = new Temporal.PlainDate(2021, 2, 25);

export const meetings: MeetingSchedule = {
    year: "Spring 2026",
    list: [
        generateMeetingSchedule("Baker", "2026-02-12 19:30"),
        generateMeetingSchedule("Burton-Conner", "2026-02-26 19:30", false),
        generateMeetingSchedule("MacGregor", "2026-03-12 19:30", false),
        generateMeetingSchedule("Maseeh", "2026-04-02 19:30", false),
        generateMeetingSchedule("McCormick", "2026-04-23 19:30", false),
        generateMeetingSchedule("TBD (Elections!)", "2026-05-07 19:30", false),
    ],
};

export const nextMeeting : Meeting | undefined = (meetings.list.find((value: Meeting) => {
        // const link = value.minutesLink;
        // const ix = link? link.lastIndexOf("/") : 0;
        // Return the first meeting where the meeting date is after or on today
        return value.date? Temporal.PlainDate.compare(Temporal.PlainDate.from(value.date), Temporal.Now.plainDateISO())>=0 : false;
}));

export const nextMeetingBanner : string = nextMeeting? nextMeeting.date?
            `<strong>Our next GBM will be in ${nextMeeting.location} on ${formatBannerDate(nextMeeting.date)}!</strong>`
            : `<strong>Our next GBM will be in ${nextMeeting.location}!</strong>`
            : `<string>No meetings until next semester. Check back soon for the new schedule!</strong>`;

function formatBannerDate(date : Temporal.PlainDate | Temporal.PlainDateTime): string{
    const formatter = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });
    const text = formatter.format(date);
    const day = date.day;

    const finalText = text
        .replace(String(day), `${day}${nth(day)}`)
    return finalText;
}

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
        return `/minutes/${year}-${month}-${day}`;
    }
    return `${minutesFolder}${year}-${month}-${day}.pdf`;
}

// Of course, you can make it manually if you want a custom description like
// "Chat with Concord Market"
export function generateMeetingSchedule(
    location: string,
    date: Temporal.PlainDateTime | Temporal.PlainDate | string,
    // TODONETHEOTHERWAY: change to docusaurus when ready
    minutesUploaded: false | "athena" | "docusaurus" = "athena",
): Meeting {
    if (typeof date === "string") {
        const dateObj = Temporal.PlainDate.from(date);
        try {
            const time = Temporal.PlainTime.from(date); // Check if time is present
            date = dateObj.toPlainDateTime(time);
            if (minutesUploaded && Temporal.PlainTime.compare(date, (markdownTransition.toPlainDateTime(time))) >= 0) {
                minutesUploaded = "docusaurus";
            }
        } catch {
            // no time is provided, just use the date
            date = dateObj;

            if (minutesUploaded && Temporal.PlainDate.compare(date, markdownTransition) >= 0) {
                minutesUploaded = "docusaurus";
            }
        }
    }

    return {
        name: generateName(date),
        location,
        minutesLink: minutesUploaded
            ? generateMinutesUrl(date, minutesUploaded)
            : undefined,
        date: date,
    };
}
