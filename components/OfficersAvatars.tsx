import { Officer } from "../data/types";

export default function OfficersAvatars(props: { data: Officer[] }) {
    const { data } = props;
    return (
        <div className="row">
            {data.map((p, idx) => (
                <div
                    className="avatar col col--4 avatar--vertical"
                    style={{ marginBottom: "20px" }}
                >
                    <div className="avatar__intro">
                        <h4 className="avatar__name">
                            {p.name}, {p.year}
                        </h4>
                        <small className="avatar__subtitle">{p.position}</small>
                        <small className="avatar__subtitle">
                            {p.affiliation}
                        </small>
                        <small className="avatar__subtitle">
                            📧 <a href={`mailto:${p.kerb}@mit.edu`}>{p.kerb}</a>
                        </small>
                    </div>
                </div>
            ))}
        </div>
    );
}
