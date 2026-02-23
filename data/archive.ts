import { MeetingSchedule, Term } from "./types";
import { generateMeetingSchedule } from "./meetings";

const minutesFolderOld = "https://web-cert.mit.edu/dormcon/minutes/";

// Most recent first, since the first tab gets auto-selected and it makes more sense logically
// Older minutes are in a different order, copied from old website

interface MinutesLink {
    year: string;
    href: string;
    text: string;
}

const meetings: (MeetingSchedule | MinutesLink)[] = [
    {
        year: "Fall 2025",
        list: [
            generateMeetingSchedule("East Campus", "2025-09-11 19:00"),
            generateMeetingSchedule("McCormick", "2025-09-25 19:00"),
            generateMeetingSchedule("New House", "2025-10-09 19:00"),
            generateMeetingSchedule("New Vassar", "2025-10-23 19:00"),
            generateMeetingSchedule("Next House", "2025-11-06 19:00"),
            generateMeetingSchedule("Random", "2025-11-20 19:00"),
            generateMeetingSchedule("Simmons", "2025-12-04 19:00"),
        ],
        gcalLink: "",
    },
    {
        year: "Spring 2025",
        list: [
            generateMeetingSchedule("Simmons", "2025-02-13 19:00"),
            generateMeetingSchedule("Maseeh", "2025-02-27 19:00"),
            generateMeetingSchedule("MacGregor", "2025-03-13 19:00"),
            generateMeetingSchedule("Baker", "2025-04-03 19:00"),
            generateMeetingSchedule("Burton-Conner", "2025-04-24 19:00"),
            generateMeetingSchedule(
                "Room 4-163 (Elections!!)",
                "2025-05-01 19:00",
            ),
        ],
        gcalLink:
            "https://calendar.google.com/calendar/u/0?cid=YmQyNmM4MzhlMjExMzhmMDNhNmY2MmRjMDk2NjMxYTQxOGYxMzU4YTlkNGFhYmI3MTA1MjIwODM3NTNjZGIzZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
    },
    {
        year: "Fall 2024",
        list: [
            generateMeetingSchedule("Simmons", "2024-09-12 19:30"),
            generateMeetingSchedule("New House", "2024-09-26 19:30"),
            generateMeetingSchedule("New Vassar", "2024-10-10 19:30"),
            generateMeetingSchedule("Next House", "2024-10-24 19:30"),
            generateMeetingSchedule("Random", "2024-11-07 19:30"),
            generateMeetingSchedule(
                "Chat with Concord Market in 9-255",
                "2024-11-21 19:30",
            ),
            generateMeetingSchedule("McCormick", "2024-12-05 19:30"),
        ],
        // gcalLink:
        //     "https://calendar.google.com/calendar/u/0?cid=NjMxYzZiMjI4Zjg0Y2QzNmVhMjhlYzU4M2JlZmE5OGEwMWRlODIwY2MwMzNjMzI4ZDU5ZDYzYjA1MjM2NjM5NUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
    },
    {
        year: "Spring 2024",
        list: [
            generateMeetingSchedule("Simmons", "2024-02-15 19:00"),
            generateMeetingSchedule(
                "East Campus (Stud Space)",
                "2024-02-29 19:00",
            ),
            generateMeetingSchedule("MacGregor", "2024-03-14 19:00"),
            generateMeetingSchedule("Baker", "2024-04-04 19:00"),
            generateMeetingSchedule("New House", "2024-04-25 19:00"),
            generateMeetingSchedule("1-190", "2024-05-09 19:00"),
        ],
        gcalLink:
            "https://calendar.google.com/calendar/u/0?cid=NjMxYzZiMjI4Zjg0Y2QzNmVhMjhlYzU4M2JlZmE5OGEwMWRlODIwY2MwMzNjMzI4ZDU5ZDYzYjA1MjM2NjM5NUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
    },
    {
        year: "Fall 2023",
        list: [
            generateMeetingSchedule("Burton-Conner", "2023-09-14 19:30"),
            generateMeetingSchedule("Maseeh", "2023-09-28 19:30"),
            generateMeetingSchedule("New Vassar", "2023-10-12 19:30"),
            generateMeetingSchedule("Next", "2023-10-26 19:30"),
            generateMeetingSchedule("McCormick", "2023-11-09 19:30"),
            generateMeetingSchedule("Random", "2023-11-30 19:30"),
        ],
        gcalLink:
            "https://calendar.google.com/calendar/u/0?cid=NjMxYzZiMjI4Zjg0Y2QzNmVhMjhlYzU4M2JlZmE5OGEwMWRlODIwY2MwMzNjMzI4ZDU5ZDYzYjA1MjM2NjM5NUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
    },
    {
        year: "Spring 2023",
        list: [
            generateMeetingSchedule("Baker", "2023-02-16 19:00"),
            generateMeetingSchedule("McCormick", "2023-03-02 19:00"),
            generateMeetingSchedule("Simmons", "2023-03-16 19:00"),
            generateMeetingSchedule("Random", "2023-04-06 19:00"),
            generateMeetingSchedule("MacGregor", "2023-04-27 19:00"),
            generateMeetingSchedule("On Campus (56-114)", "2023-05-11 19:00"),
        ],
    },
    {
        year: "Fall 2022",
        list: [
            generateMeetingSchedule("Burton-Conner", "2022-09-15 19:00"),
            generateMeetingSchedule("Maseeh", "2022-09-29 19:00"),
            generateMeetingSchedule("New House", "2022-10-13 19:00"),
            generateMeetingSchedule("East Campus", "2022-10-27 19:00"),
            generateMeetingSchedule("Next House", "2022-11-10 19:00"),
            generateMeetingSchedule("New Vassar", "2022-12-01 19:00"),
        ],
    },
    {
        year: "Spring 2022",
        list: [
            generateMeetingSchedule("Maseeh", "2022-02-10 18:30"),
            generateMeetingSchedule("Simmons", "2022-02-24 18:30"),
            generateMeetingSchedule("Random", "2022-03-10 18:30"),
            generateMeetingSchedule("MacGregor", "2022-03-31 18:30"),
            generateMeetingSchedule("McCormick", "2022-04-21 18:30"),
            generateMeetingSchedule("UA Senate Chambers", "2022-05-05 18:30"),
        ],
    },
    {
        year: "Fall 2021",
        list: [
            generateMeetingSchedule("East Campus", "2021-09-16 19:00", false),
            generateMeetingSchedule("New House", "2021-09-30 19:00"),
            generateMeetingSchedule("Baker House", "2021-10-14 19:00"),
            generateMeetingSchedule("Next House", "2021-10-28 19:00"),
            generateMeetingSchedule("McCormick Hall", "2021-11-18 19:00"),
            generateMeetingSchedule("New Vassar", "2021-12-02 19:00"),
        ],
    },
    {
        year: "Spring 2021",
        list: [
            generateMeetingSchedule(
                "wherever you want to be",
                "2021-02-25 18:30",
            ),
            generateMeetingSchedule(
                "a socially distanced place (elections)",
                "2021-03-11 18:30",
            ),
            generateMeetingSchedule("Zoom University", "2021-03-25 18:30"),
            generateMeetingSchedule(
                "on top of the dome if you want",
                "2021-04-08 18:30",
            ),
            generateMeetingSchedule(
                "the Stata loading dock",
                "2021-04-22 18:30",
            ),
            generateMeetingSchedule("your bed", "2021-05-06 18:30"),
        ],
    },
    {
        year: "Fall 2020",
        list: [
            {
                name: "September 10th, 2020",
                minutesLink: minutesFolderOld + "2020_9_10.pdf",
                location: "Zoom",
            },
            {
                name: "September 24th, 2020",
                minutesLink: minutesFolderOld + "2020_9_24.pdf",
                location: "Zoom",
            },
        ],
    },
    {
        year: "2017-2020",
        href: "https://drive.google.com/drive/folders/0B08KdCK2pzFSLVlEc0pJM3RucGs?usp=sharing",
        text: "Meeting minutes from 2017 to 2020",
    },
    {
        year: "Fall 2017",
        list: [
            {
                name: "September 14th, 2017",
                location: "New House",
                minutesLink: minutesFolderOld + "2017-09-14.pdf",
            },
            {
                name: "September 28th, 2017",
                location: "Next House",
                minutesLink: minutesFolderOld + "2017-09-28.pdf",
            },
            {
                name: "October 12th, 2017",
                location: "Random Hall",
                minutesLink: minutesFolderOld + "2017-10-12.pdf",
            },
            {
                name: "October 26th, 2017",
                location: "Baker House",
                minutesLink: minutesFolderOld + "2017-10-26.pdf",
            },
            {
                name: "November 9th, 2017",
                location: "Simmons Hall",
                minutesLink: minutesFolderOld + "2017-11-09.pdf",
            },
            {
                name: "November 30th, 2017",
                location: "Burton Conner",
                minutesLink: minutesFolderOld + "2017-11-30.pdf",
            },
            {
                name: "December 14th, 2017",
                location: "East Campus",
                minutesLink: minutesFolderOld + "2017-12-14.pdf",
            },
        ],
    },
    {
        year: "Spring 2017",
        list: [
            {
                name: "February 16th, 2017",
                location: "Baker House",
                minutesLink: minutesFolderOld + "2017-02-16.pdf",
            },
            {
                name: "March 9th, 2017",
                location: "Burton Conner",
                minutesLink: minutesFolderOld + "2017-03-09.pdf",
            },
            {
                name: "March 23rd, 2017",
                location: "East Campus",
                minutesLink: minutesFolderOld + "2017-03-23.pdf",
            },
            {
                name: "April 13th, 2017",
                location: "MacGregor House",
                minutesLink: minutesFolderOld + "2017-04-13.pdf",
            },
            {
                name: "April 27th, 2017",
                location: "Maseeh Hall",
                minutesLink: minutesFolderOld + "2017-04-27.pdf",
            },
            {
                name: "May 11th, 2017",
                location: "McCormick Hall",
                minutesLink: minutesFolderOld + "2017-05-11.pdf",
            },
        ],
    },
    {
        year: "Fall 2016",
        list: [
            {
                name: "September 8th, 2016",
                location: "Maseeh Hall",
                minutesLink: minutesFolderOld + "2016-09-08.pdf",
            },
            {
                name: "September 22nd, 2016",
                location: "McCormick Hall",
                minutesLink: minutesFolderOld + "2016-09-22.pdf",
            },
            {
                name: "September 29th, 2016",
                location: "New House",
                minutesLink: minutesFolderOld + "2016-09-29.pdf",
            },
            {
                name: "October 13th, 2016",
                location: "Next House",
                minutesLink: minutesFolderOld + "2016-10-13.pdf",
            },
            {
                name: "November 3rd, 2016",
                location: "Senior House",
                minutesLink: minutesFolderOld + "2016-11-03.pdf",
            },
            {
                name: "November 10th, 2016",
                location: "Random Hall",
                minutesLink: minutesFolderOld + "2016-11-10.pdf",
            },
            {
                name: "December 1st, 2016",
                location: "Simmons Hall",
                minutesLink: minutesFolderOld + "2016-12-01.pdf",
            },
        ],
    },
    {
        year: "Spring 2016",
        list: [
            {
                name: "February 4th, 2016",
                location: "Random Hall",
                minutesLink: minutesFolderOld + "2016-02-04.pdf",
            },
            {
                name: "February 18th, 2016",
                location: "Senior Haus",
                minutesLink: minutesFolderOld + "2016-02-18.pdf",
            },
            {
                name: "March 3rd, 2016",
                location: "Simmons Hall",
                minutesLink: minutesFolderOld + "2016-03-03.pdf",
            },
            {
                name: "March 17th, 2016",
                location: "Baker House",
                minutesLink: minutesFolderOld + "2016-03-17.pdf",
            },
            {
                name: "March 31st, 2016",
                location: "Burton Conner",
                minutesLink: minutesFolderOld + "2016-03-31.pdf",
            },
            {
                name: "April 14th, 2016",
                location: "East Campus",
                minutesLink: minutesFolderOld + "2016-04-14.pdf",
            },
            {
                name: "May 5th, 2016",
                location: "MacGregor House",
                minutesLink: minutesFolderOld + "2016-05-05.pdf",
            },
        ],
    },
    {
        year: "Fall 2015",
        list: [
            {
                name: "September 10th, 2015",
                location: "Burton-Conner",
                minutesLink: minutesFolderOld + "2015-09-10.pdf",
            },
            {
                name: "October 8th, 2015",
                location: "MacGregor",
                minutesLink: minutesFolderOld + "2015-10-08.pdf",
            },
            {
                name: "October 22nd, 2015",
                location: "McCormick",
                minutesLink: minutesFolderOld + "2015-10-22.pdf",
            },
            {
                name: "November 5th, 2015",
                location: "Maseeh",
                minutesLink: minutesFolderOld + "2015-11-05.pdf",
            },
            {
                name: "November 19th, 2015",
                location: "New House",
                minutesLink: minutesFolderOld + "2015-11-19.pdf",
            },
            {
                name: "December 3rd, 2015",
                location: "Next House",
                minutesLink: minutesFolderOld + "2015-12-03.pdf",
            },
        ],
    },
    {
        year: "Spring 2015",
        list: [
            {
                name: "February 12th, 2015",
                location: "McCormick Hall",
                minutesLink: minutesFolderOld + "2015-02-12.pdf",
            },
            {
                name: "February 26th, 2015",
                location: "New House",
                minutesLink: minutesFolderOld + "2015-02-26.pdf",
            },
            {
                name: "March 12th, 2015",
                location: "Senior Haus",
                minutesLink: minutesFolderOld + "2015-3-12.pdf",
            },
            {
                name: "April 2nd, 2015",
                location: "Random Hall",
                minutesLink: minutesFolderOld + "2015-04-02.pdf",
            },
            {
                name: "April 9th, 2015",
                location: "Next House",
                minutesLink: minutesFolderOld + "2015-04-09.pdf",
            },
            {
                name: "April 30th, 2015",
                location: "Simmons Hall",
                minutesLink: minutesFolderOld + "2015-04-30.pdf",
            },
            {
                name: "May 14th, 2015",
                location: "Baker House",
                minutesLink: minutesFolderOld + "2015-05-14.pdf",
            },
        ],
    },
    {
        year: "Fall 2014",
        list: [
            {
                name: "December 4th, 2014",
                location: "MacGregor House",
                minutesLink: minutesFolderOld + "2014-12-04.pdf",
            },
            {
                name: "November 20th, 2014",
                location: "Burton Conner",
                minutesLink: minutesFolderOld + "2014-11-20.pdf",
            },
            {
                name: "November 6th, 2014",
                location: "East Campus",
                minutesLink: minutesFolderOld + "2014-11-06.pdf",
            },
            {
                name: "October 23rd, 2014",
                location: "Baker House",
                minutesLink: minutesFolderOld + "2014-10-23.pdf",
            },
            {
                name: "October 9th, 2014",
                location: "Senior Haus",
                minutesLink: minutesFolderOld + "2014-10-09.pdf",
            },
            {
                name: "September 25th, 2014",
                location: "Simmons Hall",
                minutesLink: minutesFolderOld + "2014-09-25.pdf",
            },
            {
                name: "September 11th, 2014",
                location: "Random Hall",
                minutesLink: minutesFolderOld + "2014-09-11.pdf",
            },
        ],
    },
    {
        year: "Spring 2014",
        list: [
            {
                name: "May 15th, 2014",
                location: "Next House",
                minutesLink: minutesFolderOld + "2014-05-15.pdf",
            },
            {
                name: "May 1st, 2014",
                location: "New House",
                minutesLink: minutesFolderOld + "2014-05-01.pdf",
            },
            {
                name: "April 17th, 2014",
                location: "McCormick Hall",
                minutesLink: minutesFolderOld + "2014-04-17.pdf",
            },
            {
                name: "April 3rd, 2014",
                location: "MacGregor House",
                minutesLink: minutesFolderOld + "2014-04-03.pdf",
            },
            {
                name: "March 20th, 2014",
                location: "East Campus",
                minutesLink: minutesFolderOld + "2014-03-20.pdf",
            },
            {
                name: "March 13th, 2014",
                location: "Burton-Conner",
                minutesLink: minutesFolderOld + "2014-03-13.pdf",
            },
            {
                name: "February 27th, 2014",
                location: "Senior Haus",
                minutesLink: minutesFolderOld + "2014-02-27.pdf",
            },
            {
                name: "February 13th, 2014",
                location: "Simmons Hall",
                minutesLink: minutesFolderOld + "2014-02-13.pdf",
            },
        ],
    },
    {
        year: "Fall 2013",
        list: [
            {
                name: "December 12th, 2013",
                location: "Baker House",
                minutesLink: minutesFolderOld + "2013-12-12.pdf",
            },
            {
                name: "November 21st, 2013",
                location: "Simmons Hall",
                minutesLink: minutesFolderOld + "2013-11-21.pdf",
            },
            {
                name: "November 7th, 2013",
                location: "Random Hall",
                minutesLink: minutesFolderOld + "2013-11-07.pdf",
            },
            {
                name: "October 24th, 2013",
                location: "Next House",
                minutesLink: minutesFolderOld + "2013-10-24.pdf",
            },
            {
                name: "October 10th, 2013",
                location: "New House",
                minutesLink: minutesFolderOld + "2013-10-10.pdf",
            },
            {
                name: "September 26th, 2013",
                location: "McCormick Hall",
                minutesLink: minutesFolderOld + "2013-09-26.pdf",
            },
            {
                name: "September 12th, 2013",
                location: "MacGregor House",
                minutesLink: minutesFolderOld + "2013-09-12.pdf",
            },
        ],
    },
    {
        year: "Spring 2013",
        list: [
            {
                name: "May 16th, 2013",
                location: "East Campus",
                minutesLink: minutesFolderOld + "2013-05-16.pdf",
            },
            {
                name: "May 2nd, 2013",
                location: "Burton-Conner",
                minutesLink: minutesFolderOld + "2013-05-02.pdf",
            },
            {
                name: "April 18th, 2013",
                location: "Baker",
                minutesLink: minutesFolderOld + "2013-04-18.pdf",
            },
            {
                name: "April 4th, 2013",
                location: "Simmons Hall",
                minutesLink: minutesFolderOld + "2013-04-04.pdf",
            },
            {
                name: "March 14th, 2013",
                location: "Senior Haus",
                minutesLink: minutesFolderOld + "2013-03-14.pdf",
            },
            {
                name: "February 28th, 2013",
                location: "Random Hall",
                minutesLink: minutesFolderOld + "2013-02-28.pdf",
            },
            {
                name: "February 14th, 2013",
                location: "Next House",
                minutesLink: minutesFolderOld + "2013-02-14.pdf",
            },
        ],
    },
    {
        year: "Fall 2012",
        list: [
            {
                name: "December 6th, 2012",
                location: "New House",
                minutesLink: minutesFolderOld + "2012-12-06.pdf",
            },
            {
                name: "November 8th, 2012",
                location: "MacGregor",
                minutesLink: minutesFolderOld + "2012-11-08.pdf",
            },
            {
                name: "October 25th, 2012",
                location: "Maseeh",
                minutesLink: minutesFolderOld + "2012-10-25.pdf",
            },
            {
                name: "October 11th, 2012",
                location: "East Campus",
                minutesLink: minutesFolderOld + "2012-10-11.pdf",
            },
            {
                name: "September 27th, 2012",
                location: "Burton-Conner",
                minutesLink: minutesFolderOld + "2012-09-27.pdf",
            },
            {
                name: "September 13th, 2012",
                location: "Baker House",
                minutesLink: minutesFolderOld + "2012-09-13.pdf",
            },
        ],
    },
    {
        year: "Spring 2012",
        list: [
            {
                name: "February 9th, 2012",
                minutesLink: minutesFolderOld + "2012-2-9.pdf",
            },
            {
                name: "February 23rd, 2012",
                minutesLink: minutesFolderOld + "2012-02-23.pdf",
            },
            {
                name: "March 8th, 2012",
                minutesLink: minutesFolderOld + "2012-03-08.pdf",
            },
            {
                name: "March 22nd, 2012",
                minutesLink: minutesFolderOld + "2012-03-22.pdf",
            },
            {
                name: "April 12th, 2012",
                minutesLink: minutesFolderOld + "2012-04-12.pdf",
            },
            {
                name: "April 26th, 2012",
                minutesLink: minutesFolderOld + "2012-04-26.pdf",
            },
            {
                name: "May 10th, 2012",
                minutesLink: minutesFolderOld + "2012-05-10.pdf",
            },
        ],
    },
    {
        year: "Fall 2011",
        list: [
            {
                name: "September 15th, 2011",
                minutesLink: minutesFolderOld + "2011-09-15.pdf",
            },
            {
                name: "September 29th, 2011",
                minutesLink: minutesFolderOld + "2011-09-29.pdf",
            },
            {
                name: "October 20th, 2011",
                minutesLink: minutesFolderOld + "2011-10-20.pdf",
            },
            {
                name: "November 3rd, 2011",
                minutesLink: minutesFolderOld + "2011-11-03.pdf",
            },
            {
                name: "November 17th, 2011",
                minutesLink: minutesFolderOld + "2011-11-17.pdf",
            },
            {
                name: "December 1st, 2011",
                minutesLink: minutesFolderOld + "2011-12-01.pdf",
            },
        ],
    },
    {
        year: "Spring 2011",
        list: [
            {
                name: "February 3rd, 2011",
                minutesLink: minutesFolderOld + "2011-02-03.pdf",
            },
            {
                name: "February 9th, 2011",
                minutesLink: minutesFolderOld + "2011-02-09.pdf",
            },
            {
                name: "February 17th, 2011",
                minutesLink: minutesFolderOld + "2011-02-17.pdf",
            },
            {
                name: "March 3rd, 2011",
                minutesLink: minutesFolderOld + "2011-03-03.pdf",
            },
            {
                name: "March 17th, 2011",
                minutesLink: minutesFolderOld + "2011-03-17.pdf",
            },
            {
                name: "March 31st, 2011",
                minutesLink: minutesFolderOld + "2011-03-31.pdf",
            },
            {
                name: "April 3rd, 2011",
                minutesLink: minutesFolderOld + "2011-04-03.pdf",
            },
            {
                name: "April 14th, 2011",
                minutesLink: minutesFolderOld + "2011-04-14.pdf",
            },
            {
                name: "April 28th, 2011",
                minutesLink: minutesFolderOld + "2011-04-28.pdf",
            },
            {
                name: "May 12th, 2011",
                minutesLink: minutesFolderOld + "2011-05-12.pdf",
            },
        ],
    },
    {
        year: "Fall 2010",
        list: [
            {
                name: "December 9th, 2010",
                minutesLink: minutesFolderOld + "2010-12-09.pdf",
            },
            {
                name: "November 23rd, 2010",
                minutesLink: minutesFolderOld + "2010-11-23.pdf",
            },
            {
                name: "November 10th, 2010",
                minutesLink: minutesFolderOld + "2010-11-10.pdf",
            },
            {
                name: "October 28th, 2010",
                minutesLink: minutesFolderOld + "2010-10-28.pdf",
            },
            {
                name: "October 14th, 2010",
                minutesLink: minutesFolderOld + "2010-10-14.pdf",
            },
        ],
    },
    {
        year: "Spring 2009",
        list: [
            {
                name: "May 11th, 2009",
                minutesLink: minutesFolderOld + "2009-05-11.txt",
            },
            {
                name: "March 30th, 2009",
                location: "Next House",
                minutesLink: minutesFolderOld + "2009-03-30.txt",
            },
            {
                name: "February 12th, 2009",
                minutesLink: minutesFolderOld + "2009-02-12.txt",
            },
        ],
    },
    {
        year: "Fall 2008",
        list: [
            {
                name: "November 13th, 2008",
                location: "Baker House",
                minutesLink: minutesFolderOld + "2008-11-13.txt",
            },
            {
                name: "October 30th, 2008",
                location: "MacGregor House",
                minutesLink: minutesFolderOld + "2008-10-30.txt",
            },
            {
                name: "October 16th, 2008",
                location: "Baker House",
                minutesLink: minutesFolderOld + "2008-10-16.txt",
            },
            {
                name: "October 2nd, 2008",
                location: "Burton-Conner",
                minutesLink: minutesFolderOld + "2008-10-02.txt",
            },
            {
                name: "August 15th, 2008",
                location: "Next House",
                minutesLink: minutesFolderOld + "2008-08-15.txt",
            },
        ],
    },
    {
        year: "Spring 2008",
        list: [
            {
                name: "February 27th, 2008",
                location: "Burton Conner",
                minutesLink: minutesFolderOld + "2008-02-27.pdf",
            },
            {
                name: "February 13th, 2008",
                location: "East Campus",
                minutesLink: minutesFolderOld + "2008-02-13.pdf",
            },
        ],
    },
    {
        year: "Fall 2007",
        list: [
            {
                name: "December 4th, 2007",
                location: "New House",
                minutesLink: minutesFolderOld + "2007-12-04.pdf",
            },
            {
                name: "November 20th, 2007",
                location: "Baker House",
                minutesLink: minutesFolderOld + "2007-11-20.pdf",
            },
            {
                name: "November 6th, 2007",
                location: "MacGregor Hall",
                minutesLink: minutesFolderOld + "2007-11-06.pdf",
            },
            {
                name: "October 23rd, 2007",
                location: "Simmons Hall",
                minutesLink: minutesFolderOld + "2007-10-23.pdf",
            },
            {
                name: "October 9th, 2007",
                location: "Random Hall",
                minutesLink: minutesFolderOld + "2007-10-09.pdf",
            },
            {
                name: "September 25th, 2007",
                location: "Burton Conner",
                minutesLink: minutesFolderOld + "2007-09-25.pdf",
            },
            {
                name: "September 12th, 2007",
                location: "East Campus",
                minutesLink: minutesFolderOld + "2007-09-12.pdf",
            },
        ],
    },
    {
        year: "Spring 2007",
        list: [
            {
                name: "May 14th, 2007",
                location: "Baker House",
                minutesLink: minutesFolderOld + "2007-05-14.pdf",
            },
            {
                name: "April 30th, 2007",
                location: "East Campus",
                minutesLink: minutesFolderOld + "2007-04-30.pdf",
            },
            {
                name: "April 18th, 2007",
                location: "McCormick Hall",
                minutesLink: minutesFolderOld + "2007-04-18.pdf",
            },
            {
                name: "April 4th, 2007",
                location: "New House",
                minutesLink: minutesFolderOld + "2007-04-04.pdf",
            },
            {
                name: "March 12th, 2007",
                location: "Burton-Conner",
                minutesLink: minutesFolderOld + "2007-03-12.pdf",
            },
            {
                name: "February 26th, 2007",
                location: "Simmons Hall",
                minutesLink: minutesFolderOld + "2007-02-26.pdf",
            },
            {
                name: "February 13th, 2007",
                location: "Random Hall",
                minutesLink: minutesFolderOld + "2007-02-13.pdf",
            },
        ],
    },
    {
        year: "Fall 2006",
        list: [
            {
                name: "December 13th, 2006",
                location: "Simmons Hall",
                minutesLink: minutesFolderOld + "2006-12-13.pdf",
            },
            {
                name: "November 29th, 2006",
                location: "MacGregor House",
                minutesLink: minutesFolderOld + "2006-11-29.pdf",
            },
            {
                name: "November 15th, 2006",
                location: "McCormick Hall",
                minutesLink: minutesFolderOld + "2006-11-15.pdf",
            },
            {
                name: "November 1st, 2006",
                location: "Next House",
                minutesLink: minutesFolderOld + "2006-11-01.pdf",
            },
            {
                name: "October 18th, 2006",
                location: "Burton-Conner",
                minutesLink: minutesFolderOld + "2006-10-18.pdf",
            },
            {
                name: "September 27th, 2006",
                location: "Senior Haus",
                minutesLink: minutesFolderOld + "2006-09-27.pdf",
            },
            {
                name: "September 13th, 2006",
                location: "East Campus",
                minutesLink: minutesFolderOld + "2006-09-13.pdf",
            },
        ],
    },
    {
        year: "Spring 2006",
        list: [
            {
                name: "May 17th, 2006",
                location: "McCormick Hall",
                minutesLink: minutesFolderOld + "2006-05-17.shtml",
            },
            {
                name: "May 3rd, 2006",
                location: "Baker House",
                minutesLink: minutesFolderOld + "2006-05-03.shtml",
            },
            {
                name: "April 18th, 2006",
                location: "Simmons Hall",
                minutesLink: minutesFolderOld + "2006-04-18.shtml",
            },
            {
                name: "April 5th, 2006",
                location: "East Campus",
                minutesLink: minutesFolderOld + "2006-04-05.shtml",
            },
            {
                name: "March 15th, 2006",
                location: "Random Hall",
                minutesLink: minutesFolderOld + "2006-03-15.shtml",
            },
            {
                name: "March 1st, 2006",
                location: "Burton-Conner",
                minutesLink: minutesFolderOld + "2006-03-01.shtml",
            },
            {
                name: "February 13th, 2006",
                location: "New House",
                minutesLink: minutesFolderOld + "2006-02-13.shtml",
            },
        ],
    },
    {
        year: "Fall 2005",
        list: [
            {
                name: "December 12th, 2005",
                location: "Burton-Conner",
                minutesLink: minutesFolderOld + "2005-12-12.shtml",
            },
            {
                name: "November 28th, 2005",
                location: "Pritchett Dining",
                minutesLink: minutesFolderOld + "2005-11-28.shtml",
            },
            {
                name: "November 14th, 2005",
                location: "East Campus",
                minutesLink: minutesFolderOld + "2005-11-14.shtml",
            },
            {
                name: "October 24th, 2005",
                location: "Next House",
                minutesLink: minutesFolderOld + "2005-10-24.shtml",
            },
            {
                name: "October 11th, 2005",
                location: "Random Hall",
                minutesLink: minutesFolderOld + "2005-10-11.shtml",
            },
            {
                name: "September 26th, 2005",
                location: "Simmons Hall",
                minutesLink: minutesFolderOld + "2005-09-26.shtml",
            },
            {
                name: "September 14th, 2005",
                minutesLink: minutesFolderOld + "2005-09-14.shtml",
            },
        ],
    },
    {
        year: "Spring 2005",
        list: [
            {
                name: "May 4th, 2005",
                location: "McCormick Hall",
                minutesLink: minutesFolderOld + "2005-05-04.pdf",
            },
            {
                name: "April 20th, 2005",
                location: "MacGregor House",
                minutesLink: minutesFolderOld + "2005-04-20.pdf",
            },
            {
                name: "April 6th, 2005",
                location: "Senior Haus",
                minutesLink: minutesFolderOld + "2005-04-06.pdf",
            },
            {
                name: "March 9th, 2005",
                location: "Next House",
                minutesLink: minutesFolderOld + "2005-03-09.pdf",
            },
            {
                name: "March 2nd, 2005",
                location: "East Campus",
                minutesLink: minutesFolderOld + "2005-03-02.pdf",
            },
            {
                name: "February 16th, 2005",
                location: "Burton-Conner",
                minutesLink: minutesFolderOld + "2005-02-16.pdf",
            },
            {
                name: "February 3rd, 2005",
                location: "Simmons Hall",
                minutesLink: minutesFolderOld + "2005-02-03.pdf",
            },
        ],
    },
    {
        year: "Fall 2004",
        list: [
            {
                name: "December 2nd, 2004",
                location: "Simmons Hall",
                minutesLink: minutesFolderOld + "2004-12-02.pdf",
            },
            {
                name: "November 18th, 2004",
                location: "Simmons Hall",
                minutesLink: minutesFolderOld + "2004-11-18.pdf",
            },
            {
                name: "November 4th, 2004",
                location: "East Campus",
                minutesLink: minutesFolderOld + "2004-11-04.pdf",
            },
            {
                name: "October 21st, 2004",
                location: "New House",
                minutesLink: minutesFolderOld + "2004-10-21.pdf",
            },
            {
                name: "October 7th, 2004",
                location: "Next House",
                minutesLink: minutesFolderOld + "2004-10-07.pdf",
            },
            {
                name: "September 16th, 2004",
                location: "Simmons Hall",
                minutesLink: minutesFolderOld + "2004-09-16.pdf",
            },
        ],
    },
    {
        year: "Spring 2004",
        list: [
            {
                name: "May 6th, 2004",
                location: "Random Hall",
                minutesLink: minutesFolderOld + "2004-05-06.pdf",
            },
            {
                name: "April 22nd, 2004",
                location: "New House",
                minutesLink: minutesFolderOld + "2004-04-22.shtml",
            },
            {
                name: "April 8th, 2004",
                location: "East Campus",
                minutesLink: minutesFolderOld + "2004-04-08.shtml",
            },
            {
                name: "March 18th, 2004",
                location: "Next House",
                minutesLink: minutesFolderOld + "2004-03-18.shtml",
            },
            {
                name: "March 4th, 2004",
                location: "Baker House",
                minutesLink: minutesFolderOld + "2004-03-04.shtml",
            },
            {
                name: "February 19th, 2004",
                location: "East Campus",
                minutesLink: minutesFolderOld + "2004-02-19.shtml",
            },
            {
                name: "February 5th, 2004",
                location: "MacGregor House",
                minutesLink: minutesFolderOld + "2004-02-05.shtml",
            },
        ],
    },
    {
        year: "Fall 2003",
        list: [
            {
                name: "October 23rd, 2003",
                location: "Random Hall",
                minutesLink: minutesFolderOld + "2003-10-23.shtml",
            },
            {
                name: "November 6th, 2003",
                location: "Simmons Hall",
                minutesLink: minutesFolderOld + "2003-11-06.shtml",
            },
            {
                name: "October 16th, 2003",
                location: "Next House",
                minutesLink: minutesFolderOld + "2003-10-16.shtml",
            },
            {
                name: "September 25th, 2003",
                location: "McCormick Hall",
                minutesLink: minutesFolderOld + "2003-09-25.shtml",
            },
            {
                name: "September 4th, 2003",
                location: "East Campus",
                minutesLink: minutesFolderOld + "2003-09-04.shtml",
            },
        ],
    },
    {
        year: "Spring 2003",
        list: [
            {
                name: "May 1st, 2003",
                location: "East Campus",
                minutesLink: minutesFolderOld + "2003-05-01.shtml",
            },
            {
                name: "March 20th, 2003",
                location: "Random Hall",
                minutesLink: minutesFolderOld + "2003-03-20.shtml",
            },
            {
                name: "February 20th, 2003",
                location: "McCormick Hall",
                minutesLink: minutesFolderOld + "2003-02-20.shtml",
            },
        ],
    },
    {
        year: "Fall 2002",
        list: [
            {
                name: "November 7th, 2002",
                location: "East Campus",
                minutesLink: minutesFolderOld + "2002-11-07.shtml",
            },
            {
                name: "October 17th, 2002",
                location: "McCormick Hall",
                minutesLink: minutesFolderOld + "2002-10-17.shtml",
            },
        ],
    },
    {
        year: "Summer 2002",
        list: [
            {
                name: "July 3rd, 2002",
                location: "Senior Haus",
                minutesLink: minutesFolderOld + "2002-07-03.shtml",
            },
        ],
    },
];

