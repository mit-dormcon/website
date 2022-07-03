import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import BackToTopButton from "@theme/BackToTopButton";
import { TRexApp } from "../../../components/t-rex/TRexApp";
import Fuse from "fuse.js";

async function fetchEvents(): Promise<TRexAPIResponse> {
    const api_url = "https://camk.co/t-rex/api.json";
    const response = await fetch(api_url);
    const data = await response.json();
    data.events.map((ev) => {
        ev.start = new Date(ev.start);
        ev.end = new Date(ev.end);
    });
    data.colors.dorms = new Map<string, string>(Object.entries(data.colors.dorms))
    data.colors.tags = new Map<string, string>(Object.entries(data.colors.tags))
    return data as TRexAPIResponse;
}

export default function Events() {
    const [data, setData] = useState<TRexAPIResponse>();
    const [fuse, setFuse] = useState<Fuse<TRexEvent>>();
    useEffect(() => {
        fetchEvents().then((data) => {
            setData(data);
            setFuse(new Fuse(data.events, {
                keys: ['name', 'dorm', {name: 'description', weight: 0.5}]
            }));
        });
    }, []);

    return <Layout 
        title="REX Events"
        description="The one page for all REX Events"
        >
            <div className="container margin-top--md">
                <h1>{data && data.name}</h1>
                <TRexApp data={data} fuse={fuse} />
            </div>
            <BackToTopButton />
    </Layout>
}