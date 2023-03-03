import { MeetingSchedule } from "./types";

export const meetings: MeetingSchedule = {
    year: "Spring 2023",
    list: [
        {
            name: "Thursday, February 16th, 2023 at 7pm",
            location: "Baker",
            minutesLink:
                "https://web-cert.mit.edu/dormcon/cert_minutes/2023-02-16.pdf",
        },
        {
            name: "Thursday, March 2nd, 2023 at 7pm",
            location: "McCormick",
            minutesLink:
                "https://web-cert.mit.edu/dormcon/cert_minutes/2023-03-02.pdf",
        },
        {
            name: "Thursday, March 16th, 2023 at 7pm",
            location: "Simmons",
        },
        {
            name: "Thursday, April 6th, 2023 at 7pm",
            location: "Random",
        },
        {
            name: "Thursday, April 27th, 2023 at 7pm",
            location: "MacGregor",
        },
        {
            name: "Thursday, May 11th, 2023 at 7pm",
            location: "On Campus (TBD)",
        },
    ],
};
