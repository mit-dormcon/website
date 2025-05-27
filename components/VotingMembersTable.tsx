import { DormConMember } from "../data/types";
import Link from "@docusaurus/Link";

const generatePrezString = (presidents: string[]): string => {
    // probably couldve done this in one line but this is more readable
    if (presidents.length === 0) return "";
    if (presidents.length === 1) return presidents[0];
    if (presidents.length === 2) return `${presidents[0]} & ${presidents[1]}`;
    return `${presidents.slice(0, -1).join(", ")} & ${presidents.slice(-1).join("")}`;
};

export default function VotingMembersTable(props: { data: DormConMember[] }) {
    const { data } = props;
    return (
        <table>
            <thead>
                <tr>
                    <th>Dorm</th>
                    <th>President(s)</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {data.map((m, idx) => (
                    <tr key={idx}>
                        <td>
                            <Link to={m.url} target="_blank" rel="noreferrer">
                                {m.dorm}
                            </Link>
                        </td>
                        <td>{generatePrezString(m.president)}</td>
                        <td>
                            {m.kerbs.map((k, idx) => (
                                <Link
                                    key={idx}
                                    to={`mailto:${k}@mit.edu`}
                                    style={{ marginInline: "2px" }}
                                >
                                    {k}
                                </Link>
                            ))}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
