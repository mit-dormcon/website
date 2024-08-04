import { createContext } from "react";

const allDorms = "All Dorms";

export enum TimeFilter {
    AllEvents = "All Events",
    Ongoing = "Now",
    Upcoming = "Upcoming",
    OngoingUpcoming = "Now + Upcoming",
}

const everything = "Everything";

/**
 * Filter options for the T-REX app
 */
export type FilterSettings = {
    dormFilter?: string;
    timeFilter?: TimeFilter;
    tagFilter?: string;
    bookmarksOnly?: boolean;
    searchValue?: string;
};

/**
 * Unset settings for the Event Filter.
 * Use this object to reference unset options for the filter.
 */
export const unsetFilter: FilterSettings = {
    dormFilter: allDorms,
    timeFilter: TimeFilter.AllEvents,
    tagFilter: everything,
    bookmarksOnly: false,
    searchValue: "",
};

export const FilterContext = createContext<{
    filter: FilterSettings;
    setFilter: (f: FilterSettings) => void;
}>({} as { filter: FilterSettings; setFilter: (f: FilterSettings) => void });
