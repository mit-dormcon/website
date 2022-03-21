import React, { useEffect, useState } from "react";

export function EventFilter(props) {
    const [searchValue, setSearchValue] = useState("");
    const allDorms = "All Dorms"
    const [dormFilter, setDormFilter] = useState(allDorms);
    const [endedFilter, setEndedFilter] = useState(true);
    useEffect(() => {
        let events = [];
        const now = new Date();
        if(!searchValue) events = props.events;
        else {
            events = props.fuse.search(searchValue).map((result) => result.item);
        }
        if(dormFilter !== allDorms) events = events.filter((ev) => ev.dorm === dormFilter);
        if(endedFilter) events = events.filter((ev) => ev.end >= now);
        props.setEvents(events);
    }, [searchValue, dormFilter, endedFilter]);
    return <div>
        <select onChange={(e) => setDormFilter(e.target.value)}>
            <option defaultChecked>{allDorms}</option>
            {props.dorms.map((dorm, idx) => <option key={idx}>{dorm}</option>)}
        </select>
        <input type="checkbox" checked={endedFilter} onChange={(e) => setEndedFilter(e.target.checked)} id="ended" />
        <label htmlFor="ended">Show upcoming events only</label>
        <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} style={
            {fontSize: '2rem', width: '100%'}} placeholder="🔍 Search" />
    </div>;
}