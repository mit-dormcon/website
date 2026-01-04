import { type Meeting } from "../data/types";
import Link from "@docusaurus/Link";

export default function MeetingsComponent(props: { meetings: Meeting[] }) {
    const { meetings } = props;

    if (meetings.length === 0) {
        return <p>No meetings scheduled (yet). Check back later!</p>;
    }

    return (
        <ul>
            {meetings.map((m, idx) => {
                const minutesLink = m.minutesLink;
                const external = minutesLink?.startsWith("http");
                return (
                    <li key={idx} style={{ marginBottom: "10px" }}>
                        <div>
                            <b>{m.name}</b>&ensp;
                            {minutesLink && (
                                <Link
                                    to={minutesLink}
                                    target={external ? "_blank" : undefined}
                                    rel={external ? "noreferrer" : undefined}
                                >
                                    <span className="badge badge--primary">
                                        📝 Minutes
                                    </span>
                                </Link>
                            )}
                        </div>
                        {m.location && (
                            <small style={{ color: "gray" }}>
                                @ {m.location}
                            </small>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
