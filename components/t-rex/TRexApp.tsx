import { CSSProperties, useContext, useEffect, useState } from "react";
import { EventFilter } from "./EventFilter";
import Link from "@docusaurus/Link";
import { BookmarkDropdownItem } from "./Bookmarks";
import Fuse from "fuse.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import clsx from "clsx";
import {
    FilterContext,
    FilterSettings,
    TimeFilter,
    unsetFilter,
} from "./filter";
import { useColorMode } from "@docusaurus/theme-common";
import styles from "../../src/pages/styles.module.css";
import { useLocation } from "@docusaurus/router";
import type {
    TRexAPIResponse,
    TRexRawEvent,
    TRexProcessedEvent,
    TRexProcessedData,
} from "./types";
import Heading from "@theme/Heading";
import useSWR from "swr";

declare const gtag: Gtag.Gtag;

dayjs.extend(relativeTime);
dayjs.extend(duration);

const api_url = "https://rex.mit.edu/api.json";

export const useRexData = () => {
    const swr = useSWR<TRexProcessedData>(api_url, async (url: string) => {
        const res = await fetch(url);
        const json = (await res.json()) as TRexAPIResponse;
        // return json;

        return {
            ...json,
            published: new Date(json.published),
            events: json.events.map((ev: TRexRawEvent) => {
                const newEvent: TRexProcessedEvent = {
                    ...ev,
                    start: new Date(ev.start),
                    end: new Date(ev.end),
                };
                return newEvent;
            }),
            colors: {
                dorms: new Map<string, string>(
                    Object.entries(json.colors.dorms),
                ),
                tags: new Map<string, string>(Object.entries(json.colors.tags)),
            },
            start: new Date(json.start),
            end: new Date(json.end),
        };
    });

    return swr;
};

