export interface Meeting {
    name: string;
    location: string;
    /** An external link to the pdf of minutes, perhaps on Athena */
    minutesLink?: string;
}

export interface MeetingSchedule {
    year: string;
    list: Meeting[];
    /** Link to add the meeting schedule to your Google Calendar */
    gcalLink?: string;
}

export interface Term {
    year: string;
    /** A list of DormCon officers.
     * The position field can be repeated for multiple officers holding the same position. */
    list: Officer[];
}

export interface Officer {
    position: string;
    name: string;
    /** The dorm the DormCon officer belongs to */
    affiliation: string;
    /** The class year of the DormCon officer, as a calendar year */
    year?: number;
    kerb: string;
}

export interface DormConMember {
    dorm: string;
    /** The name(s) of the dorm's president(s) */
    president: string;
    /** A list with the mailing list of the dorm's president without @mit.edu */
    kerbs: string[];
    /** A link to the dorm's website */
    url: string;
}
