import React, { useState, useEffect, CSSProperties } from "react";
import Layout from "@theme/Layout";
import BackToTopButton from "@theme/BackToTopButton";
import { TRexApp } from "../../../components/t-rex/TRexApp";
import Fuse from "fuse.js";
import { useColorMode } from "@docusaurus/theme-common";

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
                {data && <TRexHeadline>{data.name} Events</TRexHeadline>}
                <TRexApp data={data} fuse={fuse} />
            </div>
            <BackToTopButton />
    </Layout>
}

function TRexHeadline(props: {children: React.ReactNode}) {
    const { colorMode } = useColorMode();

    const lightGradient = "orangered, var(--ifm-color-primary-darkest)";
    const darkGradient = "orange, var(--ifm-color-primary-lightest)";

    const headlineStyle: CSSProperties = {
        backgroundImage: `linear-gradient(45deg, ${colorMode === "light" ? lightGradient : darkGradient})`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        display: "inline-block",
        marginBottom: 0,
        color: "transparent",
    };

    return <h1 style={headlineStyle} key={0}>{props.children}</h1>
}