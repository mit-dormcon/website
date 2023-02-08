import React from "react";
import { DormConMember } from "../data/types";

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
                            <a href={m.url} target="_blank" rel="noopener">
                                {m.dorm}
                            </a>
                        </td>
                        <td>{m.president}</td>
                        <td>
                            {m.kerbs.map((k, idx) => (
                                <a
                                    key={idx}
                                    href={`mailto:${k}@mit.edu`}
                                    style={{ marginInline: "2px" }}
                                >
                                    {k}
                                </a>
                            ))}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
