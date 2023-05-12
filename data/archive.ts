import { MeetingSchedule, Term } from "./types";

const minutesFolder = "https://web-cert.mit.edu/dormcon/cert_minutes/";

const meetings: MeetingSchedule[] = [
    {
        year: "Spring 2021",
        list: [
            {
                name: "Thursday, February 25th at 6:30pm",
                location: "wherever you want to be",
                minutes: "/pdf/minutes/2021_2_25.pdf",
            },
            {
                name: "Thursday, March 11th (elections) at 6:30pm",
                location: "a socially distanced place",
                minutes:
                    "/pdf/minutes/03.11.2021 DormCon Updates + Candidate Info.pdf",
            },
            {
                name: "Thursday, March 25th at 6:30pm",
                location: "Zoom University",
                minutes: "/pdf/minutes/DormCon Updates 03.24.2021.pdf",
            },
            {
                name: "Thursday, April 8th at 6:30pm",
                location: "on top of the dome if you want",
                minutes: "/pdf/minutes/DormCon Updates 4_8_2021.pdf",
            },
            {
                name: "Thursday, April 22nd at 6:30pm",
                location: "the Stata loading dock",
                minutes: "/pdf/minutes/DormCon Updates 4.15.2021.pdf",
            },
            {
                name: "Thursday, May 6th at 6:30pm",
                location: "your bed",
                minutes: "/pdf/minutes/DormCon Exec Updates 5.6.2021.pdf",
            },
        ],
    },
    {
        year: "Fall 2021",
        list: [
            {
                name: "Thursday, September 16, 2021 at 7:00pm",
                location: "East Campus",
            },
            {
                name: "Thursday, September 30, 2021 at 7:00pm",
                location: "New House",
                minutes: "/pdf/minutes/fa21/Dormcon GBM Minutes 9_30.pdf",
            },
            {
                name: "Thursday, October 14, 2021 at 7:00pm",
                location: "Baker House",
                minutes:
                    "/pdf/minutes/fa21/Dormcon General Body Meeting - October 14, 2021.pdf",
            },
            {
                name: "Thursday, October 28, 2021 at 7:00pm",
                location: "Next House",
                minutes: "/pdf/minutes/fa21/Dormcon GBM Minutes 10_28.pdf",
            },
            {
                name: "Thursday, November 18, 2021 at 7:00pm",
                location: "McCormick Hall",
                minutes: "/pdf/minutes/fa21/Dormcon GBM Minutes 11_18.pdf",
            },
            {
                name: "Thursday, December 2, 2021 at 7:00pm",
                location: "New Vassar",
                minutes: "/pdf/minutes/fa21/Dormcon GBM Minutes 12_2.pdf",
            },
        ],
    },
    {
        year: "Spring 2022",
        list: [
            {
                name: "Thursday, February 10, 2022 at 6:30pm",
                location: "Maseeh",
                minutesLink:
                    "https://web.mit.edu/dormcon/cert_minutes/2022-02-10.pdf",
            },
            {
                name: "Thursday, February 24, 2022 at 6:30pm",
                location: "Simmons",
                minutesLink:
                    "https://web.mit.edu/dormcon/cert_minutes/2022-02-24.pdf",
            },
            {
                name: "Thursday, March 10, 2022 at 6:30pm",
                location: "Random",
                minutesLink:
                    "https://web.mit.edu/dormcon/cert_minutes/2022-03-10.pdf",
            },
            {
                name: "Thursday, March 31, 2022 at 6:30pm",
                location: "MacGregor",
                minutesLink:
                    "https://web.mit.edu/dormcon/cert_minutes/2022-03-31.pdf",
            },
            {
                name: "Thursday, April 21, 2022 at 6:30pm",
                location: "McCormick",
                minutesLink:
                    "https://web.mit.edu/dormcon/cert_minutes/2022-04-21.pdf",
            },
            {
                name: "Thursday, May 5, 2022 at 6:30pm",
                location: "UA Senate Chambers",
                minutesLink:
                    "https://web.mit.edu/dormcon/cert_minutes/2022-05-05.pdf",
            },
        ],
    },
    {
        year: "Fall 2022",
        list: [
            {
                name: "Thursday, September 15th, 2022 at 7pm",
                location: "Burton-Conner",
                minutesLink:
                    "https://web.mit.edu/dormcon/cert_minutes/2022-09-15.pdf",
            },
            {
                name: "Thursday, September 29th, 2022 at 7pm",
                location: "Maseeh",
                minutesLink:
                    "https://web.mit.edu/dormcon/cert_minutes/2022-09-29.pdf",
            },
            {
                name: "Thursday, October 13th, 2022 at 7pm",
                location: "New House",
                minutesLink:
                    "https://web.mit.edu/dormcon/cert_minutes/2022-10-13.pdf",
            },
            {
                name: "Thursday, October 27th, 2022 at 7pm",
                location: "East Campus",
                minutesLink:
                    "https://web.mit.edu/dormcon/cert_minutes/2022-10-27.pdf",
            },
            {
                name: "Thursday, November 10th, 2022 at 7pm",
                location: "Next House",
                minutesLink:
                    "https://web.mit.edu/dormcon/cert_minutes/2022-11-10.pdf",
            },
            {
                name: "Thursday, December 1st, 2022 at 7pm",
                location: "New Vassar",
                minutesLink:
                    "https://web.mit.edu/dormcon/cert_minutes/2022-12-01.pdf",
            },
        ],
    },
    {
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
    },
];

