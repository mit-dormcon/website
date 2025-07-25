import { useCallback, useContext, useEffect, useState } from "react";
import Fuse from "fuse.js";
import { debounce } from "lodash";
import clsx from "clsx";

import {
    FilterContext,
    FilterSettings,
    TimeFilter,
    timeFilterMap,
    unsetFilter,
} from "./filter";
import { TRexProcessedEvent } from "./types";
import { useRexData } from "./helpers";

import styles from "./rex.module.css";
import { Temporal } from "@js-temporal/polyfill";
import { useLocation } from "@docusaurus/router";

/**
 * Top-level event filter UI, containing options to filter by a string value,
 * dorms, tags, bookmarks, and time.
 *
 * Handles the actual logic for filtering events, which are filtered and passed
 * back up through the `setEvents` prop.
 */
export function EventFilter(props: {
    events?: TRexProcessedEvent[];
    /** Fuse.js search object */
    fuse: Fuse<TRexProcessedEvent>;
    saved: string[];
    setEvents: (events: TRexProcessedEvent[]) => void;
    /** Determines whether to show a human-readable time on the event card */
    showRelativeTime: boolean;
    setRelativeTime: (val: boolean) => void;
}) {
    const { filter, setFilter } = useContext(FilterContext);
    const {
        searchValue,
        dormFilter,
        groupFilter,
        timeFilter,
        tagFilter,
        bookmarksOnly,
    } = filter;

    const { data } = useRexData();
    const [previousSearchValue, setPreviousSearchValue] = useState<string>("");

    const dormEmoji = "🏠";
    const groupEmoji = "👥";
    const timeEmoji = "⏰";
    const tagEmoji = "🏷️";

    const search = useCallback(
        (filterProp: FilterSettings) => {
            const {
                searchValue,
                dormFilter,
                groupFilter,
                timeFilter,
                tagFilter,
                bookmarksOnly,
            } = filterProp;

            let events: TRexProcessedEvent[] = [];
            const now = Temporal.Now.instant();
            if (!searchValue) events = data?.events ?? [];
            else {
                events = props.fuse
                    .search(searchValue)
                    .map((result) => result.item);
            }
            if (dormFilter !== unsetFilter.dormFilter)
                events = events.filter((ev) =>
                    ev.dorm.some((dorm) => dorm === dormFilter),
                );
            if (groupFilter && groupFilter !== unsetFilter.groupFilter)
                events = events.filter((ev) =>
                    ev.group?.some((group) => group === groupFilter),
                );
            if (timeFilter === TimeFilter.Upcoming)
                events = events.filter(
                    (ev) => Temporal.Instant.compare(ev.start, now) >= 0,
                );
            else if (timeFilter === TimeFilter.Ongoing)
                events = events.filter(
                    (ev) =>
                        Temporal.Instant.compare(ev.start, now) < 0 &&
                        Temporal.Instant.compare(ev.end, now) >= 0,
                );
            else if (timeFilter === TimeFilter.OngoingUpcoming)
                events = events.filter(
                    (ev) => Temporal.Instant.compare(ev.end, now) >= 0,
                );
            if (tagFilter !== unsetFilter.tagFilter)
                events = events.filter((ev) =>
                    ev.tags.includes(tagFilter ?? ""),
                );
            if (bookmarksOnly) {
                console.log(props.saved);
                events = events.filter((ev) => props.saved.includes(ev.id));
            }

            // Don't sort if there's a search query, so the most relevant events appear at the top
            if (!searchValue) {
                // Partition and sort events based on whether they have started.
                // Events that have started => events that end sooner show up first
                // Events that have yet to start => events that start sooner show up first
                const startedEvents = events.filter(
                    (ev) => Temporal.Instant.compare(ev.start, now) < 0,
                );
                startedEvents.sort((a, b) =>
                    Temporal.Instant.compare(a.end, b.end),
                );

                const upcomingEvents = events.filter(
                    (ev) => Temporal.Instant.compare(ev.start, now) >= 0,
                );
                upcomingEvents.sort((a, b) =>
                    Temporal.Instant.compare(a.start, b.start),
                );

                events = Array.of(...startedEvents, ...upcomingEvents);
            }

            setPreviousSearchValue(searchValue ?? "");

            props.setEvents(events);
        },
        [props.fuse, props.events, props.saved],
    );

    const searchForEventsDebounced = useCallback(debounce(search, 1000), [
        props.saved,
    ]);

    // runs search when filter changes
    useEffect(() => {
        if (searchValue == previousSearchValue) {
            search(filter);
        } else {
            searchForEventsDebounced(filter);
        }
    }, [filter]);

    return (
        <div
            style={{
                position: "sticky",
                top: "0px",
                padding: "10px",
                marginLeft: "calc(-1 * var(--ifm-spacing-horizontal))",
                marginRight: "calc(-1 * var(--ifm-spacing-horizontal))",
                // Pulled background color from Docusaurus theme
                // and add transparency so the blur will show but not be completely see through
                // Using less transparency for light theme because it looks better
                backgroundColor:
                    "rgb(from var(--ifm-background-color) r g b / 0.667)",
                zIndex: 10,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
            }}
        >
            <div className="margin-bottom--xs">
                <select
                    onChange={(e) => {
                        setFilter({
                            ...filter,
                            dormFilter: e.target.value,
                            groupFilter: unsetFilter.groupFilter,
                        });
                    }}
                    value={dormFilter ?? ""}
                    className={clsx("margin-right--sm", styles.inputSmall)}
                    aria-label="Dorm"
                    name="dorm"
                >
                    <option value={unsetFilter.dormFilter ?? ""}>
                        {dormEmoji} {unsetFilter.dormFilter}
                    </option>
                    {data?.dorms.map((dorm, idx) => (
                        <option key={idx} value={dorm}>
                            {dormEmoji} {dorm}
                        </option>
                    ))}
                </select>
                {data?.groups[dormFilter ?? ""] && (
                    <select
                        onChange={(e) => {
                            setFilter({
                                ...filter,
                                groupFilter: e.target.value,
                            });
                        }}
                        value={groupFilter ?? ""}
                        className={clsx("margin-right--sm", styles.inputSmall)}
                        aria-label="Group"
                        name="group"
                    >
                        <option value={unsetFilter.groupFilter ?? ""}>
                            {groupEmoji} {unsetFilter.groupFilter}
                        </option>
                        {data.groups[dormFilter ?? ""].map((group, idx) => (
                            <option key={idx} value={group}>
                                {groupEmoji} {group}
                            </option>
                        ))}
                    </select>
                )}
                <select
                    onChange={(e) => {
                        setFilter({
                            ...filter,
                            timeFilter: e.target.value as TimeFilter,
                        });
                    }}
                    value={timeFilter ?? ""}
                    className={clsx("margin-right--sm", styles.inputSmall)}
                    aria-label="Time"
                    name="time"
                >
                    {Object.keys(TimeFilter).map((key) => (
                        <option
                            key={key}
                            value={TimeFilter[key as keyof typeof TimeFilter]}
                        >
                            {timeEmoji}{" "}
                            {TimeFilter[key as keyof typeof TimeFilter]}
                        </option>
                    ))}
                </select>
                <select
                    onChange={(e) => {
                        setFilter({ ...filter, tagFilter: e.target.value });
                    }}
                    value={tagFilter ?? ""}
                    className={clsx("margin-right--sm", styles.inputSmall)}
                    aria-label="Tags"
                    name="tags"
                >
                    <option value={unsetFilter.tagFilter ?? ""}>
                        {tagEmoji} {unsetFilter.tagFilter}
                    </option>
                    {data?.tags.map((tag, idx) => (
                        <option key={idx} value={tag}>
                            {tagEmoji} {tag}
                        </option>
                    ))}
                </select>
                <div
                    style={{ display: "inline-block" }}
                    className="margin-right--sm"
                >
                    <label>
                        <input
                            type="checkbox"
                            checked={bookmarksOnly ?? false}
                            onChange={(e) => {
                                setFilter({
                                    ...filter,
                                    bookmarksOnly: e.target.checked,
                                });
                            }}
                        />
                        ⭐️ only
                    </label>
                    &ensp;
                </div>
                <div style={{ display: "inline-block" }}>
                    <button
                        className="button button--sm button--outline button--primary margin-right--sm"
                        onClick={() => {
                            setPreviousSearchValue(""); // makes search instant
                            setFilter(unsetFilter);
                        }}
                    >
                        ❌ Clear
                    </button>
                    <button
                        className="button button--sm button--outline button--primary margin-right--sm"
                        onClick={() => {
                            props.setRelativeTime(!props.showRelativeTime);
                        }}
                    >
                        {props.showRelativeTime ? "⏰" : "⏱"}&ensp; Switch to{" "}
                        {props.showRelativeTime ? "exact" : "relative"} times
                    </button>
                    <ShareButton {...filter} />
                </div>
            </div>
            <input
                type="search"
                name="search"
                className={styles.input}
                value={searchValue ?? ""}
                onChange={(e) => {
                    setFilter({ ...filter, searchValue: e.target.value });
                }}
                style={{ fontSize: "2rem", width: "100%" }}
                placeholder="🔍 Search"
            />
        </div>
    );
}

