import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import BrowserOnly from "@docusaurus/BrowserOnly";
import React, { Suspense } from "react";

const LazyStoplight = React.lazy(
    () => import("../../../components/t-rex/api/Spotlight"),
);

export default function Home() {
    const context = useDocusaurusContext();
    const { siteConfig } = context;

    return (
        <Layout
            title={`REX API Documentation`}
            description={siteConfig.tagline}
        >
            <BrowserOnly>
                {() => (
                    <Suspense fallback={<div>Loading...</div>}>
                        <LazyStoplight apiDescriptionUrl="https://rex.mit.edu/openapi.yaml" />
                    </Suspense>
                )}
            </BrowserOnly>
        </Layout>
    );
}
