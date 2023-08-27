import { useColorMode } from "@docusaurus/theme-common";
import Fuse from "fuse.js";
import React, { useContext, useEffect } from "react";
import { FilterContext, TimeFilter, unsetFilter } from "./filter";

/**
 * Top-level event filter UI, containing options to filter by a string value,
 * dorms, tags, bookmarks, and time.
 *
 * Handles the actual logic for filtering events, which are filtered and passed
 * back up through the `setEvents` prop.
 */
export function EventFilter(props: {
    events: TRexEvent[];
    /** Fuse.js search object */
    fuse: Fuse<TRexEvent>;
    saved: string[];
    setEvents: (events: TRexEvent[]) => void;
    dorms: string[];
    tags: string[];
    /** Determines whether to show a human-readable time on the event card */
    showRelativeTime: boolean;
    setRelativeTime: (val: boolean) => void;
}) {
    const { filter, setFilter } = useContext(FilterContext);

    const { searchValue, dormFilter, timeFilter, tagFilter, bookmarksOnly } =
        filter;

    const { colorMode } = useColorMode();

    const dormEmoji = "🏠";
    const timeEmoji = "⏰";
    const tagEmoji = "🏷";

    useEffect(() => {
        let events: TRexEvent[] = [];
        const now = new Date();
        if (!searchValue) events = props.events;
        else {
            events = props.fuse
                .search(searchValue)
                .map((result) => result.item);
        }
        if (dormFilter !== unsetFilter.dormFilter)
            events = events.filter((ev) => ev.dorm === dormFilter);
        if (timeFilter === TimeFilter.Upcoming)
            events = events.filter((ev) => ev.start >= now);
        else if (timeFilter === TimeFilter.Ongoing)
            events = events.filter((ev) => ev.start < now && ev.end >= now);
        else if (timeFilter === TimeFilter.OngoingUpcoming)
            events = events.filter((ev) => ev.end >= now);
        if (tagFilter !== unsetFilter.tagFilter)
            events = events.filter((ev) => ev.tags.includes(tagFilter));
        if (bookmarksOnly)
            events = events.filter((ev) => props.saved.includes(ev.name));

        // Don't sort if there's a search query, so the most relevant events appear at the top
        if (!searchValue) {
            // Partition and sort events based on whether they have started.
            // Events that have started => events that end sooner show up first
            // Events that have yet to start => events that start sooner show up first
            const startedEvents = events.filter((ev) => ev.start < now);
            startedEvents.sort((a, b) => a.end.valueOf() - b.end.valueOf());

            const upcomingEvents = events.filter((ev) => ev.start >= now);
            upcomingEvents.sort(
                (a, b) => a.start.valueOf() - b.start.valueOf(),
            );

            events = Array.of(...startedEvents, ...upcomingEvents);
        }
        props.setEvents(events);
    }, [filter, props.saved]);

    return (
        <div
            style={{
                position: "sticky",
                top: "0px",
                padding: "10px",
                // Pulled background color from Docusaurus theme
                // and add transparency so the blur will show but not be completely see through
                // Using less transparency for light theme because it looks better
                backgroundColor:
                    colorMode === "light" ? "#ffffffcc" : "#1b1b1baa",
                zIndex: 10,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
            }}
        >
            <div className="margin-bottom--xs">
                <select
                    onChange={(e) =>
                        setFilter({ ...filter, dormFilter: e.target.value })
                    }
                    value={dormFilter}
                >
                    <option value={unsetFilter.dormFilter}>
                        {dormEmoji} {unsetFilter.dormFilter}
                    </option>
                    {props.dorms.map((dorm, idx) => (
                        <option key={idx} value={dorm}>
                            {dormEmoji} {dorm}
                        </option>
                    ))}
                </select>
                <select
                    onChange={(e) =>
                        setFilter({
                            ...filter,
                            timeFilter: e.target.value as TimeFilter,
                        })
                    }
                    value={timeFilter}
                >
                    <option value={TimeFilter.AllEvents}>
                        {timeEmoji} {TimeFilter.AllEvents}
                    </option>
                    <option value={TimeFilter.Ongoing}>
                        {timeEmoji} {TimeFilter.Ongoing}
                    </option>
                    <option value={TimeFilter.Upcoming}>
                        {timeEmoji} {TimeFilter.Upcoming}
                    </option>
                    <option value={TimeFilter.OngoingUpcoming}>
                        {timeEmoji} {TimeFilter.OngoingUpcoming}
                    </option>
                </select>
                <select
                    onChange={(e) =>
                        setFilter({ ...filter, tagFilter: e.target.value })
                    }
                    value={tagFilter}
                >
                    <option value={unsetFilter.tagFilter}>
                        {tagEmoji} {unsetFilter.tagFilter}
                    </option>
                    {props.tags.map((tag, idx) => (
                        <option key={idx} value={tag}>
                            {tagEmoji} {tag}
                        </option>
                    ))}
                </select>
                <div style={{ display: "inline-block" }}>
                    <input
                        type="checkbox"
                        id="showBookmarks"
                        checked={bookmarksOnly}
                        onChange={(e) =>
                            setFilter({
                                ...filter,
                                bookmarksOnly: e.target.checked,
                            })
                        }
                    />
                    <label htmlFor="showBookmarks">⭐️ only</label>
                    &ensp;
                </div>
                <div style={{ display: "inline-block" }}>
                    <button
                        className="button button--sm button--outline button--primary"
                        onClick={() => setFilter(unsetFilter)}
                    >
                        ❌ Clear
                    </button>
                    <button
                        className="button button--sm button--outline button--primary"
                        onClick={() =>
                            props.setRelativeTime(!props.showRelativeTime)
                        }
                    >
                        {props.showRelativeTime ? "⏰" : "⏱"}&ensp; Switch to{" "}
                        {props.showRelativeTime ? "exact" : "relative"} times
                    </button>
                </div>
            </div>
            <input
                type="text"
                value={searchValue}
                onChange={(e) =>
                    setFilter({ ...filter, searchValue: e.target.value })
                }
                style={{ fontSize: "2rem", width: "100%" }}
                placeholder="🔍 Search"
            />
        </div>
    );
}
