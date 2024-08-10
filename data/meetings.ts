import type { MeetingSchedule } from "./types";

const minutesFolder = "https://web-cert.mit.edu/dormcon/cert_minutes/";

export const meetings: MeetingSchedule = {
    year: "Spring 2024",
    list: [
        {
            // TODO: Why are we hardcoding this? / manually typing all of this?
            name: "Thursday, February 15th, 2024 at 7:00pm",
            location: "Simmons",
            minutesLink: minutesFolder + "2024-02-15.pdf",
        },
        {
            name: "Thursday, February 29th, 2024 at 7:00pm",
            location: "East Campus (Stud Space)",
            minutesLink: minutesFolder + "2024-02-29.pdf",
        },
        {
            name: "Thursday, March 14th, 2024 at 7:00pm",
            location: "MacGregor",
            minutesLink: minutesFolder + "2024-03-14.pdf",
        },
        {
            name: "Thursday, April 4th, 2024 at 7:00pm",
            location: "Baker",
            minutesLink: minutesFolder + "2024-04-04.pdf",
        },
        {
            name: "Thursday, April 25th, 2024 at 7:00pm",
            location: "New House",
            minutesLink: minutesFolder + "2024-04-25.pdf",
        },
        {
            name: "Thursday, May 9th, 2024 at 7:00pm",
            location: "1-190",
            minutesLink: minutesFolder + "2024-05-09.pdf",
        },
    ],
    gcalLink:
        "https://calendar.google.com/calendar/u/0?cid=NjMxYzZiMjI4Zjg0Y2QzNmVhMjhlYzU4M2JlZmE5OGEwMWRlODIwY2MwMzNjMzI4ZDU5ZDYzYjA1MjM2NjM5NUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
};
