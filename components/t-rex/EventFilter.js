import React, { useEffect, useState } from "react";

export function EventFilter(props) {
    const [searchValue, setSearchValue] = useState("");
    const allDorms = "All Dorms"
    const [dormFilter, setDormFilter] = useState(allDorms);
    const allEvents = "All Events", ongoing = "Ongoing", upcoming = "Upcoming";
    const [timeFilter, setTimeFilter] = useState(ongoing);
    useEffect(() => {
        let events = [];
        const now = new Date();
        if(!searchValue) events = props.events;
        else {
            events = props.fuse.search(searchValue).map((result) => result.item);
        }
        if(dormFilter !== allDorms) events = events.filter((ev) => ev.dorm === dormFilter);
        if(timeFilter === upcoming) events = events.filter((ev) => ev.start >= now);
        else if(timeFilter === ongoing) events = events.filter((ev) => ev.start < now && ev.end >= now);
        props.setEvents(events);
    }, [searchValue, dormFilter, timeFilter]);
    return <div>
        <select onChange={(e) => setDormFilter(e.target.value)}>
            <option selected>{allDorms}</option>
            {props.dorms.map((dorm, idx) => <option key={idx}>{dorm}</option>)}
        </select>
        <select onChange={(e) => setTimeFilter(e.target.value)}>
            <option>{allEvents}</option>
            <option selected>{ongoing}</option>
            <option>{upcoming}</option>
        </select>
        <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} style={
            {fontSize: '2rem', width: '100%'}} placeholder="🔍 Search" />
    </div>;
}