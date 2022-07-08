import React, { useEffect, useState } from "react";
import Fuse from "fuse.js";
import Events from "../../src/pages/rex/events";

export function EventFilter(props: {
    events: TRexEvent[],
    fuse: Fuse<TRexEvent>,
    saved: string[],
    setEvents: (events: TRexEvent[]) => void,
    dorms: string[],
    tags: string[],
}) {
    const [searchValue, setSearchValue] = useState("");
    const allDorms = "All Dorms";
    const [dormFilter, setDormFilter] = useState(allDorms);
    const allEvents = "All Events", ongoing = "Ongoing", upcoming = "Upcoming";
    const [timeFilter, setTimeFilter] = useState(ongoing);
    const everything = "Everything";
    const [tagFilter, setTagFilter] = useState(everything);
    const [bookmarkFilter, setBookmarkFilter] = useState(false);
    useEffect(() => {
        let events: TRexEvent[] = [];
        const now = new Date();
        if(!searchValue) events = props.events;
        else {
            events = props.fuse.search(searchValue).map((result) => result.item);
        }
        if(dormFilter !== allDorms) events = events.filter((ev) => ev.dorm === dormFilter);
        if(timeFilter === upcoming) events = events.filter((ev) => ev.start >= now);
        else if(timeFilter === ongoing) events = events.filter((ev) => ev.start < now && ev.end >= now);
        if(tagFilter !== everything) events = events.filter((ev) => ev.tags.includes(tagFilter));
        if(bookmarkFilter) events = events.filter((ev) => props.saved.includes(ev.name));
        props.setEvents(events);
    }, [searchValue, dormFilter, timeFilter, tagFilter, bookmarkFilter, props.saved]);
    return <div>
        <div className="margin-bottom--xs">
            <select onChange={(e) => setDormFilter(e.target.value)} defaultValue={allDorms}>
                <option>{allDorms}</option>
                {props.dorms.map((dorm, idx) => <option key={idx}>{dorm}</option>)}
            </select>
            <select onChange={(e) => setTimeFilter(e.target.value)} defaultValue={ongoing}>
                <option>{allEvents}</option>
                <option>{ongoing}</option>
                <option>{upcoming}</option>
            </select>
            <select onChange={(e) => setTagFilter(e.target.value)} defaultValue={everything}>
                <option>{everything}</option>
                {props.tags.map((tag, idx) => <option key={idx}>{tag}</option>)}
            </select>
            <div style={{display: 'inline-block'}}>
                <input type="checkbox" id="showBookmarks" checked={bookmarkFilter} onChange={(e) => setBookmarkFilter(e.target.checked)} />
                <label htmlFor="showBookmarks">⭐️ only</label>
            </div>
        </div>
        <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} style={
            {fontSize: '2rem', width: '100%'}} placeholder="🔍 Search" />
    </div>;
}