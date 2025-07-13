import styles from "./EventfulEmbed.module.css";
import { useRef } from "react";

const EVENTFUL_URL = new URL("https://scidev5.github.io/eventful");
const EVENTFUL_SCHEDULE_ID = "rex";
EVENTFUL_URL.searchParams.append("event", EVENTFUL_SCHEDULE_ID);

export function EventfulEmbed() {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    return (
        <div>
            <button
                className={"button button--link " + styles.fullscreen_link}
                onClick={() => {
                    void iframeRef.current?.requestFullscreen?.();
                }}
            >
                fullscreen <span>&#x26F6;</span>
            </button>
            <iframe
                title="REX Events - Eventful"
                className={styles.embed}
                ref={iframeRef}
                src={EVENTFUL_URL.toString() + "&is_embed"}
            />
        </div>
    );
}
