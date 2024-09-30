import { API } from "@stoplight/elements";
import "./Spotlight.css";

interface StoplightProps {
    apiDescriptionUrl: string;
}

export function Stoplight({ apiDescriptionUrl }: StoplightProps) {
    return <API apiDescriptionUrl={apiDescriptionUrl} router="memory" />;
}

export default Stoplight;
