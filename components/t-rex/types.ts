type TRexAPIResponse = {
    name: string;
    published: string;
    events: TRexEvent[];
    dorms: string[];
    tags: string[];
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
