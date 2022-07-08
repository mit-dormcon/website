import React from 'react';
import { Meeting } from '../data/types';

export default function MeetingsComponent(props: { meetings: Meeting[] }) {
    const { meetings } = props;
    return (
        <ul>
            {meetings.map((m, idx) => {
                const minutesLink = (m.minutes && require('@site/static' + m.minutes).default) || m.minutesLink;
                return (
                <li key={idx} style={{marginBottom: '10px'}}>
                    <div><b>{m.name}</b>&ensp;
                        {minutesLink && (<a href={minutesLink} target="_blank" rel="noopener"><span className="badge badge--primary">📝 Minutes</span></a>)}
                    </div>
                    <small style={{color: 'gray'}}>@ {m.location}</small>
                </li>
            );})}
        </ul>
    );
};