import { type CSSProperties, useContext, useEffect, useState } from "react";
import Fuse from "fuse.js";
import clsx from "clsx";
import { useLocation } from "@docusaurus/router";

import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";

import styles from "./rex.module.css";
import {
    FilterContext,
    type FilterSettings,
    TimeFilter,
    unsetFilter,
} from "./filter";
import { BookmarkDropdownItem } from "./Bookmarks";
import type { TRexProcessedEvent } from "./types";
import { EventFilter } from "./EventFilter";
import { useRexData, map_or_object } from "./helpers";

import { Temporal } from "@js-temporal/polyfill";
// Date.prototype.toTemporalInstant = toTemporalInstant;

declare const gtag: Gtag.Gtag;

export function TRexHeadline(props: { isTimeline?: boolean }) {
    const { data } = useRexData();

    const headlineStyle: CSSProperties = {
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        display: "inline-block",
        marginBottom: 0,
        color: "transparent",
    };

    return (
        <>
            <Heading
                as="h1"
                style={headlineStyle}
                className={styles.gradientBackground}
                key={0}
            >
                {data?.name} {props.isTimeline ? "Timeline" : "Events"}
            </Heading>
            <Link
                to={props.isTimeline ? "/rex/events" : "/rex/timeline"}
                className={clsx(
                    "button button--primary button--lg",
                    styles.heroButton,
                    styles.gradientBackgroundLoop,
                )}
                style={{
                    transition: "0.5s",
                    border: "none",
                    ...(props.isTimeline
                        ? {
                              verticalAlign: "initial",
                              marginLeft: "2em",
                          }
                        : {
                              marginTop: "1.5em",
                              float: "right",
                          }),
                }}
            >
                View as {props.isTimeline ? "List" : "Timeline"}
            </Link>
        </>
    );
}

/**
 * Top-level T-REX component containing all the event filtering and display
 * logic
 */
export function TRexApp() {
    const { search } = useLocation();
    const { data } = useRexData();
    const [events, setEvents] = useState<TRexProcessedEvent[] | undefined>(
        data?.events,
    );
    const [savedEvents, setSavedEvents] = useState<string[]>([]);
    const [showRelativeTime, setShowRelativeTime] = useState(true);
    const [filter, setFilter] = useState<FilterSettings>({
        ...unsetFilter,
        timeFilter: TimeFilter.OngoingUpcoming,
    });

    const fuse = new Fuse(data?.events ?? [], {
        keys: [
            { name: "name", weight: 2 },
            "dorm",
            "group",
            "location",
            "tags",
            { name: "description", weight: 0.5 },
        ],
    });

    useEffect(() => {
        const savedStorage = localStorage.getItem("savedEvents");
        if (savedStorage) setSavedEvents(JSON.parse(savedStorage) as string[]);
    }, []);

    useEffect(() => {
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    }, [savedEvents]);

    // Allow for filtering based on URL Search Params
    // This feature is documented on the toolbox page.
    useEffect(() => {
        const params = new URLSearchParams(search);
        const paramsFilter: Partial<FilterSettings> = {};

        if (data?.tags.includes(params.get("tag") ?? ""))
            paramsFilter.tagFilter = params.get("tag") ?? undefined;
        if (data?.dorms.includes(params.get("dorm") ?? "")) {
            paramsFilter.dormFilter = params.get("dorm") ?? undefined;
            if (
                data?.groups[params.get("dorm") ?? ""]?.includes(
                    params.get("group") ?? "",
                )
            )
                paramsFilter.groupFilter = params.get("group") ?? undefined;
        }
        if (["true", "false"].includes(params.get("bookmarks_only") ?? ""))
            paramsFilter.bookmarksOnly =
                params.get("bookmarks_only") === "true";
        if (params.get("q"))
            paramsFilter.searchValue = params.get("q") ?? undefined;

        const timeFilterMap: Record<string, TimeFilter> = {
            all: TimeFilter.AllEvents,
            ongoing: TimeFilter.Ongoing,
            not_ended: TimeFilter.OngoingUpcoming,
            upcoming: TimeFilter.Upcoming,
        };

        const time_filter_param = params.get("time_filter") ?? undefined;
        if (
            time_filter_param &&
            time_filter_param in Object.keys(timeFilterMap)
        )
            paramsFilter.timeFilter = timeFilterMap[time_filter_param];

        setFilter({ ...filter, ...paramsFilter });

        if (["true", "false"].includes(params.get("relative_time") ?? ""))
            setShowRelativeTime(params.get("relative_time") === "true");
    }, [search]);

    return (
        <FilterContext.Provider value={{ filter, setFilter }}>
            <div className="margin-vert--md">
                <p className="margin-bottom--sm">
                    <Link
                        className="button button--primary button--sm margin-right--sm"
                        to="/rex/toolbox"
                    >
                        🧰 Toolbox
                    </Link>
                    <Link
                        className="button button--primary button--sm margin-right--sm"
                        to="/rex/help"
                    >
                        ❓ Help
                    </Link>
                    <b>{events?.length}</b>/{data?.events.length} events,
                    published {data?.published.toLocaleString()}
                </p>
                <EventFilter
                    fuse={fuse}
                    setEvents={setEvents}
                    events={events}
                    saved={savedEvents}
                    showRelativeTime={showRelativeTime}
                    setRelativeTime={setShowRelativeTime}
                />
                <EventLayout
                    events={events}
                    saved={savedEvents}
                    setSaved={setSavedEvents}
                    showRelativeTime={showRelativeTime}
                    setEvents={setEvents}
                    isBookmarkFilterOn={filter.bookmarksOnly}
                />
            </div>
        </FilterContext.Provider>
    );
}

