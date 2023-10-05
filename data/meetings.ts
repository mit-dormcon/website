import type { MeetingSchedule } from "./types";

const minutesFolder = "https://web-cert.mit.edu/dormcon/cert_minutes/";

export const meetings: MeetingSchedule = {
    year: "Fall 2023",
    list: [
        {
            name: "Thursday, Semptember 14th, 2023 at 7:30pm",
            location: "Burton Conner",
            minutesLink: minutesFolder + "2023-09-14.pdf",
        },
        {
            name: "Thursday, September 28th, 2023 at 7:30pm",
            location: "Maseeh",
            minutesLink: minutesFolder + "2023-09-28.pdf",
        },
        {
            name: "Thursday, October 12th, 2023 at 7:30pm",
            location: "New Vassar",
        },
        {
            name: "Thursday, October 26th, 2023 at 7:30pm",
            location: "Next",
        },
        {
            name: "Thursday, November 9th, 2023 at 7:30pm",
            location: "McCormick",
        },
        {
            name: "Thursday, November 30th, 2023 at 7:30pm",
            location: "Random",
        },
    ],
};
