import React from 'react';

export default function MeetingsComponent({ meetings }) {
    return (
        <ul>
            {meetings.map((m, idx) => (
                <li key={idx} style={{marginBottom: '10px'}}>
                    <div><b>{m.name}</b>&ensp;
                        {m.minutes && (<a href={require('@site/static' + m.minutes).default} target="_blank" rel="noopener"><span className="badge badge--primary">📝 Minutes</span></a>)}
                    </div>
                    <small style={{color: 'gray'}}>@ {m.location}</small>
                </li>
            ))}
        </ul>
    );
};