import { type Officer } from "../data/types";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";

export default function OfficersAvatars(props: { data: Officer[] }) {
    const { data } = props;
    return (
        <div className="row">
            {data.map((p, idx) => (
                <div
                    className="avatar col col--4 avatar--vertical"
                    style={{ marginBottom: "20px" }}
                    key={idx}
                >
                    <div className="avatar__intro">
                        <Heading as="h4" className="avatar__name">
                            {p.name}, {p.year}
                        </Heading>
                        <small className="avatar__subtitle">{p.position}</small>
                        <small className="avatar__subtitle">
                            {p.affiliation}
                        </small>
                        <small className="avatar__subtitle">
                            📧{" "}
                            <Link to={`mailto:${p.kerb}@mit.edu`}>
                                {p.kerb}
                            </Link>
                        </small>
                    </div>
                </div>
            ))}
        </div>
    );
}
