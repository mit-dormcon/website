import React, { useEffect, useState } from 'react';
import { EventFilter } from "./EventFilter";
import Link from "@docusaurus/Link";
import { BookmarkDropdownItem } from './Bookmarks';
import Fuse from "fuse.js";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from "dayjs/plugin/duration";

dayjs.extend(relativeTime);
dayjs.extend(duration);

type TRexAppProps = {
    data: TRexAPIResponse,
    fuse: Fuse<TRexEvent>
}

export function TRexApp(props: TRexAppProps) {
    if(!props.data) return <div>Loading...</div>;
    const [events, setEvents] = useState(props.data.events);
    const [savedEvents, setSavedEvents] = useState<string[]>([]);
    useEffect(() => {
        const savedStorage = localStorage.getItem("savedEvents");
        if(savedStorage) setSavedEvents(JSON.parse(savedStorage));
    }, []);
    useEffect(() => {
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    }, [savedEvents]);
    return <div className='margin-vert--md'>
        <p className="margin-bottom--sm">
            <Link to="/rex/toolbox">🧰</Link>&emsp;
            <b>{events.length}</b>/{props.data.events.length} events, published {(new Date(props.data.published)).toLocaleString()}
        </p>
        <EventFilter fuse={props.fuse} events={props.data.events} setEvents={setEvents} dorms={props.data.dorms} tags={props.data.tags} saved={savedEvents} />
        <EventLayout events={events} saved={savedEvents} setSaved={setSavedEvents} colors={props.data.colors} />
    </div>;
}

type EventLayoutProps = {
    events: TRexEvent[],
    saved: string[],
    setSaved: (saved: string[]) => void,
    colors: TRexAPIColors,
}

function EventLayout(props: EventLayoutProps) {
    const groupedEvents: TRexEvent[][] = props.events.reduce((array, next) => {
        const lastGroup = array.slice(-1).pop();
        if(lastGroup.length == 3) array.push([next]);
        else lastGroup.push(next);
        return array;
    }, [[]]);
    const unsaveFunc = (n: string) => props.setSaved(props.saved.filter((name) => name !== n));
    const saveFunc = (n: string) => !props.saved.includes(n) && props.setSaved(props.saved.concat([n]))
    return <div className='container margin-top--sm'>
        {props.events.length ? groupedEvents.map((group, idx) => <div key={idx} className='row'>
            {group.map((e, idx) => <div key={idx} className='col col--4'>
                <EventCard event={e} isSaved={props.saved.includes(e.name)} unsave={unsaveFunc}
                    save={saveFunc} colors={props.colors} />
            </div>)}
        </div>) : <div className="alert alert--secondary" role="alert">No events match this filter.</div>}
    </div>;
}

type EventCardProps = {
    event: TRexEvent,
    isSaved: boolean,
    unsave: (name: string) => void,
    save: (name: string) => void,
    colors: TRexAPIColors
}

function EventCard(props: EventCardProps) {
    const [dateStrings, setDateStrings] = useState({duration: "", timeContext: ""});
    useEffect(() => {
        setDateStrings(eventDateDisplay(props.event.start, props.event.end));
        const intervalId = setInterval(() => setDateStrings(eventDateDisplay(props.event.start, props.event.end)), 60 * 1000);
        return function cleanup() {
            clearInterval(intervalId);
        }
    }, [props]);
    return <div className='card margin-vert--sm'>
        <div className='card__header' style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
                <h4 className='margin-vert--none margin-right--sm'>
                    {props.isSaved && "⭐️ "}
                    {props.event.name}
                </h4>
                <div>
                    {props.event.tags.map((tag, idx) => <span key={idx} className="badge badge--secondary margin-right--sm">{tag}</span>)}
                </div>
            </div>
            <div className="dropdown dropdown--right dropdown--hoverable">
                <button className="button button--primary button--outline button--sm">▼</button>
                <ul className="dropdown__menu">
                    <GCalButton event={props.event} />
                    <BookmarkDropdownItem name={props.event.name} save={props.save} unsave={props.unsave} isSaved={props.isSaved} />
                </ul>
            </div>
        </div>
        <div className='card__body'>
            <ExpandableText text={props.event.description} className="margin-bottom--sm" />
            <p style={{fontStyle: "italic"}}>{dateStrings.timeContext}</p>
        </div>
        <div className='card__footer' style={{display: 'flex', flexWrap: 'wrap'}}>
            <ColoredBadge className='badge badge--primary margin-right--md' choices={props.colors.dorms} selector={props.event.dorm}>{props.event.dorm}</ColoredBadge>
            <div style={{color: 'var(--ifm-color-secondary-darkest)'}} className="margin-right--sm">🕒 {dateStrings.duration}</div>
            <div style={{color: 'var(--ifm-color-secondary-darkest)'}}>
                📍 <Link to={`https://whereis.mit.edu/?q=${encodeURIComponent(props.event.location)}`}>{props.event.location}</Link>
                </div>
        </div>
    </div>;
}

