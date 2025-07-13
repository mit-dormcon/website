/** Raw API output */
export interface TRexAPIResponse {
    name: string; // The title of the current experience, such as "REX 2023"
    published: string; // ISO Date string of when the current JSON of events was published
    events: TRexRawEvent[];
    dorms: string[];
    groups: Record<string, string[]>; // Living groups or subcommunities
    tags: string[];
    colors: {
        dorms: Record<string, string>;
        tags: Record<string, string>;
    }; // Convert to Map<string, string>!
    start: string; // Convert to ISO Date string!
    end: string; // Convert to ISO Date string!
}

/** Event details */
export interface TRexRawEvent {
    name: string;
    dorm: string[];
    location: string;
    start: string; // Convert to ISO Date string!
    end: string; // Convert to ISO Date string!
    tags: string[];
    description: string;
    group?: string; // The subcommunity or living group hosting this event, if any
}

/** Maps event properties to colors */
export interface TRexRawColors {
    dorms: Record<string, string>;
    tags: Record<string, string>;
}

export interface TRexProcessedData {
    name: string;
    published: Date;
    events: TRexProcessedEvent[];
    dorms: string[];
    groups: Record<string, string[]>;
    tags: string[];
    colors: TRexProcessedAPIColors;
    start: Date;
    end: Date;
}

export interface TRexProcessedEvent {
    name: string;
    dorm: string[];
    location: string;
    start: Date;
    end: Date;
    tags: string[];
    description: string;
    group?: string;
}

export interface TRexProcessedAPIColors {
    dorms: Map<string, string>;
    tags: Map<string, string>;
}
