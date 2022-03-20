import React, { useEffect, useState } from "react";

export function EventFilter(props) {
    const [searchValue, setSearchValue] = useState();
    useEffect(() => {
        if(!props.fuse) return;
        let events = [];
        if(!searchValue) events = props.events;
        else {
            events = props.fuse.search(searchValue).map((result) => result.item);
        }
        props.setEvents(events);
    }, [searchValue]);
    return <div>
        <input type="text" onChange={(e) => setSearchValue(e.target.value)} style={
            {fontSize: '2rem', width: '100%'}} placeholder="🔍 Search events..."></input>
    </div>;
}