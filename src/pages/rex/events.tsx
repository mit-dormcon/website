import BackToTopButton from "@theme/BackToTopButton";
import Layout from "@theme/Layout";
import { StrictMode, Suspense } from "react";
import { TRexApp, TRexHeadline } from "../../../components/t-rex/TRexApp";
import "./events.css";
import ErrorBoundary from "@docusaurus/ErrorBoundary";

function Fallback() {
    return (
        <div>
            <p>Loading...</p>
            <p>
                <b>Stuck on this page?</b> Make sure you&#x27;re connected to a
                network and have JavaScript enabled.
            </p>
        </div>
    );
}

function Error() {
    return (
        <div>
            <p>There was an error loading the REX data.</p>
            <p>
                <b>Stuck on this page?</b> Make sure you&#x27;re connected to a
                network and have JavaScript enabled.
            </p>
        </div>
    );
}

export default function Events() {
    return (
        <Layout
            title="REX Events"
            description="The one page for all REX Events"
        >
            <StrictMode>
                <div className="container margin-top--md">
                    <ErrorBoundary fallback={Error}>
                        <Suspense fallback={<Fallback />}>
                            <TRexHeadline />
                            <TRexApp />
                        </Suspense>
                    </ErrorBoundary>
                </div>
            </StrictMode>
            <BackToTopButton />
        </Layout>
    );
}
