import type { MeetingSchedule } from "./types";

const minutesFolder = "https://web-cert.mit.edu/dormcon/cert_minutes/";

export const meetings: MeetingSchedule = {
    year: "Spring 2024",
    list: [
        {
            name: "Thursday, February 15th, 2024 at 7:00pm",
            location: "Simmons",
        },
        {
            name: "Thursday, February 29th, 2024 at 7:00pm",
            location: "East Campus (Stud Space)",
        },
        {
            name: "Thursday, March 14th, 2024 at 7:00pm",
            location: "MacGregor",
        },
        {
            name: "Thursday, April 4th, 2024 at 7:00pm",
            location: "Baker",
        },
        {
            name: "Thursday, April 25th, 2024 at 7:00pm",
            location: "New House",
        },
        {
            name: "Thursday, May 9th, 2024 at 7:00pm",
            location: "1-190",
        },
    ],
    gcalLink:
        "https://calendar.google.com/calendar/u/0?cid=NjMxYzZiMjI4Zjg0Y2QzNmVhMjhlYzU4M2JlZmE5OGEwMWRlODIwY2MwMzNjMzI4ZDU5ZDYzYjA1MjM2NjM5NUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
};