interface EventLayoutProps {
    events?: TRexProcessedEvent[];
    saved: string[];
    setSaved: (saved: string[]) => void;
    showRelativeTime: boolean;
    isBookmarkFilterOn?: boolean;
    setEvents: (events: TRexProcessedEvent[]) => void;
}

/**
 * Lays out EventCards in a responsive-friendly way, or shows a message when
 * there are no events.
 */
function EventLayout(props: EventLayoutProps) {
    const unsaveFunc = (n: string) => {
        const events_remaining = props.saved.filter((name) => name !== n);
        props.setSaved(events_remaining);
        if (props.isBookmarkFilterOn && props.events) {
            props.setEvents(
                props.events.filter((ev) => events_remaining.includes(ev.id)),
            );
        }
    };
    const saveFunc = (n: string) => {
        if (!props.saved.includes(n)) props.setSaved([...props.saved, n]);
    };

    return (
        <div className="container margin-top--sm">
            {props.events?.length ? (
                <div className="row">
                    {props.events.map((e, idx) => (
                        <div key={idx} className="col col--4">
                            <EventCard
                                event={e}
                                isSaved={props.saved.includes(e.id)}
                                unsave={unsaveFunc}
                                save={saveFunc}
                                showRelativeTime={props.showRelativeTime}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert--secondary" role="alert">
                    💀 <b>No events match this filter.</b> Try adjusting the
                    filters above to see more events.
                </div>
            )}
        </div>
    );
}

interface EventCardProps {
    event: TRexProcessedEvent;
    isSaved: boolean;
    unsave: (name: string) => void;
    save: (name: string) => void;
    showRelativeTime: boolean;
}

/**
 * Card component displaying all information about an event in a compact way
 */
function EventCard(props: EventCardProps) {
    const [dateStrings, setDateStrings] = useState<DateDisplayInfo>({
        duration: "",
        timeContext: "",
        timeContextExact: "",
    });

    const { data } = useRexData();

    const { filter, setFilter } = useContext(FilterContext);

    const cardStyle: CSSProperties = {};
    if (props.event.tags.includes("signature")) {
        const signature_color = map_or_object(data?.colors.tags, "signature");

        cardStyle.border = `2px solid ${signature_color ?? ""}`;
        cardStyle.boxShadow = `0px 0px 6px 1px ${signature_color ?? ""}`;
    }

    useEffect(() => {
        setDateStrings(eventDateDisplay(props.event.start, props.event.end));
        const intervalId = setInterval(() => {
            setDateStrings(
                eventDateDisplay(props.event.start, props.event.end),
            );
        }, 60 * 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, [props]);

    return (
        <div className="card margin-vert--sm shadow--md" style={cardStyle}>
            <div
                className="card__header"
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <div className="padding-right--sm">
                    <span
                        style={{
                            fontFamily: "var(--ifm-heading-font-family)",
                            fontWeight: "var(--ifm-heading-font-weight)",
                            fontSize: "var(--ifm-h4-font-size)",
                            lineHeight: "var(--ifm-heading-line-height)",
                        }}
                        className="margin-vert--none margin-right--sm"
                    >
                        {props.isSaved && "⭐️ "}
                        {props.event.name}
                    </span>
                    <div>
                        {props.event.tags.map((tag, idx) => (
                            <ColoredBadge
                                key={idx}
                                className="badge badge--secondary margin-right--sm"
                                color={map_or_object(data?.colors.tags, tag)}
                                onClick={() => {
                                    setFilter({ ...filter, tagFilter: tag });
                                }}
                            >
                                {tag}
                            </ColoredBadge>
                        ))}
                    </div>
                </div>
                <div className="dropdown dropdown--right dropdown--hoverable">
                    <button className="button button--primary button--outline button--sm">
                        ▼
                    </button>
                    <ul className="dropdown__menu">
                        <GCalButton event={props.event} />
                        <BookmarkDropdownItem
                            id={props.event.id}
                            save={props.save}
                            unsave={props.unsave}
                            isSaved={props.isSaved}
                        />
                    </ul>
                </div>
            </div>
            <div className="card__body">
                <ExpandableText
                    text={props.event.description}
                    className="margin-bottom--sm"
                />
                <DateDisplay
                    dateStrings={dateStrings}
                    showRelativeTime={props.showRelativeTime}
                />
            </div>
            <div
                className="card__footer"
                style={{ display: "inline-flex", flexWrap: "wrap" }}
            >
                {props.event.dorm.map((dorm) => (
                    <div key={dorm}>
                        <ColoredBadge
                            className="badge margin-right--sm"
                            color={map_or_object(data?.colors.dorms, dorm)}
                            onClick={() => {
                                setFilter({
                                    ...filter,
                                    dormFilter: dorm,
                                    groupFilter: undefined,
                                });
                            }}
                        >
                            {dorm}
                        </ColoredBadge>
                    </div>
                ))}
                {props.event.group?.map((group) => (
                    <div key={group}>
                        <ColoredBadge
                            className="badge margin-right--sm"
                            onClick={() => {
                                setFilter({
                                    ...filter,
                                    dormFilter: props.event.dorm.find((d) =>
                                        data?.groups[d]?.includes(group),
                                    ),
                                    groupFilter: group,
                                });
                            }}
                            color={
                                // look for group color first
                                map_or_object(
                                    data?.colors.groups,
                                    props.event.dorm.find((d) =>
                                        data?.groups[d]?.includes(group),
                                    ) ?? "",
                                )?.get(group) ??
                                // then look for dorm color
                                map_or_object(
                                    data?.colors.dorms,
                                    props.event.dorm.find((d) =>
                                        data?.groups[d]?.includes(group),
                                    ) ?? "",
                                ) ??
                                // if no group or dorm color, use default
                                ""
                            }
                            outline={true}
                        >
                            {group}
                        </ColoredBadge>
                    </div>
                ))}
                <div
                    style={{ color: "var(--ifm-color-emphasis-700)" }}
                    className="margin-right--sm margin-left--sm"
                >
                    🕒 {dateStrings.duration}
                </div>
                <div>
                    📍{" "}
                    <Link
                        to={`https://whereis.mit.edu/?q=${encodeURIComponent(
                            props.event.location,
                        )}`}
                    >
                        {props.event.location}
                    </Link>
                </div>
            </div>
        </div>
    );
}

/**
 * Handles displaying the proper date from `dateStrings` based on the
 * `showRelativeTime` prop
 */
function DateDisplay(props: {
    dateStrings: DateDisplayInfo;
    showRelativeTime: boolean;
}) {
    const { showRelativeTime } = props;
    return (
        <p>
            {showRelativeTime ? "⏱" : "⏰"}
            &ensp;
            <span style={{ fontStyle: "italic" }}>
                {showRelativeTime
                    ? props.dateStrings.timeContext
                    : props.dateStrings.timeContextExact}
            </span>
        </p>
    );
}

/**
 * A badge component with an optional background color
 *
 * Automatically adjusts text color based on the background color to create
 * the highest contrast
 */
function ColoredBadge(props: {
    /** Badge background color */
    color?: string;
    className: string;
    onClick?: () => void;
    children: React.ReactNode;
    outline?: boolean;
}) {
    let textColor = "";

    if (props.outline) {
        textColor = "var(--ifm-font-color-base)";
    } else if (props.color) {
        // https://stackoverflow.com/questions/21290669/auto-contrast-font-color-to-background
        textColor = `hwb(from oklch(from ${props.color} l 0 0) h calc(((b - 50) * 999)) calc(((w - 50) * 999)))`;
    }

    return (
        <div
            className={props.className}
            style={
                {
                    "--ifm-badge-background-color": props.outline
                        ? "transparent"
                        : props.color,
                    "--ifm-badge-border-color": props.color,
                    "--ifm-badge-color": textColor,
                    color: props.color && "var(--ifm-badge-color)",
                    backgroundColor:
                        props.color && "var(--ifm-badge-background-color)",
                    borderColor: props.color && "var(--ifm-badge-border-color)",
                    // Set cursor to pointer only when tag is clickable
                    cursor: props.onClick && "pointer",
                } as React.CSSProperties & Record<string, string>
            }
            onClick={props.onClick}
            onKeyDown={({ key }) => {
                if (key === "Enter" && props.onClick) {
                    props.onClick();
                }
            }}
            role="button"
            tabIndex={0}
        >
            {props.children}
        </div>
    );
}

/**
 * Truncates a long passage of text after a certain amount and displays a link
 * to expand the view to show more.
 *
 * Splits text on the first space before the truncation point.
 */
function ExpandableText(props: {
    text: string;
    /** The number of characters to truncate at */
    expandAmount?: number;
    className: string;
}) {
    const [expanded, setExpanded] = useState(false);
    let truncated = props.text;
    const expandAmount = props.expandAmount ?? 140;
    let truncatePoint = 0;
    if (props.text.length > expandAmount) {
        truncatePoint = props.text.lastIndexOf(" ", 140);
        truncated = props.text.substring(0, truncatePoint);
    }
    return (
        <p className={props.className} style={{ whiteSpace: "pre-wrap" }}>
            {truncated}
            {props.text.length > expandAmount && (
                <span>
                    {expanded ? props.text.substring(truncatePoint) : "…"}{" "}
                    <Link
                        onClick={(e) => {
                            e.preventDefault();
                            setExpanded(!expanded);
                        }}
                        to="#"
                        style={{ fontStyle: "italic" }}
                    >
                        {expanded ? "show less" : "show more"}
                    </Link>
                </span>
            )}
        </p>
    );
}

/**
 * Contains all strings necessary to display datetime strings on the EventCard
 */
interface DateDisplayInfo {
    duration: string;
    /** A human-readable relative time representation of the event's start/end */
    timeContext: string;
    /** An exact time representation of the event's start/end */
    timeContextExact: string;
}

/**
 * Displays a "relevant" time string to the user for a given event.
 *
 * If an event **has not** started yet, then the time the event starts will be
 * returned in a readable string.
 *
 * If the event **has** started, then the time the event ends will be returned,
 * with the proper grammar if the event has yet to end or has already ended.
 *
 * @param start event start
 * @param end event end
 * @returns the right strings for displaying event start or end on the EventCard
 */
function eventDateDisplay(
    start: Temporal.Instant,
    end: Temporal.Instant,
): DateDisplayInfo {
    const duration = start
        .until(end)
        .round({ largestUnit: "hour", smallestUnit: "minute" })
        .toLocaleString("en-US", { style: "narrow" });
    let timeUntil: Temporal.Instant;
    const now = Temporal.Now.instant();

    let timeContextBuilder: (time: string) => string;
    let timeContextExactBuilder: (time: string) => string;

    if (Temporal.Instant.compare(now, start) < 0) {
        timeContextBuilder = (time) => `Starts in ${time}`;
        timeContextExactBuilder = (time) => `Starts at ${time}`;
        timeUntil = start;
    } else if (Temporal.Instant.compare(now, end) < 0) {
        timeContextBuilder = (time) => `Ends in ${time}`;
        timeContextExactBuilder = (time) => `Ends at ${time}`;
        timeUntil = end;
    } else {
        timeContextBuilder = (time) => `Ended ${time} ago`;
        timeContextExactBuilder = (time) => `Ended at ${time}`;
        timeUntil = end;
    }

    const timeContext = timeContextBuilder(
        now
            .until(timeUntil)
            .abs()
            .round({ largestUnit: "day", smallestUnit: "minute" })
            .toLocaleString("en-US", { style: "long" }),
    );
    const timeContextExact = timeContextExactBuilder(
        timeUntil.toLocaleString(),
    );

    return {
        duration,
        timeContext,
        timeContextExact,
    };
}

/**
 * A dropdown link for adding an event to a Google Calendar
 */
function GCalButton(props: { event: TRexProcessedEvent }) {
    function logAnalytics() {
        if (typeof gtag !== "undefined") {
            gtag("event", "calendar", { event_label: props.event.name });
        }
    }
    const padNumber = (num: number) => num.toString().padStart(2, "0");
    const formatGCalDate = (paramDate: Temporal.Instant) => {
        const date = paramDate.toZonedDateTimeISO("UTC");
        return (
            `${date.year.toString()}${padNumber(date.month)}` +
            `${padNumber(date.day)}T${padNumber(
                date.hour,
            )}${padNumber(date.minute)}` +
            `${padNumber(date.second)}Z`
        );
    };
    // This URL syntax was sourced from https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs/blob/main/services/google.md
    const buttonLink =
        `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${props.event.dorm.join(", ")}: ${props.event.name}` +
        `&dates=${formatGCalDate(props.event.start)}/${formatGCalDate(
            props.event.end,
        )}&ctz=America/New_York&details=${props.event.description}` +
        `&location=${props.event.location}`;
    return (
        <Link
            className="dropdown__link"
            to={encodeURI(buttonLink)}
            onClick={logAnalytics}
        >
            🗓 Add to Calendar
        </Link>
    );
}

/**
 * A big fancy button that used to draw users to the REX events page
 */
export function TRexEntryButton() {
    return (
        <div className="margin-bottom--md" style={{ textAlign: "center" }}>
            <Link
                to="/rex/events"
                className={clsx(
                    "button button--primary button--lg",
                    styles.heroButton,
                    styles.gradientBackgroundLoop,
                )}
                style={{
                    transition: "0.5s",
                    border: "none",
                }}
            >
                Check out our REX Events!
            </Link>
        </div>
    );
}
