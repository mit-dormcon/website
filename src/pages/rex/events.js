import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import { TRexApp } from "../../../components/t-rex/TRexApp";

export default function Events() {
    const [data, setData] = useState();
    useEffect(() => {
        const api_url = "https://camk.co/t-rex/api.json";
        fetch(api_url).then((response) => response.json()).then((data) => setData(data));
    }, []);

    return <Layout 
        title="REX Events"
        description="The one page for all REX Events"
        >
            <div className="container margin-top--md">
                <h1>{data && data.name}</h1>
                <TRexApp data={data} />
            </div>
    </Layout>
}