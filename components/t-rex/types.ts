type TRexAPIResponse = {
    /** The title of the current experience, such as "REX 2023" */
    name: string;
    /** ISO Date string of when the current JSON of events was published */
    published: string;
    events: TRexEvent[];
    dorms: string[];
    tags: string[];
    /** Maps event properties to background colors */
    colors: TRexAPIColors;
    start: string;
    end: string;
};

type TRexAPIColors = {
    dorms: Map<string, string>;
    tags: Map<string, string>;
};

type TRexEvent = {
    name: string;
    dorm: string;
    location: string;
    start: Date;
    end: Date;
    description: string;
    tags: string[];
};
