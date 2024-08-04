import BackToTopButton from "@theme/BackToTopButton";
import Layout from "@theme/Layout";
import { StrictMode } from "react";
import { TRexApp, TRexHeadline } from "../../../components/t-rex/TRexApp";
import "./events.css";

export default function Events() {
    return (
        <Layout
            title="REX Events"
            description="The one page for all REX Events"
        >
            <StrictMode>
                <div className="container margin-top--md">
                    <TRexHeadline />
                    <TRexApp />
                </div>
            </StrictMode>
            <BackToTopButton />
        </Layout>
    );
}