function ColoredBadge<T>(props: {
    /** A map of keys to an HTML color string */
    choices: Map<T, string>;
    selector: T,
    className: string,
    children: React.ReactNode
}) {
    const styles: React.CSSProperties = {};
    if(props.choices.has(props.selector)) {
        const bgColor = props.choices.get(props.selector);
        styles.backgroundColor = bgColor;
        styles.borderColor = bgColor;
        const r = parseInt(bgColor.substring(1, 3), 16);
        const g = parseInt(bgColor.substring(3, 5), 16);
        const b = parseInt(bgColor.substring(5), 16);
        styles["color"] = r*0.299 + g*0.587 + b*0.114 > 186 ? "#000" : "#fff";
    }
    return <div className={props.className} style={styles}>{props.children}</div>;
}

function ExpandableText(props: {
    text: string,
    expandAmount?: number,
    className: string,
}) {
    const [expanded, setExpanded] = useState(false);
    let truncated = props.text;
    const expandAmount = props.expandAmount || 140;
    let truncatePoint = 0;
    if(props.text.length > expandAmount) {
        truncatePoint = props.text.lastIndexOf(" ", 140);
        truncated = props.text.substring(0, truncatePoint);
    }
    return <p className={props.className}>
        {truncated}
        {props.text.length > expandAmount && (<span>
            {expanded && props.text.substring(truncatePoint)}
            {" "}
            <a onClick={(e) => { e.preventDefault(); setExpanded(!expanded); }} href="#" style={{fontStyle: 'italic'}}>{expanded ? "show less" : "show more"}</a>
        </span>)}
    </p>;
}

function eventDateDisplay(start: Date, end: Date): {
    duration: string,
    timeContext: string
} {
    const duration = dayjs.duration(dayjs(end).diff(start)).humanize();
    let timeContext = "";
    let timeUntil: Date;
    if(dayjs().isBefore(start)) {
        timeContext += "Starts ";
        timeUntil = start;
    } else if(dayjs().isBefore(end)) {
        timeContext += "Ends ";
        timeUntil = end;
    } else {
        timeContext += "Ended ";
        timeUntil = end;
    }
    timeContext += dayjs(timeUntil).fromNow();
    return {
        duration,
        timeContext
    }
}

function GCalButton(props: {
    event: TRexEvent
}) {
    const padNumber = (num: number) => num.toString().padStart(2, "0");
    const formatGCalDate = (date: Date) => `${date.getUTCFullYear()}${padNumber(date.getUTCMonth()+1)}` +
        `${padNumber(date.getUTCDate())}T${padNumber(date.getUTCHours())}${padNumber(date.getUTCMinutes())}` + 
        `${padNumber(date.getUTCSeconds())}Z`;

    const buttonLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${props.event.dorm}: ${props.event.name}` +
        `&dates=${formatGCalDate(props.event.start)}/${formatGCalDate(props.event.end)}&ctz=America/New_York&details=${props.event.description}` +
        `&location=${props.event.location}`;
    return <Link className='dropdown__link' to={encodeURI(buttonLink)}>📅 Add to Calendar</Link>
}