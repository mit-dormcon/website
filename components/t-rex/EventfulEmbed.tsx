import Link from "@docusaurus/Link";
import styles from "./EventfulEmbed.module.css";

const EVENTFUL_URL = new URL("https://scidev5.github.io/eventful");
const EVENTFUL_SCHEDULE_ID = "rex";
EVENTFUL_URL.searchParams.append("event", EVENTFUL_SCHEDULE_ID);

export function EventfulEmbed() {
    return (
        <div>
            <Link
                className={styles.fullscreen_link}
                target="_self"
                to={EVENTFUL_URL.toString()}
            >
                fullscreen <span>&#x26F6;</span>
            </Link>
            <iframe
                title="REX Events - Eventful"
                className={styles.embed}
                src={EVENTFUL_URL.toString() + "&is_embed"}
            />
        </div>
    );
}
