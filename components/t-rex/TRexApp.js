import React, { useState } from 'react';
import { EventFilter } from "./EventFilter";
import Link from "@docusaurus/Link";

export function TRexApp(props) {
    if(!props.data) return <div>Loading...</div>;
    const [events, setEvents] = useState(props.data.events);
    return <div className='margin-vert--md'>
        <EventFilter fuse={props.fuse} events={props.data.events} setEvents={setEvents} dorms={props.data.dorms} />
        <EventLayout events={events} />
    </div>;
}

function EventLayout(props) {
    const groupedEvents = props.events.reduce((array, next) => {
        const lastGroup = array.slice(-1).pop();
        if(lastGroup.length == 3) array.push([next]);
        else lastGroup.push(next);
        return array;
    }, [[]]);
    return <div className='container'>
        {groupedEvents.map((group, idx) => <div key={idx} className='row'>
            {group.map((e, idx) => <div key={idx} className='col col--4'>
                <EventCard {...e} />
            </div>)}
        </div>)}
    </div>;
}

function EventCard(props) {
    const dateStrings = eventDateDisplay(props.start, props.end);
    return <div className='card margin-vert--sm'>
        <div className='card__header' style={{display: 'flex', justifyContent: 'space-between'}}>
            <h4 className='margin-vert--none margin-right--sm'>{props.name}</h4>
            <GCalButton {...props} />
        </div>
        <div className='card__body'>
            <p>{props.description}</p>
            <p style={{fontStyle: "italic"}}>{dateStrings.timeContext}</p>
        </div>
        <div className='card__footer' style={{display: 'flex', flexWrap: 'wrap'}}>
            <div className='badge badge--primary margin-right--md'>{props.dorm}</div>
            <div style={{color: 'var(--ifm-color-secondary-darkest)'}} className="margin-right--sm">🕒 {dateStrings.duration}</div>
            <div style={{color: 'var(--ifm-color-secondary-darkest)'}}>
                📍 <Link to={`https://whereis.mit.edu/?q=${encodeURIComponent(props.location)}`}>{props.location}</Link>
                </div>
        </div>
    </div>;
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

    const buttonLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${props.name}` +
        `&dates=${formatGCalDate(props.start)}/${formatGCalDate(props.end)}&ctz=America/New_York&details=${props.description}` +
        `&location=${props.location}`;
    return <div><Link className='button button--primary button--outline' to={encodeURI(buttonLink)}>+ 📅</Link></div>
}