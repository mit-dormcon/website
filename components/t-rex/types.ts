type TRexAPIResponse = {
    name: string,
    published: string,
    events: TRexEvent[],
    dorms: string[],
    tags: string[],
    colors: {
        dorms: Map<string, string>,
        tags: Map<string, string>
    },
    start: string,
    end: string
}

type TRexEvent = {
    name: string,
    dorm: string,
    location: string,
    start: Date,
    end: Date,
    description: string,
    tags: string[],
}