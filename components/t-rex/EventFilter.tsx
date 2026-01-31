import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Fuse from "fuse.js";
import { debounce, isEqual } from "lodash";
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

if (!("Temporal" in globalThis)) {
    await import("temporal-polyfill/global");
}

/**
 * Top-level event filter UI, containing options to filter by a string value,
 * dorms, tags, bookmarks, and time.
 *
 * Handles the actual logic for filtering events, which are filtered and passed
 * back up through the `setEvents` prop.
 */
export function EventFilter(props: {
    /** Fuse.js search object */
    saved: string[];
    setEvents: (events: TRexProcessedEvent[]) => void;
    /** Determines whether to show a human-readable time on the event card */
    showRelativeTime: boolean;
    setRelativeTime: (val: boolean) => void;
}) {
    const { saved, setEvents, showRelativeTime, setRelativeTime } = props;
    const { filter, setFilter } = useContext(FilterContext);

    const { data } = useRexData();
    const [previousSearchValue, setPreviousSearchValue] = useState<string>("");

    const fuse = useRef<Fuse<TRexProcessedEvent>>(undefined);

    useEffect(() => {
        if (!data?.events) return;

        fuse.current = new Fuse(data.events, {
            keys: [
                { name: "name", weight: 2 },
                "dorm",
                "group",
                "location",
                "tags",
                { name: "description", weight: 0.5 },
            ],
        });
    }, [fuse, data?.events]);

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

            let events: TRexProcessedEvent[] =
                searchValue && fuse.current
                    ? fuse.current
                          .search(searchValue)
                          .map((result) => result.item)
                    : (data?.events ?? []);
            const now = Temporal.Now.instant();

            events = events.filter((ev) => {
                if (dormFilter !== unsetFilter.dormFilter)
                    if (!ev.dorm.some((dorm) => dorm === dormFilter))
                        return false;

                if (groupFilter && groupFilter !== unsetFilter.groupFilter)
                    if (!ev.group?.some((group) => group === groupFilter))
                        return false;

                if (timeFilter === TimeFilter.Upcoming) {
                    if (!(Temporal.Instant.compare(ev.start, now) >= 0))
                        return false;
                } else if (timeFilter === TimeFilter.Ongoing) {
                    if (
                        !(
                            Temporal.Instant.compare(ev.start, now) < 0 &&
                            Temporal.Instant.compare(ev.end, now) >= 0
                        )
                    )
                        return false;
                } else if (timeFilter === TimeFilter.OngoingUpcoming) {
                    if (!(Temporal.Instant.compare(ev.end, now) >= 0))
                        return false;
                }

                if (tagFilter !== unsetFilter.tagFilter)
                    if (!ev.tags.includes(tagFilter ?? "")) return false;

                if (bookmarksOnly) if (!saved.includes(ev.id)) return false;

                return true;
            });

            // Don't sort if there's a search query, so the most relevant events appear at the top
            if (!searchValue) {
                // Partition and sort events based on whether they have started.
                // Events that have started => events that end sooner show up first
                // Events that have yet to start => events that start sooner show up first
                const startedEvents = events
                    .filter((ev) => Temporal.Instant.compare(ev.start, now) < 0)
                    .sort((a, b) => Temporal.Instant.compare(a.end, b.end));

                const upcomingEvents = events
                    .filter(
                        (ev) => Temporal.Instant.compare(ev.start, now) >= 0,
                    )
                    .sort((a, b) => Temporal.Instant.compare(a.start, b.start));

                events = [...startedEvents, ...upcomingEvents];
            }

            setPreviousSearchValue(searchValue ?? "");
            setEvents(events);
        },
        [fuse, data?.events, setEvents, saved],
    );

    const searchForEventsDebounced = useCallback(
        (filter: FilterSettings) => debounce(search, 500)(filter),
        [search],
    );

    // runs search when filter changes
    useEffect(() => {
        if (filter.searchValue == previousSearchValue || !filter.searchValue) {
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
                    onChange={(e) =>
                        setFilter((f) => ({
                            ...f,
                            dormFilter: e.target.value,
                            groupFilter: unsetFilter.groupFilter,
                        }))
                    }
                    value={filter.dormFilter ?? ""}
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
                {data?.groups[filter.dormFilter ?? ""] && (
                    <select
                        onChange={(e) =>
                            setFilter((f) => ({
                                ...f,
                                groupFilter: e.target.value,
                            }))
                        }
                        value={filter.groupFilter ?? ""}
                        className={clsx("margin-right--sm", styles.inputSmall)}
                        aria-label="Group"
                        name="group"
                    >
                        <option value={unsetFilter.groupFilter ?? ""}>
                            {groupEmoji} {unsetFilter.groupFilter}
                        </option>
                        {data.groups[filter.dormFilter ?? ""].map(
                            (group, idx) => (
                                <option key={idx} value={group}>
                                    {groupEmoji} {group}
                                </option>
                            ),
                        )}
                    </select>
                )}
                <select
                    onChange={(e) =>
                        setFilter((f) => ({
                            ...f,
                            timeFilter: e.target.value as TimeFilter,
                        }))
                    }
                    value={filter.timeFilter ?? ""}
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
                    onChange={(e) =>
                        setFilter((f) => ({ ...f, tagFilter: e.target.value }))
                    }
                    value={filter.tagFilter ?? ""}
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
                            checked={filter.bookmarksOnly ?? false}
                            onChange={(e) =>
                                setFilter((f) => ({
                                    ...f,
                                    bookmarksOnly: e.target.checked,
                                }))
                            }
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
                            setRelativeTime(!showRelativeTime);
                        }}
                    >
                        {showRelativeTime ? "⏰" : "⏱"}&ensp; Switch to{" "}
                        {showRelativeTime ? "exact" : "relative"} times
                    </button>
                    {!isEqual(filter, {
                        ...unsetFilter,
                        timeFilter: TimeFilter.OngoingUpcoming,
                    }) && (
                        // Only show share button if the filter is not default
                        <ShareButton {...filter} />
                    )}
                </div>
            </div>
            <input
                type="search"
                name="search"
                className={styles.input}
                value={filter.searchValue ?? ""}
                onChange={(e) =>
                    setFilter((f) => ({ ...f, searchValue: e.target.value }))
                }
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
        if (props.searchValue)
            url.searchParams.set("search", props.searchValue);
        if (props.dormFilter && props.dormFilter !== unsetFilter.dormFilter)
            url.searchParams.set("dorm", props.dormFilter);
        if (props.groupFilter && props.groupFilter !== unsetFilter.groupFilter)
            url.searchParams.set("group", props.groupFilter);
        if (props.timeFilter && props.timeFilter !== TimeFilter.OngoingUpcoming)
            url.searchParams.set("time_filter", props.timeFilter);
        if (props.tagFilter && props.tagFilter !== unsetFilter.tagFilter)
            url.searchParams.set(
                "tag",
                Object.entries(timeFilterMap).find(
                    ([_, value]) => value === props.tagFilter,
                )?.[0] ?? "",
            );
        if (
            props.bookmarksOnly &&
            props.bookmarksOnly !== unsetFilter.bookmarksOnly
        )
            url.searchParams.set(
                "bookmarks_only",
                props.bookmarksOnly ? "true" : "false",
            );
        navigator.clipboard
            .writeText(url.toString())
            .then(() => {
                setText("✅ Filters Copied!");
                setTimeout(() => setText("🔗 Copy Filters"), 2000);
            })
            .catch((err) => {
                console.error("Failed to copy filters: ", err);
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
