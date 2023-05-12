import { MeetingSchedule } from "./types";

const minutesFolder = "https://web-cert.mit.edu/dormcon/cert_minutes/";

export const meetings: MeetingSchedule = {
    year: "Spring 2023",
    list: [
        {
            name: "Thursday, February 16th, 2023 at 7pm",
            location: "Baker",
            minutesLink: minutesFolder + "2023-02-16.pdf",
        },
        {
            name: "Thursday, March 2nd, 2023 at 7pm",
            location: "McCormick",
            minutesLink: minutesFolder + "2023-03-02.pdf",
        },
        {
            name: "Thursday, March 16th, 2023 at 7pm",
            location: "Simmons",
            minutesLink: minutesFolder + "2023-03-16.pdf",
        },
        {
            name: "Thursday, April 6th, 2023 at 7pm",
            location: "Random",
            minutesLink: minutesFolder + "2023-04-06.pdf",
        },
        {
            name: "Thursday, April 27th, 2023 at 7pm",
            location: "MacGregor",
            minutesLink: minutesFolder + "2023-04-27.pdf",
        },
        {
            name: "Thursday, May 11th, 2023 at 7pm",
            location: "On Campus (56-114)",
            minutesLink: minutesFolder + "2023-05-11.pdf",
        },
    ],
};
