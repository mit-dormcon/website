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
    return <div className='card margin-vert--sm'>
        <div className='card__header'>
            <h4>{props.name}</h4>
        </div>
        <div className='card__body'>
            <p>{props.description}</p>
        </div>
        <div className='card__footer'>
            <span className='badge badge--primary'>{props.dorm}</span>
        </div>
    </div>;
}