export function TRexHeadline(props: { isTimeline?: boolean }) {
    const { data, isLoading } = useRexData();
    const { colorMode } = useColorMode();

    const gradient = colorMode === "light" ? lightGradient : darkGradient;

    const headlineStyle: CSSProperties = {
        backgroundImage: `linear-gradient(45deg, ${gradient.join(", ")})`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        display: "inline-block",
        marginBottom: 0,
        color: "transparent",
    };

    return (
        !isLoading && (
            <>
                <Heading as="h1" style={headlineStyle} key={0}>
                    {data?.name} {props.isTimeline ? "Timeline" : "Events"}
                </Heading>
                <Link
                    to={props.isTimeline ? "/rex/events" : "/rex/timeline"}
                    className={clsx(
                        "button button--primary button--lg",
                        styles.heroButton,
                    )}
                    style={{
                        backgroundImage: `linear-gradient(45deg, ${[
                            ...gradient,
                            gradient[0],
                        ].join(",")})`,
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
        )
    );
}

/**
 * Top-level T-REX component containing all the event filtering and display
 * logic
 */
export function TRexApp() {
    const { search } = useLocation();
    const { data, isLoading } = useRexData();
    const [events, setEvents] = useState<TRexProcessedEvent[] | undefined>(
        isLoading ? undefined : data?.events,
    );
    const [savedEvents, setSavedEvents] = useState<string[]>([]);
    const [showRelativeTime, setShowRelativeTime] = useState(true);
    const [filter, setFilter] = useState<FilterSettings>({
        ...unsetFilter,
        timeFilter: TimeFilter.OngoingUpcoming,
    });

    const fuse = new Fuse(isLoading ? [] : (data?.events ?? []), {
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
        if (isLoading) return;
        const savedStorage = localStorage.getItem("savedEvents");
        if (savedStorage) setSavedEvents(JSON.parse(savedStorage) as string[]);
    }, [isLoading]);

    useEffect(() => {
        if (isLoading) return;
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    }, [savedEvents, isLoading]);

    // Allow for filtering based on URL Search Params
    // This feature is documented on the toolbox page.
    useEffect(() => {
        const params = new URLSearchParams(search);
        const paramsFilter: Partial<FilterSettings> = {};

        if (isLoading) return;

        if (data?.tags.includes(params.get("tag") ?? ""))
            paramsFilter.tagFilter = params.get("tag") ?? undefined;
        if (data?.dorms.includes(params.get("dorm") ?? ""))
            paramsFilter.dormFilter = params.get("dorm") ?? undefined;
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
    }, [search, isLoading]);

    // if (error) {
    //     return (
    //         <div>
    //             <p>There was an error loading the REX data.</p>
    //             <p>
    //                 <b>Stuck on this page?</b> Make sure you&#x27;re connected
    //                 to a network and have JavaScript enabled.
    //             </p>
    //         </div>
    //     );
    // }

    if (isLoading)
        return (
            <div>
                <p>Loading...</p>
                <p>
                    <b>Stuck on this page?</b> Make sure you&#x27;re connected
                    to a network and have JavaScript enabled.
                </p>
            </div>
        );

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
                    published {new Date(data?.published ?? "").toLocaleString()}
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

// Helper function to get a value from a Map or Object (just in case types are being weird)
const map_or_object = (
    obj: Map<string, string> | Record<string, string> | undefined,
    key: string,
) => {
    if (!obj) return undefined;

    if (obj instanceof Map) {
        return obj.get(key);
    } else {
        return obj[key];
    }
};

/**
 * Card component displaying all information about an event in a compact way
 */
function EventCard(props: EventCardProps) {
    const [dateStrings, setDateStrings] = useState<DateDisplayInfo>({
        duration: "",
        timeContext: "",
        timeContextExact: "",
    });

    const { data, isLoading } = useRexData();

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
    if (isLoading) return;

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
                            color={map_or_object(
                                data?.colors.dorms,
                                props.event.dorm.find((d) =>
                                    data?.groups[d]?.includes(group),
                                ) ?? "",
                            )}
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

function standardize_color(str: string) {
    const ctx = document.createElement("canvas").getContext("2d");

    if (!ctx) {
        throw new Error("Failed to create canvas context");
    }

    ctx.fillStyle = str;
    return ctx.fillStyle;
}

// https://www.w3.org/TR/WCAG20/#relativeluminancedef
function getOptimalForegroundColor(bgColor: string, WCAG20 = true) {
    const color = standardize_color(bgColor);

    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5), 16);

    if (WCAG20) {
        const RsRGB = r / 255;
        const GsRGB = g / 255;
        const BsRGB = b / 255;

        const R =
            RsRGB <= 0.03928
                ? RsRGB / 12.92
                : Math.pow((RsRGB + 0.055) / 1.055, 2.4);
        const G =
            GsRGB <= 0.03928
                ? GsRGB / 12.92
                : Math.pow((GsRGB + 0.055) / 1.055, 2.4);
        const B =
            BsRGB <= 0.03928
                ? BsRGB / 12.92
                : Math.pow((BsRGB + 0.055) / 1.055, 2.4);

        const L = 0.2126 * R + 0.7152 * G + 0.0722 * B;

        return L > Math.sqrt(1.05 * 0.05) - 0.05 ? "#000" : "#fff";
    } else {
        return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000" : "#fff";
    }
}

/**
 * A badge component with an optional background color
 *
 * Automatically adjusts text color based on the background color to create
 * the highest contrast
 */
function ColoredBadge(props: {
    /** Badge background color, must be in 6 digit hex format, like `#123abc` */
    color?: string;
    className: string;
    onClick?: () => void;
    children: React.ReactNode;
    outline?: boolean;
}) {
    let textColor = "";

    if (props.color) {
        textColor = getOptimalForegroundColor(props.color);
    }

    if (props.outline) {
        textColor = "var(--ifm-font-color-base)";
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
        <p className={props.className}>
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
function eventDateDisplay(start: Date, end: Date): DateDisplayInfo {
    const duration = dayjs.duration(dayjs(end).diff(start)).humanize();
    let timeContext = "";
    let timeUntil: Date;
    if (dayjs().isBefore(start)) {
        timeContext += "Starts ";
        timeUntil = start;
    } else if (dayjs().isBefore(end)) {
        timeContext += "Ends ";
        timeUntil = end;
    } else {
        timeContext += "Ended ";
        timeUntil = end;
    }
    const timeContextExact = timeContext + timeUntil.toLocaleString();
    timeContext += dayjs(timeUntil).fromNow();
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
    const formatGCalDate = (paramData: Date) => {
        const date = new Date(paramData);
        return (
            `${date.getUTCFullYear().toString()}${padNumber(date.getUTCMonth() + 1)}` +
            `${padNumber(date.getUTCDate())}T${padNumber(
                date.getUTCHours(),
            )}${padNumber(date.getUTCMinutes())}` +
            `${padNumber(date.getUTCSeconds())}Z`
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

export const lightGradient = [
    "var(--ifm-color-primary-darkest)",
    "var(--ifm-color-secondary-darkest)",
];
export const darkGradient = [
    "var(--ifm-color-primary-lightest)",
    "var(--ifm-color-secondary-lightest)",
];

/**
 * A big fancy button that used to draw users to the REX events page
 */
export function TRexEntryButton() {
    const { colorMode } = useColorMode();

    const gradient = colorMode === "light" ? lightGradient : darkGradient;

    return (
        <div className="margin-bottom--md" style={{ textAlign: "center" }}>
            <Link
                to="/rex/events"
                className={clsx(
                    "button button--primary button--lg",
                    styles.heroButton,
                )}
                style={{
                    backgroundImage: `linear-gradient(45deg, ${[
                        ...gradient,
                        gradient[0],
                    ].join(",")})`,
                    transition: "0.5s",
                    border: "none",
                }}
            >
                Check out our REX Events!
            </Link>
        </div>
    );
}