const officers: Term[] = [
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
    {
        year: "2021-2022",
        list: [
            {
                position: "President",
                name: "Emily Caragay",
                affiliation: "East Campus",
                year: 2022,
                kerb: "dormcon-president",
            },
            {
                position: "Vice President",
                name: "Shuli Jones",
                affiliation: "East Campus",
                year: 2022,
                kerb: "dormcon-vp",
            },
            {
                position: "Treasurer",
                name: "Mohan Richter-Addo",
                affiliation: "Simmons",
                year: 2023,
                kerb: "dormcon-treasurer",
            },
            {
                position: "Secretary",
                name: "Sunmee Choi",
                affiliation: "Simmons",
                year: 2024,
                kerb: "dormcon-secretary",
            },
            {
                position: "i3/RAC Chair",
                name: "Mitali Chowdhury",
                affiliation: "East Campus",
                year: 2024,
                kerb: "dormcon-i3-rac-chair",
            },
            {
                position: "Housing Chair",
                name: "Zawad Chowdhury",
                affiliation: "East Campus",
                year: 2023,
                kerb: "dormcon-housing-chair",
            },
            {
                position: "Housing Chair",
                name: "Jordan Wilke",
                affiliation: "Simmons",
                year: 2023,
                kerb: "dormcon-housing-chair",
            },
            {
                position: "Judcomm Chair",
                name: "Alan Zhu",
                affiliation: "Next House",
                year: 2023,
                kerb: "dormcon-judcomm-chair",
            },
            {
                position: "Risk Management Chair",
                name: "Denzel Segbefia",
                affiliation: "Burton-Conner",
                year: 2024,
                kerb: "dormcon-risk-manager",
            },
            {
                position: "Risk Management Chair",
                name: "Mitali Chowdhury",
                affiliation: "East Campus",
                year: 2024,
                kerb: "dormcon-risk-manager",
            },
            {
                position: "Dining Chair",
                name: "Meghana Vemulapalli",
                affiliation: "Next House",
                year: 2022,
                kerb: "dormcon-dining-chair",
            },
            {
                position: "Dining Chair",
                name: "Ashley Holton",
                affiliation: "MacGregor",
                year: 2022,
                kerb: "dormcon-dining-chair",
            },
            {
                position: "REX/CPW Chair",
                name: "Olivia Beniston",
                year: 2025,
                kerb: "dormcon-cpw-chairs",
                affiliation: "New Vassar",
            },
            {
                position: "REX/CPW Chair",
                name: "Fatima Nasir",
                year: 2025,
                kerb: "dormcon-cpw-chairs",
                affiliation: "Next House",
            },
            {
                position: "🌎 Tech Chair",
                name: "Cameron Kleiman",
                affiliation: "Burton-Conner",
                year: 2024,
                kerb: "dormcon-tech-chair",
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
                kerb: "dormcon-president",
            },
            {
                position: "Vice President",
                name: "Alan Zhu",
                affiliation: "Next House",
                year: 2023,
                kerb: "dormcon-vp",
            },
            {
                position: "Treasurer",
                name: "Alex Bookbinder",
                affiliation: "Random",
                year: 2023,
                kerb: "dormcon-treasurer",
            },
            {
                position: "Secretary",
                name: "Michelle Guo",
                affiliation: "Random",
                year: 2023,
                kerb: "dormcon-secretary",
            },
            {
                position: "REX/CPW Chair",
                name: "Diego Temkin",
                affiliation: "East Campus",
                year: 2026,
                kerb: "dormcon-cpw-chairs",
            },
            {
                position: "REX/CPW Chair",
                name: "Daniel Gonzalez",
                affiliation: "East Campus",
                year: 2025,
                kerb: "dormcon-cpw-chairs",
            },
            {
                position: "Housing Chair",
                name: "Fatima Nasir",
                affiliation: "Next House",
                year: 2025,
                kerb: "dormcon-housing-chair",
            },
            {
                position: "Housing Chair",
                name: "Arthur Zangi",
                affiliation: "East Campus",
                year: 2023,
                kerb: "dormcon-housing-chair",
            },
            {
                position: "Judcomm Chair",
                name: "Sarah Aaronson",
                affiliation: "Burton-Conner",
                year: 2023,
                kerb: "dormcon-judcomm-chair",
            },
            {
                position: "Judcomm Chair",
                name: "Jordan Wilke",
                affiliation: "Simmons",
                year: 2023,
                kerb: "dormcon-judcomm-chair",
            },
            {
                position: "Underclassmen Representative",
                name: "Jordan Tierney",
                affiliation: "East Campus",
                year: 2025,
                kerb: "dormcon-uc-rep",
            },
            {
                position: "Underclassmen Representative",
                name: "Geoffrey Enwere",
                affiliation: "Next House",
                year: 2026,
                kerb: "dormcon-uc-rep",
            },
            {
                position: "Dining Chair",
                name: "Mitali Chowdhury",
                affiliation: "East Campus",
                year: 2024,
                kerb: "dormcon-dining-chair",
            },
            {
                position: "Dining Chair",
                name: "Rebecca Lizarde",
                affiliation: "Burton-Conner",
                year: 2024,
                kerb: "dormcon-dining-chair",
            },
            {
                position: "i3 Chair",
                name: "Tyra Espedal",
                affiliation: "East Campus",
                year: 2026,
                kerb: "dormcon-i3-rac-chair",
            },
            {
                position: "🌎 Tech Chair",
                name: "Cameron Kleiman",
                affiliation: "Burton-Conner",
                year: 2024,
                kerb: "dormcon-tech-chair",
            },
        ],
    },
];

export { officers, meetings };
