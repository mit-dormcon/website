import React, { useState } from 'react';
import { EventFilter } from "./EventFilter";

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
        <div className='card__header'>
            <h4>{props.name}</h4>
        </div>
        <div className='card__body'>
            <p>{props.description}</p>
            <p style={{fontStyle: "italic"}}>{dateStrings.timeContext}</p>
        </div>
        <div className='card__footer'>
            <span style={{color: 'var(--ifm-color-secondary-darkest)'}} className="margin-right--sm">🕒 {dateStrings.duration}</span>
            <span className='badge badge--primary'>{props.dorm}</span>
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