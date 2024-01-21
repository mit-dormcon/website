import { DormConMember } from "../data/types";
import Link from "@docusaurus/Link";

export default function VotingMembersTable(props: { data: DormConMember[] }) {
    const { data } = props;
    return (
        <table>
            <thead>
                <tr>
                    <th>Dorm</th>
                    <th>President</th>
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
                        <td>{m.president}</td>
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
