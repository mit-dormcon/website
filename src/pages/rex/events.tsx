import { useColorMode } from "@docusaurus/theme-common";
import BackToTopButton from "@theme/BackToTopButton";
import Layout from "@theme/Layout";
import Fuse from "fuse.js";
import React, { CSSProperties, StrictMode, useEffect, useState } from "react";
import {
    TRexApp,
    darkGradient,
    lightGradient,
} from "../../../components/t-rex/TRexApp";
import "./events.css";
import type { TRexAPIResponse, TRexEvent } from "@site/components/t-rex/types";
import Heading from "@theme/Heading";

export async function fetchEvents(): Promise<TRexAPIResponse> {
    const api_url = "https://rex.mit.edu/api.json";
    const response = await fetch(api_url);
    const data = await response.json();
    data.events.map((ev) => {
        ev.start = new Date(ev.start);
        ev.end = new Date(ev.end);
    });
    data.colors.dorms = new Map<string, string>(
        Object.entries(data.colors.dorms),
    );
    data.colors.tags = new Map<string, string>(
        Object.entries(data.colors.tags),
    );
    return data as TRexAPIResponse;
}

export default function Events() {
    const [data, setData] = useState<TRexAPIResponse>();
    const [fuse, setFuse] = useState<Fuse<TRexEvent>>();
    useEffect(() => {
        fetchEvents().then((data) => {
            setData(data);
            setFuse(
                new Fuse(data.events, {
                    keys: [
                        { name: "name", weight: 2 },
                        "dorm",
                        "group",
                        "location",
                        "tags",
                        { name: "description", weight: 0.5 },
                    ],
                }),
            );
        });
    }, []);

    return (
        <Layout
            title="REX Events"
            description="The one page for all REX Events"
        >
            <StrictMode>
                <div className="container margin-top--md">
                    {data && <TRexHeadline>{data.name} Events</TRexHeadline>}
                    <TRexApp data={data} fuse={fuse} />
                </div>
            </StrictMode>
            <BackToTopButton />
        </Layout>
    );
}

function TRexHeadline(props: { children: React.ReactNode }) {
    const { colorMode } = useColorMode();

    const headlineStyle: CSSProperties = {
        backgroundImage: `linear-gradient(45deg, ${
            colorMode === "light"
                ? lightGradient.join(", ")
                : darkGradient.join(", ")
        })`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        display: "inline-block",
        marginBottom: 0,
        color: "transparent",
    };

    return (
        <Heading as="h1" style={headlineStyle} key={0}>
            {props.children}
        </Heading>
    );
}
