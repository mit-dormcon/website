import React from 'react';
import { Officer } from '../data/types';

export default function OfficersTable(props: { data: Officer[] }) { 
    const { data } = props;
    return (
    <table>
        <thead>
            <tr>
                <th>Position</th>
                <th>Name</th>
                <th>Affiliation</th>
                <th>Year</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            {data.map((p, idx) => (
                <tr key={idx}>
                    <td>{p.position}</td>
                    <td>{p.name}</td>
                    <td>{p.affiliation}</td>
                    <td>{p.year}</td>
                    <td><a href={`mailto:${p.kerb}@mit.edu`}>{p.kerb}@mit.edu</a></td>
                </tr>
            ))}
        </tbody>
    </table>
    );
};