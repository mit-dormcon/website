import { Meeting } from "../data/types";
import Link from "@docusaurus/Link";

export default function MeetingsComponent(props: { meetings: Meeting[] }) {
    const { meetings } = props;
    return (
        <ul>
            {meetings.map((m, idx) => {
                const minutesLink = m.minutesLink;
                return (
                    <li key={idx} style={{ marginBottom: "10px" }}>
                        <div>
                            <b>{m.name}</b>&ensp;
                            {minutesLink && (
                                <Link
                                    to={minutesLink}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span className="badge badge--primary">
                                        📝 Minutes
                                    </span>
                                </Link>
                            )}
                        </div>
                        <small style={{ color: "gray" }}>@ {m.location}</small>
                    </li>
                );
            })}
        </ul>
    );
}
