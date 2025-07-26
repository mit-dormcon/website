import { useRef } from "react";

import styles from "./EventfulEmbed.module.css";
import Link from "@docusaurus/Link";

const EVENTFUL_URL = new URL("https://eventful.mit.edu/");
EVENTFUL_URL.searchParams.append("trex", "https://rex.mit.edu/api.json");

export function EventfulEmbed() {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    return (
        <div>
            <Link
                href={EVENTFUL_URL.toString()}
                className={"button button--link " + styles.fullscreen_link}
                onClick={(e) => {
                    const is_ios = navigator.userAgent.includes("WebKit");
                    if (!is_ios) {
                        e.preventDefault()
                        void iframeRef.current?.requestFullscreen?.();
                    }
                }}
            >
                {"fullscreen"} <span>&#x26F6;</span>
            </Link>
            <iframe
                title="REX Events - Eventful"
                className={styles.embed}
                ref={iframeRef}
                src={EVENTFUL_URL.toString() + "&is_embed"}
            />
        </div>
    );
}
