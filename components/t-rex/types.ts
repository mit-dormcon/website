if (!("Temporal" in globalThis)) {
    await import("temporal-polyfill/global");
}

/** Raw API output */
export interface TRexAPIResponse {
    name: string; // The title of the current experience, such as "REX 2023"
    published: string; // ISO Date string of when the current JSON of events was published
    events: TRexRawEvent[];
    dorms: string[];
    groups: Record<string, string[]>; // Living groups or subcommunities
    tags: string[];
    colors: TRexRawColors; // Convert to Map<string, string>!
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
    group: string[]; // The subcommunities or living groups hosting this event, if any
    id: string; // Unique identifier for the event
}

/** Maps event properties to colors */
export interface TRexRawColors {
    dorms: Record<string, string>;
    tags: Record<string, string>;
    groups: Record<string, Record<string, string>>;
}

export interface TRexProcessedData {
    name: string;
    published: Temporal.Instant;
    events: TRexProcessedEvent[];
    dorms: string[];
    groups: Record<string, string[]>;
    tags: string[];
    colors: TRexProcessedAPIColors;
    start: Temporal.PlainDate;
    end: Temporal.PlainDate;
}

export interface TRexProcessedEvent {
    name: string;
    dorm: string[];
    location: string;
    start: Temporal.Instant;
    end: Temporal.Instant;
    tags: string[];
    description: string;
    group: string[]; // The subcommunities or living groups hosting this event, if any
    id: string; // Unique identifier for the event
}

export interface TRexProcessedAPIColors {
    dorms: Map<string, string>;
    tags: Map<string, string>;
    groups: Map<string, Map<string, string>>;
}
