import type { MeetingSchedule } from "./types";

const minutesFolder = "https://web-cert.mit.edu/dormcon/cert_minutes/";

export const meetings: MeetingSchedule = {
    year: "Fall 2024",
    list: [
        {
            name: "Thursday, September 12th, 2024 at 7:00pm",
            location: "Simmons",
        },
        {
            name: "Thursday, September 26th, 2024 at 7:00pm",
            location: "New House",
        },
        {
            name: "Thursday, October 10th, 2024 at 7:00pm",
            location: "New Vassar",
        },
        {
            name: "Thursday, October 24th, 2024 at 7:00pm",
            location: "Next House",
        },
        {
            name: "Thursday, November 7th, 2024 at 7:00pm",
            location: "McCormick",
        },
        {
            name: "Thursday, December 5th, 2024 at 7:00pm",
            location: "Random",
        },
    ],
    // gcalLink:
    //     "https://calendar.google.com/calendar/u/0?cid=NjMxYzZiMjI4Zjg0Y2QzNmVhMjhlYzU4M2JlZmE5OGEwMWRlODIwY2MwMzNjMzI4ZDU5ZDYzYjA1MjM2NjM5NUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
};
