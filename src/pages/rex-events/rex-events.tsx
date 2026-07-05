import BackToTopButton from "@theme/BackToTopButton";
import Layout from "@theme/Layout";
import { StrictMode } from "react";
// import { TRexApp, TRexHeadline } from "../../../components/t-rex/TRexApp";
import "./rex-events.css";

export default function Events() {
    return (
        <Layout
            title="REX Event Submission - Test"
            description="The one page for all REX Events"
        >
            <StrictMode>
                <div className="container margin-top--md">
                    <iframe
                        src="https://trexdormcon.com/"
                        title="REX Events"
                        width="100%"
                        height="900"
                        className="border: 0; min-height: 80vh;"
                        loading="lazy"
                    ></iframe>
                </div>
            </StrictMode>
            <BackToTopButton />
        </Layout>
    );
}
