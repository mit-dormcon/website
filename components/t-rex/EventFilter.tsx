import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";

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
    const [searchValue, setSearchValue] = useState("");
    const allDorms = "All Dorms";
    const [dormFilter, setDormFilter] = useState(allDorms);
    const dormEmoji = "🏠";
    const allEvents = "All Events",
        ongoing = "Now",
        upcoming = "Upcoming",
        ongoingUpcoming = "Now + Upcoming";
    const [timeFilter, setTimeFilter] = useState(ongoingUpcoming);
    const timeEmoji = "⏰";
    const everything = "Everything";
    const [tagFilter, setTagFilter] = useState(everything);
    const tagEmoji = "🏷";
    const [bookmarkFilter, setBookmarkFilter] = useState(false);

    const clearFilters = () => {
        setSearchValue("");
        setDormFilter(allDorms);
        setTimeFilter(allEvents);
        setTagFilter(everything);
        setBookmarkFilter(false);
    };

    useEffect(() => {
        let events: TRexEvent[] = [];
        const now = new Date();
        if (!searchValue) events = props.events;
        else {
            events = props.fuse
                .search(searchValue)
                .map((result) => result.item);
        }
        if (dormFilter !== allDorms)
            events = events.filter((ev) => ev.dorm === dormFilter);
        if (timeFilter === upcoming)
            events = events.filter((ev) => ev.start >= now);
        else if (timeFilter === ongoing)
            events = events.filter((ev) => ev.start < now && ev.end >= now);
        else if (timeFilter === ongoingUpcoming)
            events = events.filter((ev) => ev.end >= now);
        if (tagFilter !== everything)
            events = events.filter((ev) => ev.tags.includes(tagFilter));
        if (bookmarkFilter)
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
    }, [
        searchValue,
        dormFilter,
        timeFilter,
        tagFilter,
        bookmarkFilter,
        props.saved,
    ]);
    return (
        <div>
            <div className="margin-bottom--xs">
                <select
                    onChange={(e) => setDormFilter(e.target.value)}
                    value={dormFilter}
                >
                    <option value={allDorms}>
                        {dormEmoji} {allDorms}
                    </option>
                    {props.dorms.map((dorm, idx) => (
                        <option key={idx} value={dorm}>
                            {dormEmoji} {dorm}
                        </option>
                    ))}
                </select>
                <select
                    onChange={(e) => setTimeFilter(e.target.value)}
                    value={timeFilter}
                >
                    <option value={allEvents}>
                        {timeEmoji} {allEvents}
                    </option>
                    <option value={ongoing}>
                        {timeEmoji} {ongoing}
                    </option>
                    <option value={upcoming}>
                        {timeEmoji} {upcoming}
                    </option>
                    <option value={ongoingUpcoming}>
                        {timeEmoji} {ongoingUpcoming}
                    </option>
                </select>
                <select
                    onChange={(e) => setTagFilter(e.target.value)}
                    value={tagFilter}
                >
                    <option value={everything}>
                        {tagEmoji} {everything}
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
                        checked={bookmarkFilter}
                        onChange={(e) => setBookmarkFilter(e.target.checked)}
                    />
                    <label htmlFor="showBookmarks">⭐️ only</label>
                    &ensp;
                </div>
                <div style={{ display: "inline-block" }}>
                    <button
                        className="button button--sm button--outline button--primary"
                        onClick={clearFilters}
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
                onChange={(e) => setSearchValue(e.target.value)}
                style={{ fontSize: "2rem", width: "100%" }}
                placeholder="🔍 Search"
            />
        </div>
    );
}