const officers: Term[] = [
    {
        year: "2024-2025",
        list: [
            {
                position: "President",
                name: "Jordan Tierney",
                affiliation: "East Campus",
                year: 2025,
                kerb: "tierneyj",
            },
            {
                position: "Vice President",
                name: "Ananda Santos",
                affiliation: "Simmons",
                year: 2025,
                kerb: "asantosf",
            },
            {
                position: "Treasurer",
                name: "Leo Yao",
                affiliation: "Next House",
                year: 2025,
                kerb: "leoy",
            },
            {
                position: "Secretary",
                name: "Lauren Shrack",
                affiliation: "Random Hall",
                year: 2025,
                kerb: "lshrack",
            },
            {
                position: "REX/CPW Chair",
                name: "Gabriel Gomez",
                affiliation: "MacGregor",
                year: 2027,
                kerb: "gabgomez",
            },
            {
                position: "REX/CPW Chair",
                name: "Anthony Donegan",
                affiliation: "MacGregor",
                year: 2028,
                kerb: "ajzd",
            },
            {
                position: "Housing Chair",
                name: "Diego Temkin",
                affiliation: "Simmons + EC",
                year: 2026,
                kerb: "dtemkin",
            },
            {
                position: "Housing Chair",
                name: "",
                affiliation: "Random + McCormick",
                year: undefined,
                kerb: "fl",
            },
            {
                position: "Judcomm Chair",
                name: "Geoffrey Enwere",
                affiliation: "Next House",
                year: 2026,
                kerb: "genwere",
            },
            {
                position: "Judcomm Chair",
                name: "Tyler Ea",
                affiliation: "MacGregor",
                year: 2025,
                kerb: "tylerea",
            },
            {
                position: "Underclassmen Representative",
                name: "Jamie Lim",
                affiliation: "MacGregor",
                year: 2028,
                kerb: "jamielim",
            },
            {
                position: "Underclassmen Representative",
                name: "Eugenie Cha",
                affiliation: "Simmons",
                year: 2028,
                kerb: "eugeniec",
            },
            {
                position: "Dining Chair",
                name: "Gabriel Rodríguez",
                affiliation: "East Campus",
                year: 2025,
                kerb: "rgabriel",
            },
            {
                position: "Dining Chair",
                name: "Daniel Gonzalez",
                affiliation: "East Campus",
                year: undefined,
                kerb: "gonzalez",
            },
            {
                position: "i3 Chair",
                name: "Jackson Hamilton",
                affiliation: "Simmons",
                year: 2028,
                kerb: "jackham",
            },
            {
                position: "Tech Chair",
                name: "Haylea Brock",
                affiliation: "Burton Conner",
                year: 2027,
                kerb: "hbrock",
            },
        ],
    },
    {
        year: "2023-2024",
        list: [
            {
                position: "President",
                name: "Mitali Chowdhury",
                affiliation: "East Campus + Maseeh",
                year: 2024,
                kerb: "mitalic",
            },
            {
                position: "Vice President",
                name: "Rebecca Lizarde",
                affiliation: "Burton-Conner",
                year: 2024,
                kerb: "rlizarde",
            },
            {
                position: "Treasurer",
                name: "Melissa Du",
                affiliation: "Burton-Conner",
                year: 2025,
                kerb: "mxdu",
            },
            {
                position: "Secretary",
                name: "Sunmee Choi",
                affiliation: "Simmons",
                year: 2024,
                kerb: "sunchoi",
            },
            {
                position: "REX/CPW Chair",
                name: "",
                affiliation: "Random + McCormick",
                year: undefined,
                kerb: "fl",
            },
            {
                position: "REX/CPW Chair",
                name: "Maddy Laws",
                affiliation: "Baker",
                year: 2027,
                kerb: "melaws",
            },
            {
                position: "Housing Chair",
                name: "Sruthi Parthasarathi",
                affiliation: "Next House",
                year: 2024,
                kerb: "spar",
            },
            {
                position: "Housing Chair",
                name: "Jordan Tierney",
                affiliation: "East Campus",
                year: 2025,
                kerb: "tierneyj",
            },
            {
                position: "Judcomm Chair",
                name: "Sara Manos",
                affiliation: "Random",
                year: 2024,
                kerb: "sjmanos",
            },
            {
                position: "Judcomm Chair",
                name: "Mateo Pisinger",
                affiliation: "West Garage",
                year: 2024,
                kerb: "pisinger",
            },
            {
                position: "Underclassmen Representative",
                name: "Hanu Snyder",
                affiliation: "East Campus",
                year: 2026,
                kerb: "haunz",
            },
            {
                position: "Underclassmen Representative",
                name: "Cayetano (Guy) Sanchez IV",
                affiliation: "Baker",
                year: 2027,
                kerb: "cayetano",
            },
            {
                position: "Dining Chair",
                name: "Tyra Espedal",
                affiliation: "East Campus + MacGregor",
                year: 2026,
                kerb: "tyrae",
            },
            {
                position: "Dining Chair",
                name: "Ananda Santos",
                affiliation: "Simmons",
                year: 2025,
                kerb: "asantosf",
            },
            {
                position: "i3 Chair",
                name: "Felicity Zhou",
                affiliation: "Maseeh",
                year: 2027,
                kerb: "zhou_13",
            },
            {
                position: "🌎 Tech Chair",
                name: "Nate Shwatal",
                affiliation: "East Campus + Maseeh",
                year: 2024,
                kerb: "nshwatal",
            },
        ],
    },
    {
        year: "2022-2023",
        list: [
            {
                position: "President",
                name: "Zawad Chowdhury",
                affiliation: "East Campus",
                year: 2023,
                kerb: "zawadx",
            },
            {
                position: "Vice President",
                name: "Alan Zhu",
                affiliation: "Next House",
                year: 2023,
                kerb: "alanyzhu",
            },
            {
                position: "Treasurer",
                name: "Alex Bookbinder",
                affiliation: "Random",
                year: 2023,
                kerb: "a01",
            },
            {
                position: "Secretary",
                name: "Michelle Guo",
                affiliation: "Random",
                year: 2023,
                kerb: "mguo42",
            },
            {
                position: "REX/CPW Chair",
                name: "Diego Temkin",
                affiliation: "East Campus",
                year: 2026,
                kerb: "dtemkin",
            },
            {
                position: "REX/CPW Chair",
                name: "Daniel Gonzalez",
                affiliation: "East Campus",
                year: undefined,
                kerb: "gonzalez",
            },
            {
                position: "Housing Chair",
                name: "Fatima Nasir",
                affiliation: "Next House",
                year: 2025,
                kerb: "fabbasi",
            },
            {
                position: "Housing Chair",
                name: "Arthur Zangi",
                affiliation: "East Campus",
                year: 2023,
                kerb: "szangi",
            },
            {
                position: "Judcomm Chair",
                name: "Sarah Aaronson",
                affiliation: "Burton-Conner",
                year: 2023,
                kerb: "sarahaa",
            },
            {
                position: "Judcomm Chair",
                name: "Jordan Wilke",
                affiliation: "Simmons",
                year: 2023,
                kerb: "wilke18",
            },
            {
                position: "Underclassmen Representative",
                name: "Jordan Tierney",
                affiliation: "East Campus",
                year: 2025,
                kerb: "tierneyj",
            },
            {
                position: "Underclassmen Representative",
                name: "Geoffrey Enwere",
                affiliation: "Next House",
                year: 2026,
                kerb: "genwere",
            },
            {
                position: "Dining Chair",
                name: "Mitali Chowdhury",
                affiliation: "East Campus",
                year: 2024,
                kerb: "mitalic",
            },
            {
                position: "Dining Chair",
                name: "Rebecca Lizarde",
                affiliation: "Burton-Conner",
                year: 2024,
                kerb: "rlizarde",
            },
            {
                position: "i3 Chair",
                name: "Tyra Espedal",
                affiliation: "East Campus",
                year: 2026,
                kerb: "tyrae",
            },
            {
                position: "🌎 Tech Chair",
                name: "Cameron Kleiman",
                affiliation: "Burton-Conner",
                year: 2024,
                kerb: "ckleiman",
            },
        ],
    },
    {
        year: "2021-2022",
        list: [
            {
                position: "President",
                name: "Emily Caragay",
                affiliation: "East Campus",
                year: 2022,
                kerb: "caragay",
            },
            {
                position: "Vice President",
                name: "Shuli Jones",
                affiliation: "East Campus",
                year: 2022,
                kerb: "jonsh",
            },
            {
                position: "Treasurer",
                name: "Mohan Richter-Addo",
                affiliation: "Simmons",
                year: 2023,
                kerb: "richtera",
            },
            {
                position: "Secretary",
                name: "Sunmee Choi",
                affiliation: "Simmons",
                year: 2024,
                kerb: "sunchoi",
            },
            {
                position: "i3/RAC Chair",
                name: "Mateo Pisinger",
                affiliation: "New Vassar",
                year: 2024,
                kerb: "pisinger",
            },
            {
                position: "Housing Chair",
                name: "Zawad Chowdhury",
                affiliation: "East Campus",
                year: 2023,
                kerb: "zawadx",
            },
            {
                position: "Housing Chair",
                name: "Jordan Wilke",
                affiliation: "Simmons",
                year: 2023,
                kerb: "wilke18",
            },
            {
                position: "Judcomm Chair",
                name: "Alan Zhu",
                affiliation: "Next House",
                year: 2023,
                kerb: "alanyzhu",
            },
            {
                position: "Risk Management Chair",
                name: "Denzel Segbefia",
                affiliation: "Burton-Conner",
                year: 2024,
                kerb: "denzel",
            },
            {
                position: "Risk Management Chair",
                name: "Mitali Chowdhury",
                affiliation: "East Campus",
                year: 2024,
                kerb: "mitalic",
            },
            {
                position: "Dining Chair",
                name: "Meghana Vemulapalli",
                affiliation: "Next House",
                year: 2022,
                kerb: "meghanav",
            },
            {
                position: "Dining Chair",
                name: "Ashley Holton",
                affiliation: "MacGregor",
                year: 2022,
                kerb: "aholton",
            },
            {
                position: "REX/CPW Chair",
                name: "Olivia Beniston",
                year: 2025,
                kerb: "olivi327",
                affiliation: "New Vassar",
            },
            {
                position: "REX/CPW Chair",
                name: "Fatima Nasir",
                year: 2025,
                kerb: "fabbasi",
                affiliation: "Next House",
            },
            {
                position: "🌎 Tech Chair",
                name: "Cameron Kleiman",
                affiliation: "Burton-Conner",
                year: 2024,
                kerb: "ckleiman",
            },
        ],
    },
    {
        year: "2020-2021",
        list: [
            {
                position: "President",
                name: "Sarah Edwards",
                affiliation: "New House",
                year: 2021,
                kerb: "edwardss",
            },
            {
                position: "Vice President",
                name: "Shuli Jones",
                affiliation: "East Campus",
                year: 2022,
                kerb: "jonsh",
            },
            {
                position: "Treasurer",
                name: "Faraz Masroor",
                affiliation: "Next House",
                year: 2021,
                kerb: "fmasroor",
            },
            {
                position: "Secretary",
                name: "Anna Bair",
                affiliation: "MacGregor",
                year: 2023,
                kerb: "bairanna",
            },
            {
                position: "i3/RAC Chair",
                name: "Mitali Chowdhury",
                affiliation: "East Campus",
                year: 2024,
                kerb: "mitalic",
            },
            {
                position: "REX Chair",
                name: "Sunmee Choi",
                affiliation: "Next House",
                year: 2024,
                kerb: "sunchoi",
            },
            {
                position: "REX Chair",
                name: "Denzel Segbefia",
                affiliation: "Burton-Conner",
                year: 2024,
                kerb: "denzel",
            },
            {
                position: "Housing Chair",
                name: "Emily Caragay",
                affiliation: "East Campus",
                year: 2022,
                kerb: "caragay",
            },
            {
                position: "Housing Chair",
                name: "Mohamed Mohamed",
                affiliation: "",
                year: 2022,
                kerb: "mohamedm",
            },
            {
                position: "Judcomm Chair",
                name: "Jordan Wilke",
                affiliation: "Simmons",
                year: 2023,
                kerb: "wilke18",
            },
            {
                position: "Risk Management Chair",
                name: "Angela J Su",
                affiliation: "MacGregor",
                year: 2023,
                kerb: "asu",
            },
            {
                position: "Risk Management Chair",
                name: "Shayna Ahteck",
                affiliation: "McCormick",
                year: 2023,
                kerb: "asahteck",
            },
            {
                position: "Dining Chair",
                name: "Duha Syar",
                affiliation: "New House",
                year: 2023,
                kerb: "duhasyar",
            },
            {
                position: "Dining Chair",
                name: "Shaida Nishat",
                affiliation: "Simmons",
                year: 2022,
                kerb: "nishat",
            },
            {
                position: "🌎 Tech Chair",
                name: "Cameron Kleiman",
                affiliation: "Burton-Conner",
                year: 2024,
                kerb: "ckleiman",
            },
        ],
    },
];

export { officers, meetings };