function ShareButton(props: FilterSettings) {
    const [text, setText] = useState("🔗 Copy Filters");

    const handleShare = () => {
        const url = new URL(window.location.origin + window.location.pathname);
        url.searchParams.delete;
        if (props.searchValue)
            url.searchParams.set("search", props.searchValue);
        if (props.dormFilter && props.dormFilter !== unsetFilter.dormFilter)
            url.searchParams.set("dorm", props.dormFilter);
        if (props.groupFilter && props.groupFilter !== unsetFilter.groupFilter)
            url.searchParams.set("group", props.groupFilter);
        if (props.timeFilter && props.timeFilter !== unsetFilter.timeFilter)
            url.searchParams.set("time_filter", props.timeFilter);
        if (props.tagFilter && props.tagFilter !== unsetFilter.tagFilter)
            url.searchParams.set(
                "tag",
                Object.entries(timeFilterMap).find(
                    ([_, value]) => value === props.tagFilter,
                )?.[0] ?? "",
            );
        url.searchParams.set(
            "bookmarks_only",
            props.bookmarksOnly ? "true" : "false",
        );
        navigator.clipboard.writeText(url.toString()).then(() => {
            setText("✅ Filters Copied!");
            setTimeout(() => setText("🔗 Copy Filters"), 2000);
        });
    };

    return (
        <button
            className="button button--sm button--outline button--primary"
            onClick={handleShare}
        >
            {text}
        </button>
    );
}
