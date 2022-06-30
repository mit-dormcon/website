import React, { useEffect, useState } from 'react';
import { EventFilter } from "./EventFilter";
import Link from "@docusaurus/Link";
import { BookmarkDropdownItem } from './Bookmarks';

export function TRexApp(props) {
    if(!props.data) return <div>Loading...</div>;
    const [events, setEvents] = useState(props.data.events);
    const [savedEvents, setSavedEvents] = useState([]);
    useEffect(() => {
        const savedStorage = localStorage.getItem("savedEvents");
        if(savedStorage) setSavedEvents(JSON.parse(savedStorage));
    }, []);
    useEffect(() => {
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
    }, [savedEvents]);
    return <div className='margin-vert--md'>
        <p class="margin-bottom--sm">{props.data.events.length} events loaded, published {(new Date(props.data.published)).toLocaleString()}</p>
        <EventFilter fuse={props.fuse} events={props.data.events} setEvents={setEvents} dorms={props.data.dorms} tags={props.data.tags} saved={savedEvents} />
        <EventLayout events={events} saved={savedEvents} setSaved={setSavedEvents} colors={props.data.colors} />
    </div>;
}

function EventLayout(props) {
    const groupedEvents = props.events.reduce((array, next) => {
        const lastGroup = array.slice(-1).pop();
        if(lastGroup.length == 3) array.push([next]);
        else lastGroup.push(next);
        return array;
    }, [[]]);
    const unsaveFunc = (n) => props.setSaved(props.saved.filter((name) => name !== n));
    const saveFunc = (n) => !props.saved.includes(n) && props.setSaved(props.saved.concat([n]))
    return <div className='container'>
        {groupedEvents.map((group, idx) => <div key={idx} className='row'>
            {group.map((e, idx) => <div key={idx} className='col col--4'>
                <EventCard {...e} isSaved={props.saved.includes(e.name)} unsave={unsaveFunc}
                    save={saveFunc} colors={props.colors} />
            </div>)}
        </div>)}
    </div>;
}

function EventCard(props) {
    const dateStrings = eventDateDisplay(props.start, props.end);
    return <div className='card margin-vert--sm'>
        <div className='card__header' style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
                <h4 className='margin-vert--none margin-right--sm'>
                    {props.isSaved && "⭐️ "}
                    {props.name}
                </h4>
                <div>
                    {props.tags.map((tag, idx) => <span key={idx} className="badge badge--secondary margin-right--sm">{tag}</span>)}
                </div>
            </div>
            <div className="dropdown dropdown--right dropdown--hoverable">
                <button className="button button--primary button--outline button--sm">▼</button>
                <ul className="dropdown__menu">
                    <GCalButton {...props} />
                    <BookmarkDropdownItem {...props} />
                </ul>
            </div>
        </div>
        <div className='card__body'>
            <ExpandableText text={props.description} className="margin-bottom--sm" />
            <p style={{fontStyle: "italic"}}>{dateStrings.timeContext}</p>
        </div>
        <div className='card__footer' style={{display: 'flex', flexWrap: 'wrap'}}>
            <ColoredBadge className='badge badge--primary margin-right--md' choices={props.colors.dorms} selector={props.dorm}>{props.dorm}</ColoredBadge>
            <div style={{color: 'var(--ifm-color-secondary-darkest)'}} className="margin-right--sm">🕒 {dateStrings.duration}</div>
            <div style={{color: 'var(--ifm-color-secondary-darkest)'}}>
                📍 <Link to={`https://whereis.mit.edu/?q=${encodeURIComponent(props.location)}`}>{props.location}</Link>
                </div>
        </div>
    </div>;
}

function ColoredBadge(props) {
    const styles = {};
    if(props.selector in props.choices) {
        const bgColor = props.choices[props.selector];
        styles["backgroundColor"] = bgColor;
        styles["borderColor"] = bgColor;
        const r = parseInt(bgColor.substring(1, 3), 16);
        const g = parseInt(bgColor.substring(3, 5), 16);
        const b = parseInt(bgColor.substring(5), 16);
        styles["color"] = r*0.299 + g*0.587 + b*0.114 > 186 ? "#000" : "#fff";
    }
    return <div className={props.className} style={styles}>{props.children}</div>;
}

function ExpandableText(props) {
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

function eventDateDisplay(start, end) {
    const duration = (end - start)/1000;
    const hours = Math.floor(duration/3600);
    const minutes = Math.floor((duration/60) % 60);
    const now = new Date();
    let timeContext = "";
    if(start > now) {
        timeContext = `Starts ${start.toLocaleString()}`;
    } else if(end > now) {
        timeContext = `Ends ${end.toLocaleString()}`;
    } else {
        timeContext = `Ended ${end.toLocaleString()}`;
    }
    return {
        duration: (hours > 0 && hours + "h ") + minutes + "m",
        timeContext
    }
}

function GCalButton(props) {
    const padNumber = (num) => num.toString().padStart(2, "0");
    const formatGCalDate = (date) => `${date.getUTCFullYear()}${padNumber(date.getUTCMonth()+1)}` +
        `${padNumber(date.getUTCDate())}T${padNumber(date.getUTCHours())}${padNumber(date.getUTCMinutes())}` + 
        `${padNumber(date.getUTCSeconds())}Z`;

    const buttonLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${props.dorm}: ${props.name}` +
        `&dates=${formatGCalDate(props.start)}/${formatGCalDate(props.end)}&ctz=America/New_York&details=${props.description}` +
        `&location=${props.location}`;
    return <Link className='dropdown__link' to={encodeURI(buttonLink)}>📅 Add to Calendar</Link>
}