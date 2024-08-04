/** Raw API output */
export type TRexAPIResponse = {
    name: string; // The title of the current experience, such as "REX 2023"
    published: string; // ISO Date string of when the current JSON of events was published
    events: TRexRawEvent[];
    dorms: string[];
    tags: string[];

    colors: {
        dorms: Record<string, string>;
        tags: Record<string, string>;
    }; // Convert to Map<string, string>!
    start: string; // Convert to ISO Date string!
    end: string; // Convert to ISO Date string!
};

/** Event details */
export type TRexRawEvent = {
    name: string;
    dorm: string[];
    location: string;
    start: string; // Convert to ISO Date string!
    end: string; // Convert to ISO Date string!
    tags: string[];
    description: string;
    group: string | null; // The subcommunity or living group hosting this event, if any
};

/** Maps event properties to colors */
export type TRexRawColors = {
    dorms: Record<string, string>;
    tags: Record<string, string>;
};

export type TRexProcessedData = {
    name: string;
    published: Date;
    events: TRexProcessedEvent[];
    dorms: string[];
    tags: string[];
    colors: TRexProcessedAPIColors;
    start: Date;
    end: Date;
};

export type TRexProcessedEvent = {
    name: string;
    dorm: string[];
    location: string;
    start: Date;
    end: Date;
    tags: string[];
    description: string;
    group: string | null;
};

export type TRexProcessedAPIColors = {
    dorms: Map<string, string>;
    tags: Map<string, string>;
};
