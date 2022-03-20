import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import { TRexApp } from "../../../components/t-rex/TRexApp";
import Fuse from "fuse.js";

export default function Events() {
    const [data, setData] = useState();
    const [fuse, setFuse] = useState();
    useEffect(() => {
        const api_url = "https://camk.co/t-rex/api.json";
        fetch(api_url).then((response) => response.json()).then((data) => {
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
    </Layout>
}